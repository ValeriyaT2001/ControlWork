// Расширенная версия index.js с улучшенной проверкой решений
import { ComputeEngine } from 'https://unpkg.com/@cortex-js/compute-engine?module';
const ce = new ComputeEngine();

// Примеры задач для каждого типа
const examples = [
  '3x + 4y - 12 = 0',    // Уравнение прямой (в отрезках)
  '2x + 3y + 6z - 18 = 0', // Уравнение плоскости (в отрезках)
  '4x - 3y + 12 = 0',    // Уравнение прямой (нормированное)
  'x + 2y + 2z - 8 = 0'   // Уравнение плоскости (нормированное)
];

// Правильные ответы для каждой задачи
const correctAnswers = [
  'x/4 + y/3 = 1',
  'x/9 + y/6 + z/3 = 1',
  '-4x/5 + 3y/5 - 12/5 = 0',
  'x/3 + 2y/3 + 2z/3 - 8/3 = 0'
];

// Допустимые варианты шагов решения для каждой задачи
const correctSolutionSteps = [
  // Задача 1: Прямая в отрезках
  [
    '3x + 4y = 12',
    '3x/12 + 4y/12 = 1',
    'x/4 + y/3 = 1',
    'y/3 + x/4 = 1',
    'x/-4 + y/-3 = -1',
    '3x + 4y - 12 = 0',
    'y/-3 + x/-4 = -1',
    '-3x - 4y = -12',
    '-3x - 4y + 12 = 0',
    '3x/-12 + 4y/-12 = -1'
  ],
  // Задача 2: Плоскость в отрезках
  [
    '2x + 3y + 6z = 18',
    '2x/18 + 3y/18 + 6z/18 = 1',
    'x/9 + y/6 + z/3 = 1',
    'x/-9 + y/-6 + z/-3 = -1',
    '2x + 3y + 6z - 18 = 0',
    '-2x - 3y - 6z + 18 = 0',
    '2x/-18 + 3y/-18 + 6z/-18 = -1',
    '-2x/-18 + -3y/-18 + -6z/-18 = 1'
  ],
  // Задача 3: Прямая нормированное
  [
    '1/sqrt(4^2 + (-3)^2) = 1/5',
    '1/sqrt(16 + 9) = 1/5',
    '-1/sqrt(4^2 + (-3)^2) = -1/5',
    '-1/sqrt(16 + 9) = -1/5',
    '4x - 3y = -12',
    '4x/5 - 3y/5 = -12/5',
    '-4x/5 + 3y/5 = 12/5',
    '-4x/5 + 3y/5 - 12/5 = 0',
    '4x - 3y + 12 = 0'
  ],
  // Задача 4: Плоскость нормированное
  [
    '1/sqrt(1^2 + 2^2 + 2^2) = 1/3',
    '1/sqrt(1 + 4 + 4) = 1/3',
    '-1/sqrt(1^2 + 2^2 + 2^2) = -1/3',
    '-1/sqrt(1 + 4 + 4) = -1/3',
    'x + 2y + 2z = 8',
    'x/3 + 2y/3 + 2z/3 = 8/3',
    '-x/3 - 2y/3 - 2z/3 = -8/3',
    'x/3 + 2y/3 + 2z/3 - 8/3 = 0',
    'x + 2y + 2z - 8 = 0'
  ]
];

// Типы задач
const TASK_TYPES = {
  LINE_SEGMENTS: 0,
  PLANE_SEGMENTS: 1,
  LINE_NORMALIZED: 2,
  PLANE_NORMALIZED: 3
};

// Оценки
let totalScore = 0;
let totalTasksSubmitted = 0;
let answerScores = [0, 0, 0, 0];
let stepScores = [0, 0, 0, 0];

// SCORM API (упрощенная версия)
const ScormAPI = {
  initialize: function() {
    console.log("SCORM API initialized");
    return true;
  },
  setCompletionStatus: function(status) {
    console.log("Completion status set to:", status);
    return true;
  },
  setScore: function(score) {
    console.log("Score set to:", score);
    return true;
  },
  saveAndFinish: function() {
    console.log("SCORM session saved and finished");
    return true;
  }
};

// Инициализация задач
function setupTask(blockNum) {
  const example = examples[blockNum - 1];
  const exampleBlock = document.getElementById(`exampleBlock${blockNum}`);
  if (exampleBlock) exampleBlock.textContent = example;
  
  let stepCount = 0;

  const addButton = document.getElementById(`action${blockNum}`);
  const deleteButton = document.getElementById(`actionDelet${blockNum}`);

  if (addButton) {
    addButton.addEventListener('click', () => {
      const input = document.createElement('math-field');
      input.setAttribute('id', `step-${blockNum}-${stepCount}`);
      input.setAttribute('class', 'solution-step');
      const blocksContainer = document.getElementById(`Blocks${blockNum}`);
      if (blocksContainer) blocksContainer.appendChild(input);
      stepCount++;
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      if (stepCount > 0) {
        stepCount--;
        const lastInput = document.getElementById(`step-${blockNum}-${stepCount}`);
        if (lastInput) lastInput.remove();
      }
    });
  }
}

// Анализ ошибок в шагах решения
function analyzeStepError(actual, expected, taskType) {
  try {
    const actualParsed = ce.parse(actual).canonical;
    const expectedParsed = ce.parse(expected).canonical;
    
    // Проверка на точное совпадение
    if (actualParsed.isEqual(expectedParsed)) {
      return { isCorrect: true };
    }
    
    // Для уравнений в отрезках делаем специальную проверку
    if (taskType === TASK_TYPES.LINE_SEGMENTS || taskType === TASK_TYPES.PLANE_SEGMENTS) {
      // Проверяем, соответствует ли уравнение форме x/a + y/b = 1 (или аналогичной для плоскости)
      const equationForm = checkSegmentEquationForm(actual, expected);
      if (equationForm.isCorrect) {
        return { isCorrect: true };
      }
      if (equationForm.errorType) {
        return { 
          isCorrect: false, 
          errorType: equationForm.errorType, 
          message: equationForm.message 
        };
      }
    }
    
    // Для нормированных уравнений проверяем нормализацию
    if (taskType === TASK_TYPES.LINE_NORMALIZED || taskType === TASK_TYPES.PLANE_NORMALIZED) {
      const normalizedForm = checkNormalizedEquationForm(actual, expected);
      if (normalizedForm.isCorrect) {
        return { isCorrect: true };
      }
      if (normalizedForm.errorType) {
        return { 
          isCorrect: false, 
          errorType: normalizedForm.errorType, 
          message: normalizedForm.message 
        };
      }
    }
    
    // Общая проверка для других случаев
    const actualSimplified = ce.parse(actual).simplify().canonical;
    const expectedSimplified = ce.parse(expected).simplify().canonical;
    
    if (actualSimplified.isEqual(expectedSimplified)) {
      return { isCorrect: true };
    }
    
    // Анализ конкретных ошибок
    const actualStr = actualParsed.toString();
    const expectedStr = expectedParsed.toString();
    
    // Ошибки в знаменателях
    const actualDenominators = actualStr.match(/\/[^+\- ]+/g) || [];
    const expectedDenominators = expectedStr.match(/\/[^+\- ]+/g) || [];
    
    if (actualDenominators.join() !== expectedDenominators.join()) {
      return { 
        isCorrect: false, 
        errorType: 'denominator', 
        message: 'Ошибка в знаменателях' 
      };
    }
    
    // Ошибки в числителях
    const actualNumerators = actualStr.match(/(^|[+\- ])[^/ ]+\//g) || [];
    const expectedNumerators = expectedStr.match(/(^|[+\- ])[^/ ]+\//g) || [];
    
    if (actualNumerators.join() !== expectedNumerators.join()) {
      return { 
        isCorrect: false, 
        errorType: 'numerator', 
        message: 'Ошибка в числителях' 
      };
    }
    
    // Ошибки со знаками
    if (actualStr.replace(/-/g, '') !== expectedStr.replace(/-/g, '')) {
      return { 
        isCorrect: false, 
        errorType: 'sign', 
        message: 'Неверный знак' 
      };
    }
    
    // Общая ошибка
    return { 
      isCorrect: false, 
      errorType: 'general', 
      message: 'Неверное выражение' 
    };
  } catch (e) {
    return { 
      isCorrect: false, 
      errorType: 'format', 
      message: 'Ошибка формата выражения' 
    };
  }
}

// Проверка формы уравнения в отрезках
function checkSegmentEquationForm(actual, expected) {
  try {
    // Приводим к канонической форме x/a + y/b = 1
    const actualParsed = ce.parse(actual).simplify().canonical;
    const expectedParsed = ce.parse(expected).simplify().canonical;
    
    // Проверяем, что правая часть равна 1
    if (!actualParsed.right.isEqual(ce.parse('1').canonical)) {
      return { 
        isCorrect: false, 
        errorType: 'segment_form', 
        message: 'Правая часть уравнения должна быть равна 1' 
      };
    }
    
    // Проверяем, что левая часть - сумма дробей
    const leftSide = actualParsed.left;
    if (!leftSide.isAdd()) {
      return { 
        isCorrect: false, 
        errorType: 'segment_form', 
        message: 'Левая часть должна быть суммой дробей вида x/a + y/b' 
      };
    }
    
    // Проверяем каждый член суммы
    const terms = leftSide.operands;
    for (const term of terms) {
      if (!term.isDivide()) {
        return { 
          isCorrect: false, 
          errorType: 'segment_form', 
          message: 'Каждый член должен быть дробью вида x/a' 
        };
      }
      
      // Проверяем, что числитель - переменная
      const numerator = term.op1;
      if (!numerator.isSymbol()) {
        return { 
          isCorrect: false, 
          errorType: 'segment_form', 
          message: 'Числитель должен быть переменной (x, y или z)' 
        };
      }
    }
    
    // Если все проверки пройдены, но не совпадает с ожидаемым,
    // значит ошибка в значениях отрезков
    return { 
      isCorrect: false, 
      errorType: 'segment_value', 
      message: 'Неверные значения отрезков на осях' 
    };
  } catch (e) {
    return { isCorrect: false };
  }
}

// Проверка нормализованной формы уравнения
function checkNormalizedEquationForm(actual, expected) {
  try {
    const actualParsed = ce.parse(actual).simplify().canonical;
    const expectedParsed = ce.parse(expected).simplify().canonical;
    
    // Проверяем, что свободный член отрицательный (для нормальной формы)
    if (actualParsed.right && actualParsed.right.isEqual(ce.parse('0').canonical)) {
      const lastTerm = actualParsed.left.operands[actualParsed.left.operands.length - 1];
      if (!lastTerm.isNegative()) {
        return { 
          isCorrect: false, 
          errorType: 'normal_form', 
          message: 'Свободный член должен быть отрицательным' 
        };
      }
    }
    
    // Проверяем коэффициенты при переменных
    const expectedCoeffs = getNormalizedCoefficients(expected);
    const actualCoeffs = getNormalizedCoefficients(actual);
    
    for (const [varName, expectedVal] of Object.entries(expectedCoeffs)) {
      if (Math.abs(actualCoeffs[varName] - expectedVal) > 0.001) {
        return { 
          isCorrect: false, 
          errorType: 'normal_coeff', 
          message: 'Неверные коэффициенты при переменных' 
        };
      }
    }
    
    return { isCorrect: false }; // Если не нашли ошибок, но и не подтвердили правильность
  } catch (e) {
    return { isCorrect: false };
  }
}

// Получение нормализованных коэффициентов
function getNormalizedCoefficients(expr) {
  const parsed = ce.parse(expr).simplify().canonical;
  const coeffs = {};
  
  if (parsed.isEqual()) {
    const left = parsed.left;
    const right = parsed.right;
    
    if (right.isEqual(ce.parse('0').canonical)) {
      // Уравнение вида ... = 0
      if (left.isAdd()) {
        for (const term of left.operands) {
          processTerm(term, coeffs);
        }
      } else {
        processTerm(left, coeffs);
      }
    }
  }
  
  return coeffs;
}

function processTerm(term, coeffs) {
  if (term.isMultiply()) {
    for (const factor of term.operands) {
      if (factor.isSymbol()) {
        const coeff = term.divide(factor).evaluate();
        coeffs[factor.toString()] = coeff;
      }
    }
  } else if (term.isSymbol()) {
    coeffs[term.toString()] = 1;
  }
}

// Проверка ответа
function checkAnswer(blockNum) {
  const answerField = document.getElementById(`answerBlock${blockNum}`);
  const feedbackContainer = document.getElementById(`feedback${blockNum}`);
  
  if (!answerField || !feedbackContainer) return;

  let feedbackElement = feedbackContainer.querySelector('.answer-feedback');
  
  if (!feedbackElement) {
    feedbackElement = document.createElement('div');
    feedbackElement.className = 'answer-feedback';
    feedbackContainer.prepend(feedbackElement);
  }

  try {
    const userAnswer = answerField.getValue();
    if (!userAnswer) {
      feedbackElement.textContent = 'Ответ не введен';
      feedbackElement.className = 'answer-feedback answer-incorrect';
      answerScores[blockNum - 1] = 0;
      return;
    }

    const parsedUserAnswer = ce.parse(userAnswer).canonical;
    const correctAnswer = correctAnswers[blockNum - 1];
    const parsedCorrectAnswer = ce.parse(correctAnswer).canonical;

    if (parsedUserAnswer.isEqual(parsedCorrectAnswer)) {
      feedbackElement.textContent = 'Ответ верный!';
      feedbackElement.className = 'answer-feedback answer-correct';
      answerScores[blockNum - 1] = 100;
    } else {
      // Анализ ошибки в ответе
      const errorAnalysis = analyzeStepError(userAnswer, correctAnswer, blockNum - 1);
      
      feedbackElement.textContent = `Ответ неверный. ${errorAnalysis.message}`;
      feedbackElement.className = 'answer-feedback answer-incorrect';
      answerScores[blockNum - 1] = 0;
    }
  } catch (e) {
    feedbackElement.textContent = 'Ошибка в формате ответа';
    feedbackElement.className = 'answer-feedback answer-incorrect';
    answerScores[blockNum - 1] = 0;
  }
}

// Проверка всех шагов решения
function checkSolutionSteps(blockNum) {
  const feedbackContainer = document.getElementById(`feedback${blockNum}`);
  if (!feedbackContainer) return 0;
  
  // Удаляем старые сообщения о шагах (кроме фидбека по ответу)
  const stepFeedbacks = feedbackContainer.querySelectorAll(':not(.answer-feedback)');
  stepFeedbacks.forEach(el => el.remove());
  
  let correctSteps = 0;
  let stepCount = 0;
  const taskType = blockNum - 1; // 0-3 соответствует типам задач
  
  // Подсчет шагов
  while (document.getElementById(`step-${blockNum}-${stepCount}`)) {
    stepCount++;
  }
  
  // Проверка каждого шага
  for (let i = 0; i < stepCount; i++) {
    const input = document.getElementById(`step-${blockNum}-${i}`);
    if (!input) continue;

    try {
      const latex = input.getValue();
      if (!latex) continue;
      
      const line = document.createElement('div');
      line.className = 'feedback-line';
      
      // Проверяем шаг на соответствие любому из допустимых вариантов
      let isStepCorrect = false;
      let bestMatchError = null;
      
      for (const correctStep of correctSolutionSteps[taskType]) {
        const analysis = analyzeStepError(latex, correctStep, taskType);
        
        if (analysis.isCorrect) {
          isStepCorrect = true;
          break;
        }
        
        // Сохраняем наиболее точное описание ошибки
        if (!bestMatchError || analysis.message.length > bestMatchError.message.length) {
          bestMatchError = analysis;
        }
      }
      
      if (isStepCorrect) {
        line.textContent = `Шаг ${i + 1}: корректно`;
        line.classList.add('correct');
        correctSteps++;
      } else {
        line.textContent = `Шаг ${i + 1}: ошибка — ${bestMatchError.message}`;
        line.classList.add('error');
      }
      
      feedbackContainer.appendChild(line);
    } catch (e) {
      const line = document.createElement('div');
      line.className = 'feedback-line error';
      line.textContent = `Шаг ${i + 1}: неверный формат выражения`;
      feedbackContainer.appendChild(line);
    }
  }
  
  // Возвращаем процент правильных шагов
  return stepCount > 0 ? Math.round((correctSteps / stepCount) * 100) : 0;
}

// Оценка всех задач
function evaluateAllTasks() {
  // Сначала проверяем все ответы
  for (let blockNum = 1; blockNum <= 4; blockNum++) {
    checkAnswer(blockNum);
  }

  totalScore = 0;
  totalTasksSubmitted = 0;
  const detailedResults = [];
  const finalContainer = document.getElementById('finalResultsContainer');
  if (finalContainer) finalContainer.style.display = 'none';

  // Проверяем шаги решений и вычисляем оценки
  for (let blockNum = 1; blockNum <= 4; blockNum++) {
    const stepsScore = checkSolutionSteps(blockNum);
    const answerScore = answerScores[blockNum - 1];
    
    // Вес шагов - 50%, ответа - 50%
    const totalTaskScore = Math.round((stepsScore * 0.5) + (answerScore * 0.5));
    
    totalScore += totalTaskScore;
    totalTasksSubmitted++;
    
    // Сохраняем детальные результаты
    detailedResults.push({
      task: blockNum,
      stepsScore: stepsScore,
      answerScore: answerScore,
      totalScore: totalTaskScore
    });
    
    // Добавляем оценку за задание в фидбек
    const feedback = document.getElementById(`feedback${blockNum}`);
    if (feedback) {
      const result = document.createElement('div');
      result.className = 'task-result';
      result.textContent = `Оценка за задание ${blockNum}: ${totalTaskScore}% (Шаги: ${stepsScore}%, Ответ: ${answerScore}%)`;
      feedback.appendChild(result);
    }
  }

  // Выводим итоговые результаты
  if (totalTasksSubmitted === 4 && finalContainer) {
    const avgScore = Math.round(totalScore / 4);
    const finalScoreDisplay = document.getElementById('finalScoreDisplay');
    
    if (finalScoreDisplay) {
      finalScoreDisplay.innerHTML = `
        <p class="final-score">Общая оценка: ${avgScore}%</p>
        <div class="detailed-results">
          ${detailedResults.map(result => `
            <div class="task-result-detail">
              <p>Задание ${result.task}: ${result.totalScore}%</p>
              <p class="breakdown">(Шаги: ${result.stepsScore}%, Ответ: ${result.answerScore}%)</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    finalContainer.style.display = 'block';
    finalContainer.scrollIntoView({ behavior: 'smooth' });

    // SCORM integration
    ScormAPI.initialize();
    ScormAPI.setCompletionStatus("completed");
    ScormAPI.setScore(avgScore);
    ScormAPI.saveAndFinish();

    // Блокируем кнопки после завершения
    const endButton = document.getElementById('end');
    if (endButton) endButton.disabled = true;
    
    for (let blockNum = 1; blockNum <= 4; blockNum++) {
      const addButton = document.getElementById(`action${blockNum}`);
      const deleteButton = document.getElementById(`actionDelet${blockNum}`);
      
      if (addButton) addButton.disabled = true;
      if (deleteButton) deleteButton.disabled = true;
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  ScormAPI.initialize();
  [1, 2, 3, 4].forEach(setupTask);
  
  const endButton = document.getElementById('end');
  if (endButton) {
    endButton.addEventListener('click', evaluateAllTasks);
  }
});
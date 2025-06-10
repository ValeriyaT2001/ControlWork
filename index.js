import { ComputeEngine } from 'https://unpkg.com/@cortex-js/compute-engine?module';
const ce = new ComputeEngine();

const examples = [
  '3x + 4y - 12= 0',
  '2x + 3y + 6z - 18 = 0',
  '4x - 3y + 12 = 0',
  'x + 2y + 2z - 8= 0'
];

const correctSolutionSteps = [
  ['x/4 + y/3 = 1', 'y/3 + x/4 = 1', "x/-4 + y/-3 = -1", '3x + 4y = 12', '3x + 4y - 12 = 0', 'y/-3 + x/-4 = -1', '-3x - 4y = -12', '-3x - 4y + 12 = 0',  '3x/12 + 4y/12= 1', '3x/-12 + 4y/-12= -1'],
  ['x/9 + y/6 + z/3 = 1', 'x/-9 + y/-6 + z/-3 = -1', '2x + 3y + 6z - 18 = 0', '-2x - 3y - 6z + 18 = 0',   '2x + 3y + 6z = 18','-2x - 3y - 6z = -18','2x/-18 + 3y/-18 + 6z/-18 = -1', '2x/18 + 3y/18 + 6z/18 = 1'],
  ["-1/sqrt(4*4+(-3*-3))","-1/sqrt(4^2+(-3^2))", "-1/5", "(-1/sqrt(4^2+(-3^2)))=-1/5", "(-1/sqrt(4*4+(-3*-3)))=-1/5", "-1/sqrt(16+9)","(-1/sqrt(16+9))=-1/5",'-4x/5 + 3y/5 - 12/5 = 0'],
  ["1/sqrt(1*1+2*2+2*2)","1/sqrt(1^2+2^2+2^2)", "1/3", "1/sqrt(1^2+2^2+2^2)=1/3", "1/sqrt(1*1+2*2+2*2)=1/3","1/sqrt(1+4+4)","1/sqrt(1+4+4)=1/3",    'x/3 + 2y/3 + 2z/3 - 8/3= 0']
];

const answer = [
  'x/4 + y/3 = 1',
  'x/9 + y/6 + z/3 = 1',
  '-4x/5 + 3y/5 - 12/5 = 0',
  'x/3 + 2y/3 + 2z/3 - 8/3= 0'
];

let totalScore = 0;
let totalTasksSubmitted = 0;
let answerScores = [0, 0, 0, 0];

const ScormAPI = {
  isInitialized: false,
  API: null,

  initialize: function() {
    if (this.isInitialized) return true;

    const findAPI = () => {
      const locations = [
        window,
        window.parent,
        window.top,
        window.parent.parent,
        window.top.opener
      ];

      for (let i = 0; i < locations.length; i++) {
        try {
          if (locations[i] && locations[i].API) {
            return locations[i].API;
          }
        } catch (e) {
          continue;
        }
      }
      return null;
    };

    this.API = findAPI();

    if (this.API) {
      try {
        const result = this.API.LMSInitialize("");
        if (result === "true") {
          this.isInitialized = true;
          console.log("SCORM API initialized successfully");
          return true;
        }
      } catch (e) {
        console.error("SCORM initialization error:", e);
      }
    }

    console.warn("SCORM API not found or initialization failed");
    return false;
  },

  setCompletionStatus: function(status) {
    if (!this.isInitialized || !this.API) return false;
    try {
      this.API.LMSSetValue("cmi.core.lesson_status", status);
      return true;
    } catch (e) {
      console.error("Error setting completion status:", e);
      return false;
    }
  },

  setScore: function(score) {
    if (!this.isInitialized || !this.API) return false;
    try {
      this.API.LMSSetValue("cmi.core.score.raw", score.toString());
      this.API.LMSSetValue("cmi.core.score.min", "0");
      this.API.LMSSetValue("cmi.core.score.max", "100");
      return true;
    } catch (e) {
      console.error("Error setting score:", e);
      return false;
    }
  },

  saveAndFinish: function() {
    if (!this.isInitialized || !this.API) return false;
    try {
      this.API.LMSCommit("");
      this.API.LMSFinish("");
      return true;
    } catch (e) {
      console.error("Error saving/finishing SCORM session:", e);
      return false;
    }
  },

  storeDetailedResults: function(results) {
    if (!this.isInitialized || !this.API) return false;
    try {
      this.API.LMSSetValue("cmi.suspend_data", JSON.stringify(results));
      return true;
    } catch (e) {
      console.error("Error storing suspend data:", e);
      return false;
    }
  }
};

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
    const correctAnswer = answer[blockNum - 1];
    const parsedCorrectAnswer = ce.parse(correctAnswer).canonical;

    if (parsedUserAnswer.isEqual(parsedCorrectAnswer)) {
      feedbackElement.textContent = 'Ответ верный!';
      feedbackElement.className = 'answer-feedback answer-correct';
      answerScores[blockNum - 1] = 100;
    } else {
      feedbackElement.textContent = `Ответ неверный. Ожидалось: ${correctAnswer}`;
      feedbackElement.className = 'answer-feedback answer-incorrect';
      answerScores[blockNum - 1] = 0;
    }
  } catch (e) {
    feedbackElement.textContent = 'Ошибка в формате ответа';
    feedbackElement.className = 'answer-feedback answer-incorrect';
    answerScores[blockNum - 1] = 0;
  }
}

function evaluateAllTasks() {
  totalScore = 0;
  totalTasksSubmitted = 0;
  const detailedResults = [];
  const finalContainer = document.getElementById('finalResultsContainer');
  if (finalContainer) finalContainer.style.display = 'none';

  for (let blockNum = 1; blockNum <= 4; blockNum++) {
    const correctSolutionStep = correctSolutionSteps[blockNum - 1];
    const feedback = document.getElementById(`feedback${blockNum}`);
    
    if (!feedback) continue;
    
    const stepFeedbacks = feedback.querySelectorAll(':not(.answer-feedback)');
    stepFeedbacks.forEach(el => el.remove());
    
    let stepCount = 0;
    let hasErrors = false;
    let errorSeverity = 0; // 0 - нет ошибок, 1 - легкие (12%), 2 - тяжелые (33%)
    const taskResults = [];

    // Проверка ответа (только для информации)
    const answerField = document.getElementById(`answerBlock${blockNum}`);
    if (answerField) {
      try {
        const userAnswer = answerField.getValue();
        const parsedUserAnswer = ce.parse(userAnswer).canonical;
        const correctAnswer = answer[blockNum - 1];
        const parsedCorrectAnswer = ce.parse(correctAnswer).canonical;
        
        const line = document.createElement('div');
        line.className = 'answer-feedback';
        if (parsedUserAnswer.isEqual(parsedCorrectAnswer)) {
          line.textContent = 'Ответ верный';
          line.classList.add('correct');
        } else {
          line.textContent = 'Ответ неверный';
          line.classList.add('error');
        }
        feedback.prepend(line);
      } catch (e) {
        const line = document.createElement('div');
        line.className = 'answer-feedback error';
        line.textContent = 'Ошибка в формате ответа';
        feedback.prepend(line);
      }
    }

    // Подсчет шагов
    while (document.getElementById(`step-${blockNum}-${stepCount}`)) {
      stepCount++;
    }

    // Проверка каждого шага на ошибки
    for (let i = 0; i < stepCount; i++) {
      const input = document.getElementById(`step-${blockNum}-${i}`);
      if (!input) continue;

      try {
        const latex = input.getValue();
        if (!latex) continue;

        const parsed = ce.parse(latex).canonical;
        const isCorrect = correctSolutionStep.some(correct => {
          const expected = ce.parse(correct).canonical;
          return parsed.isEqual(expected);
        });

        if (!isCorrect) {
          hasErrors = true;
          const expectedParsed = ce.parse(correctSolutionStep[0]).canonical;
          const error = analyzeError(parsed, expectedParsed);
          
          const line = document.createElement('div');
          line.className = 'feedback-line error';
          line.textContent = `Ошибка в шаге ${i + 1}: ${error}`;
          feedback.appendChild(line);

          // Определяем серьезность ошибки
          if (error === 'Неверное выражение' && errorSeverity < 2) {
            errorSeverity = 2;
          } else if (errorSeverity < 1) {
            errorSeverity = 1;
          }
        }
      } catch (e) {
        hasErrors = true;
        errorSeverity = 2; // Неверный формат = тяжелая ошибка
        
        const line = document.createElement('div');
        line.className = 'feedback-line error';
        line.textContent = `Шаг ${i + 1}: неверный формат выражения`;
        feedback.appendChild(line);
      }
    }

    // Расчет оценки за решение
    let taskScore = 100;
    if (hasErrors) {
      if (errorSeverity === 2) {
        taskScore -= 33; // Тяжелая ошибка
      } else {
        taskScore -= 12; // Легкая ошибка
      }
    }
    
    totalScore += taskScore;
    totalTasksSubmitted++;

    const result = document.createElement('div');
    result.className = 'task-result';
    result.textContent = `Оценка за решение задания ${blockNum}: ${taskScore}%`;
    feedback.appendChild(result);

    detailedResults.push({
      task: blockNum,
      score: taskScore,
      errorSeverity: errorSeverity
    });
  }

  if (totalTasksSubmitted === 4 && finalContainer) {
    const avgScore = Math.round(totalScore / 4);
    const finalScoreDisplay = document.getElementById('finalScoreDisplay');
    
    if (finalScoreDisplay) {
      finalScoreDisplay.innerHTML = `
        <p class="final-score">Общая оценка: ${avgScore}%</p>
        <div class="detailed-results">
          ${detailedResults.map(result => `
            <div class="task-result-detail">
              <p>Задание ${result.task}: ${result.score}%</p>
              ${result.score < 100 ? `<p>Причина снижения: ${result.errorSeverity === 2 ? 'серьезная ошибка (-33%)' : 'незначительная ошибка (-12%)'}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    finalContainer.style.display = 'block';
    finalContainer.scrollIntoView({ behavior: 'smooth' });

    ScormAPI.setCompletionStatus("completed");
    ScormAPI.setScore(avgScore);
    ScormAPI.storeDetailedResults(detailedResults);
    ScormAPI.saveAndFinish();

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

function analyzeError(actual, expected) {
  const actualStr = actual.toString();
  const expectedStr = expected.toString();
  if (actualStr.includes('-') !== expectedStr.includes('-')) return 'Ошибка со знаком';
  if (!actualStr.includes('/') && expectedStr.includes('/')) return 'Ошибка в знаменателе';
  if (!actualStr.includes(expectedStr.slice(0, 3))) return 'Неверно';
  return 'Неверное выражение';
}

document.addEventListener('DOMContentLoaded', () => {
  ScormAPI.initialize();
  [1, 2, 3, 4].forEach(setupTask);
  
  const endButton = document.getElementById('end');
  if (endButton) {
    endButton.addEventListener('click', evaluateAllTasks);
  }
});
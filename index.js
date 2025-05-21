"use strict"
let thirdNumber;
let firstNumber;
let secondNumber;
let fourNumber;
let num1;
let num2;
let num3;
function random() {
  thirdNumber = Math.floor(Math.random() * 10) + 1; // Генерируем третье число от 1 до 10
  secondNumber = thirdNumber * (Math.floor(Math.random() * 10) + 1); // Второе число делится на третье
  firstNumber = thirdNumber * (Math.floor(Math.random() * 10) + 1); // Первое число делится на третье
  fourNumber = thirdNumber * (Math.floor(Math.random() * 10) + 1); // Второе число делится на третье
}

function generateNumbers() {
  const k = Math.floor(Math.random() * 30) + 1; // выбираем целое число от 1 до 20
  const a = Math.floor(Math.random() * k) + 1;
  const bSquared = k * k - a * a;
  const b = Math.sqrt(bSquared);

  // Проверяем, является ли b целым числом и bSquared неотрицательным
  if (b === 0) {
    return generateNumbers();
  }
  if (bSquared >= 0 && Number.isInteger(b)) {
    num1 = a;
    num2 = b;
  } else {
    return generateNumbers(); // повторяем, если не нашли подходящие числа
  }
}

function generateNumbers2() {
  const k = Math.floor(Math.random() * 30) + 1; // выбираем целое число от 1 до 10
  const a = Math.floor(Math.random() * k) + 1;
  const b = Math.floor(Math.random() * k) + 1;
  const cSquared = k * k - (a * a + b * b);
  const c = Math.sqrt(cSquared);

  // Проверяем, является ли c целым числом и cSquared неотрицательным
  if (c === 0) {
    return generateNumbers2();
  }
  if (cSquared >= 0 && Number.isInteger(c)) {
    num1 = a;
    num2 = b;
    num3 = c;
  } else {
    return generateNumbers2(); // повторяем, если не нашли подходящие числа
  }
}

function exerciseOne() {
  const action = document.getElementById("action");
  const actionDelet = document.getElementById("actionDelet");
  const Blocks = document.getElementById("Blocks");
  const send = document.getElementById("send");
  const exampleBlock1 = document.getElementById('exampleBlock1');
  random();
  const a = firstNumber;
  const b = secondNumber;
  const c = thirdNumber;

  action.onclick = newLine;
  actionDelet.onclick = deletLine;
  send.onclick = answer;
  let g = 0;

  function deletLine() {
    if (g === 0) return;
    const block = document.getElementById(`Block${g}`);
    block.remove();
    g--;
    if (g < 4) {
      action.removeAttribute("disabled")
    }
  }

  function newLine() {
    g++;
    if (g >= 4) {
      action.setAttribute('disabled', '');
    }

    Blocks.innerHTML += `
        <div class = "Block" id = "Block${g}">
        <math-field readonly id = "math${g}"  style="font-size:2em">
        \\placeholder[xxx]{?}
        </math-field>
      </div>
    `
  }

  function answer() {
    const ce = MathfieldElement.computeEngine;
    const math1 = document.getElementById("math1");
    const math2 = document.getElementById("math2");
    const math3 = document.getElementById("math3");
    const math4 = document.getElementById("math4");

    function mathOne() {
      const expression = ce.parse(math1.getPromptValue("xxx"));
      let correctExpression = ce.parse(`${a}x+${b}y=${-c}`);
      let ok = expression.isSame(correctExpression);
      if (ok === false) {
        if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
          console.log("Ошибка слева");
          console.log("Неверно вычесленный коэфициент");
        } else {
          console.log("Ошибка справа");
          if (expression.json[2] !== -c) {
            console.log("Неправильный знак");
          } else {
            console.log("Вы ошиблись при переносе или делении");
          }
        }
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{x}{${-c / a}}+\\frac{y}{${-c / b}}=1`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
            // console.log(expression.json[1][2][2]);
            // console.log(correctExpression.json[1][2][2]);
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{${a}x}{${-c}}+\\frac{${b}y}{${-c} + ${c / -c}}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
            // console.log(expression.json[1][2][2]);
            // console.log(correctExpression.json[1][2][2]);
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{${a}x}{${c}}+\\frac{${b}y}{${c}} + ${c / c}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
            // console.log(expression.json[1][2][2]);
            // console.log(correctExpression.json[1][2][2]);
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    function mathTwo() {
      const expression = ce.parse(math2.getPromptValue("xxx"));
      let correctExpression = ce.parse(`\\frac{${a}x}{${-c}}+\\frac{${b}y}{${-c}}=1`);
      let ok = expression.isSame(correctExpression);
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{x}{${-c / a}}+\\frac{y}{${-c / b}}=1`);
        ok = expression.isSame(correctExpression);
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{${a}x}{${c}}+\\frac{${b}y}{${c}}=-1`);
        ok = expression.isSame(correctExpression);
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{x}{${c / a}}+\\frac{y}{${c / b}}=-1`);
        ok = expression.isSame(correctExpression);
      }
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    function mathThree() {
      const expression = ce.parse(math3.getPromptValue("xxx"));
      let correctExpression = ce.parse(`\\frac{${a}x}{${-c}}+\\frac{${b}y}{${-c}}=1`);
      let ok = expression.isSame(correctExpression);
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{x}{${-c / a}}+\\frac{y}{${-c / b}}=1`);
        ok = expression.isSame(correctExpression);
      }
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    function mathFour() {
      const expression = ce.parse(math4.getPromptValue("xxx"));
      const correctExpression = ce.parse(`\\frac{x}{${-c / a}}+\\frac{y}{${-c / b}}=1`);
      const ok = expression.isSame(correctExpression);
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    mathOne();
    mathTwo();
    mathThree();
    mathFour();
  }
  exampleBlock1.innerHTML = `
  <math-field readonly id = "example"  style="font-size:2em">
  ${a}x+${b}y+${c}=0;
  </math-field>
  `;
}

function exerciseTwo() {
  const actionDelet = document.getElementById("actionDelet2");
  const action2 = document.getElementById("action2");
  const Blocks2 = document.getElementById("Blocks2");
  const send2 = document.getElementById("send2");
  const exampleBlock2 = document.getElementById('exampleBlock2');
  random();
  const a = firstNumber;
  const b = secondNumber;
  const c = fourNumber;
  const d = thirdNumber;

  action2.onclick = newLine2;
  send2.onclick = answer2;
  actionDelet.onclick = deletLine;
  let g = 0;

  function deletLine() {
    if (g === 0) return;
    const block = document.getElementById(`Block2${g}`);
    block.remove();
    g--;
    if (g < 4) {
      action2.removeAttribute("disabled")
    }
  }
  function newLine2() {
    g++;
    if (g >= 4) {
      action2.setAttribute('disabled', '');
    }

    Blocks2.innerHTML += `
        <div class = "Block" id = "Block2${g}">
        <math-field readonly id = "math2${g}"  style="font-size:2em">
        \\placeholder[xxx]{?}
        </math-field>
      </div>
    `
  }

  function answer2() {
    const ce = MathfieldElement.computeEngine;
    const math21 = document.getElementById("math21");
    const math22 = document.getElementById("math22");
    const math23 = document.getElementById("math23");
    const math24 = document.getElementById("math24");

    function mathOne() {
      const expression = ce.parse(math21.getPromptValue("xxx"));
      let correctExpression = ce.parse(`${a}x+${b}y + ${c}z=${-d}`);
      let ok = expression.isSame(correctExpression);
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{x}{${-d / a}}+\\frac{y}{${-d / b}}+\\frac{z}{${-d / c}}=1`);
        ok = expression.isSame(correctExpression);
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{${a}x}{${-d}}+\\frac{${b}y}{${-d}} + \\frac{${c}z}{${-d}}+${d / -d}=0`);
        ok = expression.isSame(correctExpression);
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{${a}x}{${d}}+\\frac{${b}y}{${d}} + \\frac{${c}z}{${d}}+${d / d}=0`);
        ok = expression.isSame(correctExpression);
      }
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    function mathTwo() {
      const expression = ce.parse(math22.getPromptValue("xxx"));
      let correctExpression = ce.parse(`\\frac{${a}x}{${-d}}+\\frac{${b}y}{${-d}} + \\frac{${c}z}{${-d}=1`);
      let ok = expression.isSame(correctExpression);
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{x}{${-d / a}}+\\frac{y}{${-d / b}}+\\frac{z}{${-d / c}}=1`);
        ok = expression.isSame(correctExpression);
      }
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{${a}x}{${d}}+\\frac{${b}y}{${d}} + \\frac{${c}z}{${d}}=-1`);
        ok = expression.isSame(correctExpression);
      }
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    function mathThree() {
      const expression = ce.parse(math23.getPromptValue("xxx"));
      let correctExpression = ce.parse(`\\frac{${a}x}{${-d}}+\\frac{${b}y}{${-d}} + \\frac{${c}z}{${-d}}=1`);
      let ok = expression.isSame(correctExpression);
      if (ok === false) {
        correctExpression = ce.parse(`\\frac{x}{${-d / a}}+\\frac{y}{${-d / b}}+\\frac{z}{${-d / c}}=1`);
        ok = expression.isSame(correctExpression);
      }
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    function mathFour() {
      const expression = ce.parse(math24.getPromptValue("xxx"));
      const correctExpression = ce.parse(`\\frac{x}{${-d / a}}+\\frac{y}{${-d / b}}+\\frac{z}{${-d / c}}=1`);
      const ok = expression.isSame(correctExpression);
      console.info(ok ? "Correct!" : "Incorrect!");
    }

    mathOne();
    mathTwo();
    mathThree();
    mathFour();
  }
  exampleBlock2.innerHTML = `
  <math-field readonly id = "example2"  style="font-size:2em">
  ${a}x+${b}y+${c}z+${d}=0;
  </math-field>
  `;
}





// function exerciseTwo(){
//   const exampleBlock2 = document.getElementById('exampleBlock2');
//   const one2 = document.getElementById('one2');
//   const two2 = document.getElementById('two2');
//   const answer2 = document.getElementById("answer2");

//   const a = random(min, max);
//   const b = random(min, max);
//   const c = random(min, max);
//   const d = random(min, max);

//   one2.addEventListener('input', (ev) => { 
//     const ce = MathfieldElement.computeEngine;
//     const expression =ce.parse(one2.getPromptValue("xxx"));
//     const correctExpression = ce.parse(`${a}x+${b}y+${c}z=${-d}`);
//     const ok = expression.isSame(correctExpression);
//     console.info(ok ? "Correct!" : "Incorrect!");
//   });

//   two2.addEventListener('input', (ev) => { 
//     const ce = MathfieldElement.computeEngine;
//     const expression =ce.parse(two2.getPromptValue("yyy"));
//     const correctExpression = ce.parse(`\\frac{${a}x}{${-d}}+\\frac{${b}y}{${-d}+\\frac{${c}z}{${-d}}=1`);
//     const ok = expression.isSame(correctExpression);
//     console.info(ok ? "Correct!" : "Incorrect!");
//   });

//   answer2.addEventListener('input', (ev) =>{ 
//     const ce = MathfieldElement.computeEngine;
//     const expression =ce.parse(answer2.getPromptValue("zzz"));
//     const correctExpression = ce.parse(`\\frac{x}{${-d/a}}+\\frac{y}{${-d/b}+\\frac{z}{${-d/c}}=1`);
//     const ok = expression.isSame(correctExpression);
//     console.info(ok ? "Correct!" : "Incorrect!");
//   });


// }


function exerciseThree() {
  const action = document.getElementById("action3");
  const actionDelet = document.getElementById("actionDelet3");
  const Blocks = document.getElementById("Blocks3");
  const send = document.getElementById("send3");
  const exampleBlock = document.getElementById('exampleBlock3');
  random();
  generateNumbers();
  const a = num1;
  const b = num2;
  const c = thirdNumber;
  let normFactor;
  if (c < 0) {
    normFactor = Math.sqrt(a * a + b * b);
  } else {
    normFactor = -Math.sqrt(a * a + b * b);
  }
  console.log(normFactor);

  action.onclick = newLine;
  actionDelet.onclick = deletLine;
  send.onclick = answer;
  let g = 0;

  function deletLine() {
    if (g === 0) return;
    const block = document.getElementById(`Block3${g}`);
    block.remove();
    g--;
    if (g < 10) {
      action.removeAttribute("disabled")
    }
  }

  function newLine() {
    g++;
    if (g >= 10) {
      action.setAttribute('disabled', '');
    }

    Blocks.innerHTML += `
        <div class = "Block" id = "Block3${g}">
        <math-field readonly id = "math3${g}"  style="font-size:2em">
        \\placeholder[xxx]{?}
        </math-field>
      </div>
    `
  }

  function answer() {
    const ce = MathfieldElement.computeEngine;
    const math1 = document.getElementById("math31");
    const math2 = document.getElementById("math32");
    const math3 = document.getElementById("math33");
    const math4 = document.getElementById("math34");
    const math5 = document.getElementById("math35");
    const math6 = document.getElementById("math36");


    // _______________________________________________________________________________________________________

    function mathOne() {
      const expression = ce.parse(math1.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c}`);
      let ok = expression.isSame(correctExpression);
      console.log(expression.json);
      if (expression.json[1] == "A" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[1][2]) {
          ok = true;
        } else {
          console.log("Неверно записан первый коэффицент");
        }
      }

      if (expression.json.length === 4 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 3) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }
      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && (expression.json[0] === 'Sqrt' || expression.json[0] === 'Negate') && (Number.isFinite(expression.json[1][2][1]) === true || Number.isFinite(expression.json[1][1][2][1]) === true)) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
        } else {
          correctExpression = ce.parse(`-\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === false) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
        } else {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        } else {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=\\frac{1}{${normFactor}}`);
        } else {
          correctExpression = ce.parse(`-\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=-\\frac{1}{${normFactor}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+${c}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 4) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+${c})=0`);
        ok = expression.isSame(correctExpression);

        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!1" : "Incorrect!1");
    }

    // ______________________________________________________________________________________________________________________________________
    // ______________________________________________________________________________________________________________________________________

    function mathTwo() {
      const expression = ce.parse(math2.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c}`);
      let ok = expression.isSame(correctExpression);

      if (expression.json[1] == "B" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[2][2]) {
          ok = true;
        } else {
          console.log("Неверно записан второй коэффицент");
        }
      }

      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === true) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
        } else {
          correctExpression = ce.parse(`-\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === false) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
        } else {
          correctExpression = ce.parse(`-\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        } else {
          correctExpression = ce.parse(`-\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        if (c < 0) {
          correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=\\frac{1}{${normFactor}}`);
        } else {
          correctExpression = ce.parse(`-\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=\\frac{1}{${normFactor}}`);
        }
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+${c}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 4) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+${c})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!2" : "Incorrect!2");
    }

    // _______________________________________________________________________________________________________________________________________
    // _______________________________________________________________________________________________________________________________________


    function mathThree() {
      const expression = ce.parse(math3.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c}`);
      let ok = expression.isSame(correctExpression);
      if (expression.json[1] == "C" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[3][2]) {
          ok = true;
        } else {
          console.log("Неверно записан третий коэффицент");
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }


      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+${c}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 4) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+${c})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!3" : "Incorrect!3");
    }

    // _____________________________________________________________________________________________________________________________________________________________
    // _______________________________________________________________________________________________________________________________________


    function mathFour() {
      const expression = ce.parse(math4.getPromptValue("xxx"));
      let correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
      let ok = expression.isSame(correctExpression);

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === false) {
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }


      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }


      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+${c}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 4) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+${c})=0`);
        ok = expression.isSame(correctExpression);

        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!4" : "Incorrect!4");
    }

    // ____________________________________________________________________________________________________________________________________________
    // ____________________________________________________________________________________________________________________________________________

    function mathFive() {
      const expression = ce.parse(math5.getPromptValue("xxx"));
      let correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
      let ok = expression.isSame(correctExpression);

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === true) {
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+${c}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 4) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+${c})=0`);
        ok = expression.isSame(correctExpression);

        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!5" : "Incorrect!5");
    }

    // __________________________________________________________________________________________________________________________________________________________________


    function mathSix() {
      const expression = ce.parse(math6.getPromptValue("xxx"));
      let correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}`);
      let ok = expression.isSame(correctExpression);

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === true) {
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][1]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+${c}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 4) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+${c})=0`);
        ok = expression.isSame(correctExpression);

        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!6" : "Incorrect!6");
    }

    mathOne();
    mathTwo();
    mathThree();
    mathFour();
    mathFive();
    mathSix();
  }
  exampleBlock.innerHTML = `
  <math-field readonly id = "example3"  style="font-size:2em">
  ${a}x+${b}y+${c}=0;
  </math-field>
  `;
}

//^-----------------------------------------------------------------------------------------------------------------------------------------------------------------^
//^-----------------------------------------------------------------------------------------------------------------------------------------------------------------^
//^-----------------------------------------------------------------------------------------------------------------------------------------------------------------^
//^-----------------------------------------------------------------------------------------------------------------------------------------------------------------^


function exerciseFour() {
  const action = document.getElementById("action4");
  const actionDelet = document.getElementById("actionDelet4");
  const Blocks = document.getElementById("Blocks4");
  const send = document.getElementById("send4");
  const exampleBlock = document.getElementById('exampleBlock4');
  random();
  generateNumbers2();
  const a = num1;
  const b = num2;
  const c = num3;
  const d = thirdNumber;
  const normFactor = Math.sqrt(a * a + b * b + c * c);
  console.log(normFactor);

  action.onclick = newLine;
  actionDelet.onclick = deletLine;
  send.onclick = answer;
  let g = 0;

  function deletLine() {
    if (g === 0) return;
    const block = document.getElementById(`Block4${g}`);
    block.remove();
    g--;
    if (g < 10) {
      action.removeAttribute("disabled")
    }
  }

  function newLine() {
    g++;
    if (g >= 10) {
      action.setAttribute('disabled', '');
    }

    Blocks.innerHTML += `
        <div class = "Block" id = "Block4${g}">
        <math-field readonly id = "math4${g}"  style="font-size:2em">
        \\placeholder[xxx]{?}
        </math-field>
      </div>
    `
  }

  function answer() {
    const ce = MathfieldElement.computeEngine;
    const math1 = document.getElementById("math41");
    const math2 = document.getElementById("math42");
    const math3 = document.getElementById("math43");
    const math4 = document.getElementById("math44");
    const math5 = document.getElementById("math45");
    const math6 = document.getElementById("math46");


    // _______________________________________________________________________________________________________

    function mathOne() {
      const expression = ce.parse(math1.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c},D=${d}`);
      let ok = expression.isSame(correctExpression);
      if (expression.json[1] == "A" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[1][2]) {
          ok = true;
        } else {
          console.log("Неверно записан первый коэффицент");
        }
      }

      if (expression.json.length === 5 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (expression.json[4][2] !== correctExpression.json[4][2]) {
            console.log("Неверно записан четвертый коэффицент");
            minErr++;
          }
          if (minErr === 4) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 4 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 3) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+\\frac{${c}}{${normFactor}}*z+${d}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 5) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}*z+${d / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+z${c}+${d})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!1" : "Incorrect!1");
    }

    // ______________________________________________________________________________________________________________________________________
    // ______________________________________________________________________________________________________________________________________

    function mathTwo() {
      const expression = ce.parse(math2.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c},D=${d}`);
      let ok = expression.isSame(correctExpression);
      if (expression.json[1] == "A" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[1][2]) {
          ok = true;
        } else {
          console.log("Неверно записан первый коэффицент");
        }
      }

      if (expression.json.length === 5 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (expression.json[4][2] !== correctExpression.json[4][2]) {
            console.log("Неверно записан четвертый коэффицент");
            minErr++;
          }
          if (minErr === 4) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 4 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 3) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+\\frac{${c}}{${normFactor}}*z+${d}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 5) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}*z+${d / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+z${c}+${d})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!2" : "Incorrect!2");
    }
    // _______________________________________________________________________________________________________________________________________
    // _______________________________________________________________________________________________________________________________________


    function mathThree() {
      const expression = ce.parse(math3.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c},D=${d}`);
      let ok = expression.isSame(correctExpression);
      if (expression.json[1] == "A" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[1][2]) {
          ok = true;
        } else {
          console.log("Неверно записан первый коэффицент");
        }
      }

      if (expression.json.length === 5 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (expression.json[4][2] !== correctExpression.json[4][2]) {
            console.log("Неверно записан четвертый коэффицент");
            minErr++;
          }
          if (minErr === 4) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 4 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 3) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+\\frac{${c}}{${normFactor}}*z+${d}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 5) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}*z+${d / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+z${c}+${d})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      console.info(ok ? "Correct!3" : "Incorrect!3");
    }
    // _____________________________________________________________________________________________________________________________________________________________
    // _______________________________________________________________________________________________________________________________________


    function mathFour() {
      const expression = ce.parse(math4.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c},D=${d}`);
      let ok = expression.isSame(correctExpression);
      if (expression.json[1] == "A" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[1][2]) {
          ok = true;
        } else {
          console.log("Неверно записан первый коэффицент");
        }
      }

      if (expression.json.length === 5 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (expression.json[4][2] !== correctExpression.json[4][2]) {
            console.log("Неверно записан четвертый коэффицент");
            minErr++;
          }
          if (minErr === 4) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 4 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 3) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+\\frac{${c}}{${normFactor}}*z+${d}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 5) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}*z+${d / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+z${c}+${d})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }
      console.info(ok ? "Correct!4" : "Incorrect!4");
    }
    // ____________________________________________________________________________________________________________________________________________
    // ____________________________________________________________________________________________________________________________________________

    function mathFive() {
      const expression = ce.parse(math5.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c},D=${d}`);
      let ok = expression.isSame(correctExpression);
      if (expression.json[1] == "A" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[1][2]) {
          ok = true;
        } else {
          console.log("Неверно записан первый коэффицент");
        }
      }

      if (expression.json.length === 5 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (expression.json[4][2] !== correctExpression.json[4][2]) {
            console.log("Неверно записан четвертый коэффицент");
            minErr++;
          }
          if (minErr === 4) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 4 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 3) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+\\frac{${c}}{${normFactor}}*z+${d}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 5) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}*z+${d / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+z${c}+${d})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }
      console.info(ok ? "Correct!5" : "Incorrect!5");
    }

    // __________________________________________________________________________________________________________________________________________________________________

    function mathSix() {
      const expression = ce.parse(math6.getPromptValue("xxx"));
      let correctExpression = ce.parse(`A=${a}, B=${b},C=${c},D=${d}`);
      let ok = expression.isSame(correctExpression);
      if (expression.json[1] == "A" && expression.json[0] === 'Equal') {
        if (expression.json[2] == correctExpression.json[1][2]) {
          ok = true;
        } else {
          console.log("Неверно записан первый коэффицент");
        }
      }

      if (expression.json.length === 5 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (expression.json[4][2] !== correctExpression.json[4][2]) {
            console.log("Неверно записан четвертый коэффицент");
            minErr++;
          }
          if (minErr === 4) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 4 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (expression.json[3][2] !== correctExpression.json[3][2]) {
            console.log("Неверно записан третий коэффицент");
            minErr++;
          }
          if (minErr === 3) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (expression.json.length === 3 && expression.json[0] === 'Tuple') {
        if (ok === false) {
          let minErr = 0;
          if (expression.json[1][2] !== correctExpression.json[1][2]) {
            console.log("Неверно записан первый коэффицент");
            minErr++;
          }
          if (expression.json[2][2] !== correctExpression.json[2][2]) {
            console.log("Неверно записан второй коэффицент");
            minErr++;
          }
          if (minErr === 2) {
            console.log("Неверно записаны все коэфициенты, внимательнее прочитайте задание, изучите теорию");
          } else if (minErr === 0) { ok = true; }
        }
      }

      if (ok === false && expression.json[0] === 'Rational') {
        correctExpression = ce.parse(`\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === true) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Sqrt' && Number.isFinite(expression.json[1][2][2]) === false) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][1] !== correctExpression.json[1][1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][2][1]) === false && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a}^2 + ${b}^2 + ${c}^2}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[2] !== 0) {
        correctExpression = ce.parse(`\\frac{1}{\\sqrt{${a * a} + ${b * b} + ${c * c}}}=\\frac{1}{${normFactor}}`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1] !== correctExpression.json[1]) {
            console.log("Ошибка верх");
          } else {
            console.log("Ошибка низ");
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && Number.isFinite(expression.json[1][1][1]) === false) {
        correctExpression = ce.parse(`\\frac{${a}}{${normFactor}}*x+\\frac{${b}}{${normFactor}}*y+\\frac{${c}}{${normFactor}}*z+${d}/${normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 5) {
        correctExpression = ce.parse(`${a / normFactor}x+${b / normFactor}*y+${c / normFactor}*z+${d / normFactor}=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }

      if (ok === false && expression.json[0] === 'Equal' && expression.json[1].length === 3) {
        correctExpression = ce.parse(`(\\frac{1}{${normFactor}})*(x${a}+y${b}+z${c}+${d})=0`);
        ok = expression.isSame(correctExpression);
        if (ok === false) {
          if (expression.json[1][2][2] !== correctExpression.json[1][2][2]) {
            console.log("Ошибка слева");
            console.log("Неверно вычесленный коэфициент");
          } else {
            console.log("Ошибка справа");
            if (expression.json[2] === -1) {
              console.log("Неправильный знак");
            } else {
              console.log("Вы ошиблись при переносе или делении");
            }
          }
        }
      }
      console.info(ok ? "Correct!6" : "Incorrect!6");
    }

    mathOne();
    mathTwo();
    mathThree();
    mathFour();
    mathFive();
    mathSix();
  }
  exampleBlock.innerHTML = `
  <math-field readonly id = "example4"  style="font-size:2em">
  ${a}x+${b}y+${c}z+${d}=0;
  </math-field>
  `;
}

window.onload = function () {
  exerciseOne();
  exerciseTwo();
  exerciseThree();
  exerciseFour();

}
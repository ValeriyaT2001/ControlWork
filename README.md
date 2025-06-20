# Контрольная работа по математике

Это интерактивное веб-приложение для выполнения контрольной работы по математике, включающее задачи на преобразование уравнений прямых и плоскостей. Приложение поддерживает SCORM 1.2 для интеграции с системами дистанционного обучения (LMS).

## Особенности

- 4 типа задач:
  1. Приведение общего уравнения прямой к уравнению "в отрезках"
  2. Приведение общего уравнения плоскости к уравнению "в отрезках"
  3. Приведение общего уравнения прямой к нормальному виду
  4. Приведение общего уравнения плоскости к нормальному виду
- Интерактивный ввод математических выражений с помощью MathLive
- Пошаговое решение с возможностью добавления/удаления шагов
- Автоматическая проверка ответов и решений
- Подробная обратная связь с анализом ошибок
- SCORM-совместимость для отслеживания результатов

## Технологии

- HTML5, CSS3, JavaScript (ES6)
- [MathLive](https://cortexjs.io/mathlive/) - для ввода математических выражений
- [Compute Engine](https://cortexjs.io/compute-engine/) - для математических вычислений
- SCORM 1.2 API - для интеграции с LMS

## Установка и использование

1. Упакуйте все файлы в ZIP-архив:
   - `index.html`
   - `index.js`
   - `styles.css`
   - `imsmanifest.xml`
2. Загрузите пакет в вашу SCORM-совместимую LMS (Moodle, Blackboard и др.)
3. Приложение будет доступно как SCORM-пакет

## Структура файлов

- `index.html` - основной файл с разметкой
- `index.js` - логика приложения, проверка ответов
- `styles.css` - стили оформления
- `imsmanifest.xml` - манифест для SCORM

## Настройка

Для изменения заданий отредактируйте массив `examples` в файле `index.js`. Каждый элемент массива соответствует заданию:

```javascript
const examples = [
  '3x + 4y - 12= 0',          // Задание 1
  '2x + 3y + 6z - 18 = 0',    // Задание 2
  '4x - 3y + 12 = 0',         // Задание 3
  'x + 2y + 2z - 8= 0'        // Задание 4
];


SCORM-функциональность
Приложение поддерживает:

Отправку итоговой оценки (0-100%)

Статус завершения (completed)

Сохранение подробных результатов

Совместимость со стандартом SCORM 1.2

Лицензия
Этот проект может использоваться свободно для образовательных целей. MathLive и Compute Engine имеют собственные лицензии.

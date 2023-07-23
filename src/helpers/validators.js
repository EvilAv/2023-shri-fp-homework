/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { prop, equals, curry, allPass, map, compose, count, not, juxt, all } from 'ramda';

const isWhiteOne = equals('white');
const isRedOne = equals('red');
const isGreenOne = equals('green');
const isBlueOne = equals('blue');
const isOrangeOne = equals('orange');
const isNotWhiteOne = (figure) => !isWhiteOne(figure);

const getCircle = prop('circle');
const getSquare = prop('square');
const getStar = prop('star');
const getTriangle = prop('triangle');

const isCircleWhite = compose(isWhiteOne, getCircle);
const isTriangleWhite = compose(isWhiteOne, getTriangle);
const isStarRed = compose(isRedOne, getStar);
const isSquareGreen = compose(isGreenOne, getSquare);
const isCircleBlue = compose(isBlueOne, getCircle);
const isSquareOrange = compose(isOrangeOne, getSquare);
const isTriangleGreen = compose(isGreenOne, getTriangle);

const isStarNotRed = (obj) => !isStarRed(obj);
const isStarNotWhite = compose(isNotWhiteOne, getStar);
const isTriangleNotWhite = compose(isNotWhiteOne, getTriangle);

const firstCase = allPass([
    isCircleWhite,
    isTriangleWhite,
    isSquareGreen,
    isStarRed
]);

const fourthCase = allPass([
    isStarRed,
    isCircleBlue,
    isSquareOrange
]);

const countGreenFigures = (obj) => count(isGreenOne, Object.values(obj));
const countBlueFigures = (obj) => count(isBlueOne, Object.values(obj));
const countRedFigures = (obj) => count(isRedOne, Object.values(obj));
const countOrangeFigures = (obj) => count(isOrangeOne, Object.values(obj));

const isTwoGreenFigures = (obj) => countGreenFigures(obj) === 2;
const isOneRedFigures = (obj) => countRedFigures(obj) === 1;

const isAllOrange = (obj) => countOrangeFigures(obj) === Object.values(obj).length;
const isAllGreen = (obj) => countGreenFigures(obj) === Object.values(obj).length;

const countNotWhiteFigures = (obj) => count(isNotWhiteOne, Object.values(obj));

const isTriangleEqSquare = (obj) => getTriangle(obj) === getSquare(obj);

const sixthCase = allPass([
    isTwoGreenFigures,
    isTriangleGreen,
    isOneRedFigures,
]);

const eighthCase = allPass([
    isStarNotRed,
    isStarNotWhite,
]);

const finalCase = allPass([
    isTriangleEqSquare,
    isTriangleNotWhite,
]);

const getNotWhiteColours = juxt([
    countBlueFigures, 
    countGreenFigures, 
    countOrangeFigures, 
    countRedFigures,
]);

const countNotWhiteColours = (obj) => Math.max(...getNotWhiteColours(obj));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (obj) => firstCase(obj);
// if (triangle !== 'white' || circle !== 'white') {
//     return false;
// }
// return star === 'red' && square === 'green';

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (obj) => countGreenFigures(obj) >= 2;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (obj) => countBlueFigures(obj) === countRedFigures(obj);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (obj) => fourthCase(obj);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (obj) => countNotWhiteColours(obj) >= 3;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (obj) => sixthCase(obj);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (obj) => isAllOrange(obj);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (obj) => eighthCase(obj);

// 9. Все фигуры зеленые.
export const validateFieldN9 = (obj) => isAllGreen(obj);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (obj) => finalCase(obj);

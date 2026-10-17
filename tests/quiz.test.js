// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { shuffle, isCorrect, calculatePercentage, formatTimeLeft, getGrade, getFeedbackMessage } = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("formatTimeLeft displays the remaining seconds", () => {
  assert.equal(formatTimeLeft(15), "⏱ 15s");
  assert.equal(formatTimeLeft(5), "⏱ 5s");
  assert.equal(formatTimeLeft(1), "⏱ 1s");
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade uses inclusive A, B, and C boundaries", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(89), "B");
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(74), "C");
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns encouragement for each grade and a fallback", () => {
  assert.equal(getFeedbackMessage("A"), "Outstanding work!");
  assert.equal(getFeedbackMessage("B"), "Great job!");
  assert.equal(getFeedbackMessage("C"), "Good effort!");
  assert.equal(getFeedbackMessage("Keep practicing"), "Keep practicing!");
});

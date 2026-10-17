// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

function createQuiz(questions) {
  return { questions: [...questions], current: 0, score: 0 };
}

function answerQuestion(state, selectedIndex) {
  const correct = isCorrect(state.questions[state.current], selectedIndex);
  return {
    state: { ...state, score: state.score + (correct ? 1 : 0) },
    correct
  };
}

function advanceQuestion(state) {
  return { ...state, current: state.current + 1 };
}

function isQuizFinished(state) {
  return state.current >= state.questions.length;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Formats the remaining whole seconds for display.
 */
function formatTimeLeft(seconds) {
  return `⏱ ${seconds}s`;
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

/**
 * Returns an encouraging message for a grade.
 */
function getFeedbackMessage(grade) {
  if (grade === "A") return "Outstanding work!";
  if (grade === "B") return "Great job!";
  if (grade === "C") return "Good effort!";
  return "Keep practicing!";
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    shuffle,
    isCorrect,
    createQuiz,
    answerQuestion,
    advanceQuestion,
    isQuizFinished,
    calculatePercentage,
    formatTimeLeft,
    getGrade,
    getFeedbackMessage
  };
}

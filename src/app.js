// UI code: connects the quiz logic (quiz.js) to the page (index.html).

const BEST_SCORE_KEY = "dev-days-quiz-best-score";

function readBestScore() {
  try {
    const storedScore = window.localStorage.getItem(BEST_SCORE_KEY);
    if (storedScore === null || storedScore.trim() === "") return null;
    const score = Number(storedScore);
    return Number.isInteger(score) && score >= 0 && score <= 100 ? score : null;
  } catch {
    return null;
  }
}

function saveBestScore(score) {
  try {
    window.localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // Storage may be unavailable; the quiz can still track this session's best.
  }
}

let state = createQuiz([]);
let bestScore = readBestScore();

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress");
const timerText = document.getElementById("timer-text");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const gradeText = document.getElementById("grade-text");
const startBestScoreText = document.getElementById("start-best-score");
const resultBestScoreText = document.getElementById("result-best-score");
const newRecordMessage = document.getElementById("new-record-message");
let countdownInterval = null;

function renderBestScore() {
  const displayScore = bestScore === null ? "Not set" : `${bestScore}%`;
  startBestScoreText.textContent = `Best score: ${displayScore}`;
  resultBestScoreText.textContent = `Best score: ${displayScore}`;
}

function showScreen(screenToShow) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function startQuiz() {
  stopCountdown();
  state = createQuiz(shuffle(QUESTIONS));
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  stopCountdown();
  const question = state.questions[state.current];
  progressText.textContent = `Question ${state.current + 1} of ${state.questions.length}`;
  questionText.textContent = question.question;
  feedbackText.textContent = "";
  nextButton.hidden = true;
  timerText.classList.remove("urgent");
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, button));
    item.appendChild(button);
    optionsList.appendChild(item);
  });

  startCountdown();
}

function stopCountdown() {
  if (countdownInterval !== null) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function startCountdown() {
  const questionIndex = state.current;
  const deadline = Date.now() + 15000;

  function updateCountdown() {
    if (state.current !== questionIndex || nextButton.hidden === false) {
      stopCountdown();
      return;
    }

    const secondsLeft = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    timerText.textContent = formatTimeLeft(secondsLeft);
    timerText.classList.toggle("urgent", secondsLeft <= 5);

    if (secondsLeft === 0) {
      stopCountdown();
      timeExpired();
    }
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 200);
}

function timeExpired() {
  const question = state.questions[state.current];
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
  buttons[question.answer].classList.add("correct");
  feedbackText.textContent = "Time's up!";
  nextButton.hidden = false;
  nextButton.focus();
}

function selectAnswer(selectedIndex, selectedButton) {
  stopCountdown();
  const question = state.questions[state.current];
  const result = answerQuestion(state, selectedIndex);
  state = result.state;
  const buttons = optionsList.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));

  if (result.correct) {
    selectedButton.classList.add("correct");
    feedbackText.textContent = "Correct!";
  } else {
    selectedButton.classList.add("wrong");
    buttons[question.answer].classList.add("correct");
    feedbackText.textContent = "Not quite. The correct answer is highlighted.";
  }

  nextButton.hidden = false;
  nextButton.focus();
}

function nextQuestion() {
  state = advanceQuestion(state);
  if (!isQuizFinished(state)) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  stopCountdown();
  const total = state.questions.length;
  const percentage = calculatePercentage(state.score, total);
  const isNewRecord = isNewBestScore(percentage, bestScore);
  if (isNewRecord) {
    bestScore = percentage;
    saveBestScore(bestScore);
  }
  scoreText.textContent = `You scored ${state.score} out of ${total} (${percentage}%)`;
  gradeText.textContent = `Grade: ${getGrade(percentage)}`;
  renderBestScore();
  newRecordMessage.hidden = !isNewRecord;
  showScreen(resultScreen);
}

renderBestScore();
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

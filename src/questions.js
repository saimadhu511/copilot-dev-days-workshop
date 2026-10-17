// Quiz questions.
// "answer" is the index (starting at 0) of the correct option.
const QUESTIONS = [
  {
    question: "Which command creates a new Git branch and switches to it?",
    options: ["git branch -d", "git switch -c", "git merge", "git push -u"],
    answer: 1,
  },
  {
    question: "Which file does GitHub show as a repository's front page?",
    options: ["index.txt", "README.md", "HOME.md", "about.html"],
    answer: 1,
  },
  {
    question: "What does PR stand for on GitHub?",
    options: ["Pull request", "Push release", "Project review", "Public repository"],
    answer: 0,
  },
  {
    question: "In GitHub Copilot, which key accepts an inline suggestion?",
    options: ["Enter", "Esc", "Tab", "Shift"],
    answer: 2,
  },
  {
    question: "Which file gives Copilot custom instructions for a repository?",
    options: [".github/copilot-instructions.md", "copilot.json", ".vscode/ai.txt", "package.json"],
    answer: 0,
  },
  {
    question: "What does `git clone` do?",
    options: [
      "Deletes a repository",
      "Copies a remote repository to your computer",
      "Creates a new branch",
      "Merges two branches",
    ],
    answer: 1,
  },
  {
    question: "Where do GitHub Actions workflow files live in a repository?",
    options: [".github/actions", ".workflows", "actions/workflows", ".github/workflows"],
    answer: 3,
  },
  {
    question: "Which event can trigger a workflow when a pull request is opened?",
    options: ["push", "pull_request", "schedule", "workflow_dispatch"],
    answer: 1,
  },
  {
    question: "What does a job contain in a GitHub Actions workflow?",
    options: [
      "A list of repository collaborators",
      "The repository's branch protection rules",
      "Steps that run on the same runner",
      "A list of open pull requests",
    ],
    answer: 2,
  },
];

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS };
}

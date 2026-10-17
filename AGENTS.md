# Project Instructions

- Keep the app in plain JavaScript; do not add frameworks, build tools, or npm dependencies.
- Keep quiz rules and calculations pure in `src/quiz.js`; export them with `module.exports` and test them with Node's built-in `node:test`.
- Keep browser DOM access, events, and rendering in `src/app.js`.
- Preserve support for both Node tests and the browser's existing classic-script loading order; do not assume a bundler or ES modules.
- Put all CSS color values in custom properties declared in `:root`; use those variables everywhere else.
- Use semantic HTML and real `<button>` elements for actions. Keep keyboard focus visibly styled.
- Announce changing status and feedback messages through an appropriate `aria-live` region.
- Match the existing JavaScript style: 2-space indentation and semicolons.
- Run `npm test` after changing quiz logic, question data, or tests.
- See [README.md](README.md) for project setup, layout, and workshop guidance.
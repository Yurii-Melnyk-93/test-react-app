# Project Manager

A small project tracker built while working through a React course: create, edit and delete
projects, search and filter them, and open a details page for any of them. State lives in Redux
Toolkit and is persisted to `localStorage`, so the app has no backend and keeps your data between
reloads.

[**Live demo**](https://yurii-melnyk-93.github.io/test-reasct-app/)

[![CI](https://github.com/Yurii-Melnyk-93/test-reasct-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Yurii-Melnyk-93/test-reasct-app/actions/workflows/ci.yml)

## Features

- **Projects CRUD** — create, edit and delete projects, each with a name, description and status
  (`To do` / `In progress` / `Done`).
- **Search, filter and sort** — debounced search over name and description, a status filter, and
  sorting by newest, oldest or name.
- **Details page** — `/projects/:id` with the full project card; an unknown id renders the 404 page
  instead of an error.
- **Persistence** — every change is written to `localStorage`, debounced so a burst of edits writes
  once. Stored data is validated on load, so a stale or hand-edited payload cannot break the app.
- **Accessible UI kit** — labelled form fields with `aria-invalid`, a modal that traps focus, closes
  on `Escape` and locks body scroll, and confirmation dialogs for destructive actions.

## Tech stack

React 19 · TypeScript (strict) · Vite · Redux Toolkit · React Router · React Hook Form · SCSS
modules · Vitest + Testing Library

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL, by default http://localhost:5173.

## Scripts

| Script                  | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start the Vite dev server                           |
| `npm run build`         | Typecheck and build for production into `dist/`     |
| `npm run preview`       | Serve the production build locally                  |
| `npm test`              | Run the test suite once                             |
| `npm run test:watch`    | Run the tests in watch mode                         |
| `npm run test:coverage` | Run the tests with a coverage report and thresholds |
| `npm run lint`          | Run ESLint                                          |
| `npm run typecheck`     | Run the TypeScript compiler without emitting        |
| `npm run format`        | Format the sources with Prettier                    |
| `npm run format:check`  | Fail if anything is unformatted                     |

## Project structure

```
src/
  components/    ui kit (Button, Modal, Table, …) and project-specific components
  hooks/         typed redux hooks, useDebouncedValue, useClickOutside
  layouts/       page shell: header, footer, default layout
  pages/         ProjectsPage, ProjectPage, NotFoundPage
  router/        routes and path helpers
  store/         redux store, projects slice, selectors, localStorage persistence
  test/          vitest setup and the renderWithProviders helper
  types/         Project and sorting types
  utils/         debounce, date formatting
```

## Testing

Vitest runs in a jsdom environment with Testing Library. Tests cover the slice reducers, the
persistence layer including its untrusted-data paths, the hooks, the modal's accessibility
behaviour, and the page flows (search, filter, sort, edit, delete). `npm run test:coverage`
enforces coverage thresholds, so a regression fails the run.

## Quality checks

A husky pre-commit hook formats and lints staged files through lint-staged and then typechecks.
The same checks plus the production build run in GitHub Actions on every push and pull request,
and `main` deploys to GitHub Pages.

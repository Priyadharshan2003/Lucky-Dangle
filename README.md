# Lucky Dangle

Welcome to Lucky Dangle! This is a Tauri-based desktop application built with React and Vite in a pnpm monorepo.

## Prerequisites

- Node.js
- pnpm
- Rust (for Tauri)

## Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server (starts the Tauri app):
   ```bash
   pnpm --filter desktop dev
   ```

## Bundling & Releasing

To create a production build and bundle the application for release to users:

```bash
pnpm --filter desktop build
```

The resulting executables and bundles will be located in the `apps/desktop/src-tauri/target/release/bundle` directory. You can distribute these files to your users based on their operating system.

# Express + TypeScript Starter

A minimal Express.js API setup using TypeScript, `tsx` for fast dev execution, and ESLint for linting.

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/msaddique2010/Express_Setup
cd Express_Setup
npm install
```

That's it — `npm install` reads `package.json` and installs everything listed below automatically. You don't need to re-run the setup commands; they're documented here just so you know how the project was scaffolded.

## How This Project Was Set Up

For reference, here's what each setup command did:

### 1. Initialize the project
```bash
npm init -y
```
Creates a `package.json` with default values, skipping the interactive prompts.

### 2. Install core dependencies
```bash
npm i -D typescript@6 tsx @types/node express @types/express
```
- **typescript** — the TypeScript compiler
- **tsx** — runs `.ts` files directly (no manual compile step needed during development)
- **@types/node** — type definitions for Node.js built-ins
- **express** — the web framework
- **@types/express** — type definitions for Express

All installed as dev dependencies (`-D`) since TypeScript is compiled away before production, and `express` itself is typically also listed as a runtime dependency in real deployments — adjust as needed for your use case.

### 3. Generate a TypeScript config
```bash
npx tsc --init
```
Creates a `tsconfig.json` with sensible defaults, which you can then customize (target, module system, output directory, strictness, etc.).

### 4. Set up ESLint
```bash
npm init @eslint/config@latest
```
Runs the interactive ESLint setup wizard, letting you choose your style guide, TypeScript support, and config format.

### 5. Install jiti
```bash
npm i -D jiti
```
`jiti` is a runtime TypeScript/ESM loader. It's commonly needed so ESLint's flat config file (`eslint.config.ts`/`.mjs`) can be loaded correctly when TypeScript is involved.

## Scripts

You may want to add these to your `package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint ."
  }
}
```

## Requirements

- Node.js (LTS recommended)
- npm

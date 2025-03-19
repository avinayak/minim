# Minim - Minimalist New Tab Extension

## Description
This is the full source code of the Minim extension for Chromium and Firefox browsers.

## Build Instructions

### 1. Prerequisites
- Node.js **v18.x** (https://nodejs.org)
- yarn

### 2. Install Dependencies
```bash
yarn
```

### 3. Launch Dev server
```bash
yarn dev
```

### 4. Build extension zip and xpi
```bash
sh make_extension.sh
```
This will create a zip and minim_ff_v_<version>.xpi file.
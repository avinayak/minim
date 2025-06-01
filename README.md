# Minim - Minimalist New Tab Extension 

for Firefox and Chromium.

![Preview of Minim Extension](minim.png)

The screenshot here is on the Zen browser.

## Description
This is the full source code of the Minim extension for Chromium and Firefox browsers.

visit https://minim.tulv.in/ for a preview.

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
bash make_extension.sh
```
This will create a zip for chrome and minim_ff_v_<version>.xpi file.

### Links
* Chrome Web Store - https://chromewebstore.google.com/detail/minim-a-minimal-newtab/kpblgdhkligkbbnbpkigppblggflihgn?hl=en
* Firefox Addons - https://addons.mozilla.org/en-US/firefox/addon/minim-minimalist-new-tab/

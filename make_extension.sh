#!/bin/bash


if [ -d "chrome_extension" ]; then rm -Rf chrome_extension; fi

[ -e 'chrome_extension.zip' ] && rm 'chrome_extension.zip'

mkdir chrome_extension 
cp -r build/* chrome_extension/ 
cp chrome_manifest.json chrome_extension/manifest.json 
cp icon128.png chrome_extension/ 
mkdir chrome_extension/minim 
mv chrome_extension/static chrome_extension/minim/static
zip -r chrome_extension.zip chrome_extension
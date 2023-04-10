#!/bin/bash

# {
#   "manifest_version": 3,
#   "name": "My New Tab Extension",
#   "version": "1.0.0",
#   "action": {
#     "default_popup": "index.html",
#     "default_icon": {
#       "16": "icon-16.png",
#       "48": "icon-48.png",
#       "128": "icon-128.png"
#     }
#   },
#   "permissions": ["chrome://newtab/"],
#   "chrome_url_overrides": {
#     "newtab": "index.html"
#   },
#   "icons": {
#     "16": "icon-16.png",
#     "48": "icon-48.png",
#     "128": "icon-128.png"
#   }
# }


# 0. Run yarn build
yarn build:nots

if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

# 1. Copy the dist folder to a new temp folder
TEMP_DIR="extension"

rm -rf $TEMP_DIR/*

mkdir $TEMP_DIR

cp -r dist/* $TEMP_DIR

# 2. Add a Chrome extension manifest JSON for a new tab extension
# Increment the manifest extension version based on the BUILD_NUMBER file contents
BUILD_NUMBER_FILE="BUILD_NUMBER"
VERSION=$(cat $BUILD_NUMBER_FILE)
NEW_VERSION=$((VERSION + 1))

MANIFEST_FILE="$TEMP_DIR/manifest.json"
cat > $MANIFEST_FILE <<- EOM
{
  "manifest_version": 2,
  "name": "New Tab Extension",
  "version": "3.0.$NEW_VERSION",
  "chrome_url_overrides": {
    "newtab": "index.html"
  }
}
EOM

# 3. Zip the temp folder to a new file
rm -f *.zip

ZIP_FILE="minim_v3_0_${NEW_VERSION}.zip"
zip -r $ZIP_FILE $TEMP_DIR

# 5. Bump the build number file content
echo $NEW_VERSION > $BUILD_NUMBER_FILE

echo "Chrome extension created: $ZIP_FILE"

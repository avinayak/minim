#!/bin/bash

JSON_FILE="src/version.json"
version=$(jq -r '.version' "$JSON_FILE")
IFS='.' read -ra version_parts <<< "$version"
build_number=$((version_parts[2] + 1))
new_version="${version_parts[0]}.${version_parts[1]}.$build_number"
new_version_package_name=minim_v${version_parts[0]}_${version_parts[1]}_$build_number.zip
jq ".version = \"$new_version\"" "$JSON_FILE" > tmp.json && mv tmp.json "$JSON_FILE"

yarn build:nots
TEMP_DIR="extension"
rm -rf $TEMP_DIR/*
mkdir $TEMP_DIR
cp -r dist/* $TEMP_DIR

MANIFEST_FILE="$TEMP_DIR/manifest.json"
cat > $MANIFEST_FILE <<- EOM
{
  "manifest_version": 3,
  "name": "Minim",
  "description": "A minimal newtab for Chrome",
  "version": "$new_version",
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  "chrome_url_overrides": {
    "newtab": "index.html"
  },
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  }
}
EOM

cp src/logos/* $TEMP_DIR
rm -f *.zip
zip -r $new_version_package_name $TEMP_DIR
echo "Chrome extension created: $new_version_package_name"

echo "Creating Firefox extension..."
bash make_ff_extension.sh
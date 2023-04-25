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
JSON_FILE="src/version.json"

# Extract the version from the JSON file
version=$(jq -r '.version' "$JSON_FILE")

# Increment the build number
IFS='.' read -ra version_parts <<< "$version"
build_number=$((version_parts[2] + 1))
new_version="${version_parts[0]}.${version_parts[1]}.$build_number"
new_version_package_name=minim_v${version_parts[0]}_${version_parts[1]}_$build_number.zip

# Print the updated version
echo "Updated version: $new_version"

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
  "permissions": ["chrome://newtab/"],
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

# 3. Zip the temp folder to a new file
rm -f *.zip

zip -r $new_version_package_name $TEMP_DIR

# Update the version in the JSON file and save it
jq ".version = \"$new_version\"" "$JSON_FILE" > tmp.json && mv tmp.json "$JSON_FILE"

echo "Chrome extension created: $new_version_package_name"

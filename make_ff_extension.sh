#!/bin/bash

BUILD_DIR="dist"
EXT_BASE_NAME="minim_ff_v"
EXT_DIR="extension_build"


# Get version from src/version.json
VERSION=$(jq -r '.version' src/version.json)

if [ -z "$VERSION" ]; then
  echo "Version not found in src/version.json"
  exit 1
fi

# Replace dots with underscores for the filename
VERSION_UNDERSCORE=${VERSION//./_}

# Construct package name
PACKAGE_FILE="${EXT_BASE_NAME}${VERSION_UNDERSCORE}.xpi"

echo "Packaging version $VERSION as $PACKAGE_FILE"

# Clean old files
rm -rf "$EXT_DIR" "$PACKAGE_FILE"

# Create extension directory
mkdir "$EXT_DIR"

# Create manifest.json dynamically
cat > "$EXT_DIR/manifest.json" <<EOL
{
  "manifest_version": 2,
  "name": "Minim: Minimalist New Tab",
  "version": "$VERSION",
  "description": "A minimal newtab for Firefox",
  "chrome_url_overrides": {
    "newtab": "index.html"
  },
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "browser_specific_settings": {
    "gecko": {
      "id": "minim@a.tulv.in"
    }
  }
}
EOL

# Copy build files
cp -r "$BUILD_DIR"/* "$EXT_DIR"

# Ensure icon files exist (adjust paths as needed)
for ICON in icon16.png icon48.png icon128.png; do
  if [ ! -f "src/logos/$ICON" ]; then
    echo "Warning: src/logos/$ICON not found!"
  else
    cp "src/logos/$ICON" "$EXT_DIR"
  fi
done

rm *.xpi

# Create the XPI (ZIP) - avoid nested folders
cd "$EXT_DIR" || exit 1
zip -r "../$PACKAGE_FILE" ./*
cd ..

echo "Extension packaged as $PACKAGE_FILE"
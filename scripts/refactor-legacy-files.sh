#!/bin/bash

# Refactor script for Legacy files
# This script applies systematic refactoring to eliminate code duplication

set -e

echo "Starting refactoring of Creative Tech and Utility Legacy files..."

# Define file patterns
CREATIVE_TECH_DIR="/Users/dh/projects/projects/wodh-app/src/components/pages/creativetech"
UTILITY_DIR="/Users/dh/projects/projects/wodh-app/src/components/pages/utility"

# Files to refactor
CREATIVE_TECH_FILES=(
  "Ucreativetechv1Legacy.tsx"
  "Ucreativetechv2Legacy.tsx"
  "Ucreativetechv3Legacy.tsx"
  "CreativeTechV1_1Legacy.tsx"
  "CreativeTechV1_3Legacy.tsx"
  "CreativeTechV1_4Legacy.tsx"
)

UTILITY_FILES=(
  "UaboutUusLegacy.tsx"
  "UcareersLegacy.tsx"
  "UcontactLegacy.tsx"
  "UfootervariantsLegacy.tsx"
  "UheaderideasLegacy.tsx"
  "UheadermegamenuLegacy.tsx"
  "ThreeDArtCSSLegacy.tsx"
)

# Function to add imports if not present
add_imports() {
  local file="$1"

  # Check if imports already exist
  if ! grep -q "import { cn } from" "$file"; then
    # Find the line after first import block and insert
    sed -i '' '/^import.*from "framer-motion";$/a\
import { cn } from "@/lib/utils/cn";\
import { colors } from "@/lib/design-tokens/colors";\
import { duration, easing } from "@/lib/design-tokens/animations";
' "$file"
  fi
}

# Function to replace cx with cn
replace_cx_with_cn() {
  local file="$1"
  # Replace cx( with cn(
  sed -i '' 's/cx(/cn(/g' "$file"

  # Remove inline cx function definition
  sed -i '' '/^function cx(...classes: Array<string | false | null | undefined>)/,/^}/d' "$file"
}

# Function to replace color constants
replace_colors() {
  local file="$1"

  # Replace #9EF315 with colors.neon.base
  sed -i '' 's/#9EF315/colors.neon.base/g' "$file"
  sed -i '' 's/"rgba(158, 243, 21, 1)"/colors.neon.base/g' "$file"
  sed -i '' 's/"rgba(158,243,21,1)"/colors.neon.base/g' "$file"
  sed -i '' 's/ACCENT_GREEN/colors.neon.base/g' "$file"
  sed -i '' 's/GREEN/colors.neon.base/g' "$file"

  # Replace violet colors
  sed -i '' 's/#5B2DDC/colors.violet.base/g' "$file"
  sed -i '' 's/#7C3AED/colors.violet.base/g' "$file"

  # Replace background colors
  sed -i '' 's/#07051A/colors.background.primary/g' "$file"
  sed -i '' 's/#0C0722/colors.background.primary/g' "$file"
}

# Function to replace animation values
replace_animations() {
  local file="$1"

  # Replace common easing functions
  sed -i '' 's/ease: \[0\.2, 0\.8, 0\.2, 1\]/ease: easing.legacy/g' "$file"
  sed -i '' 's/ease: "easeOut"/ease: easing.easeOut/g' "$file"
  sed -i '' 's/ease: "easeIn"/ease: easing.easeIn/g' "$file"

  # Replace durations
  sed -i '' 's/duration: 0\.22/duration: duration.fast/g' "$file"
  sed -i '' 's/duration: 0\.25/duration: duration.fast/g' "$file"
  sed -i '' 's/duration: 0\.4/duration: duration.normal/g' "$file"
}

# Process Creative Tech files
echo "Processing Creative Tech files..."
for filename in "${CREATIVE_TECH_FILES[@]}"; do
  filepath="$CREATIVE_TECH_DIR/$filename"
  if [ -f "$filepath" ]; then
    echo "  - Refactoring $filename"
    add_imports "$filepath"
    replace_cx_with_cn "$filepath"
    replace_colors "$filepath"
    replace_animations "$filepath"
  else
    echo "  - Skipping $filename (not found)"
  fi
done

# Process Utility files
echo "Processing Utility files..."
for filename in "${UTILITY_FILES[@]}"; do
  filepath="$UTILITY_DIR/$filename"
  if [ -f "$filepath" ]; then
    echo "  - Refactoring $filename"
    add_imports "$filepath"
    replace_cx_with_cn "$filepath"
    replace_colors "$filepath"
    replace_animations "$filepath"
  else
    echo "  - Skipping $filename (not found)"
  fi
done

echo "✓ Refactoring complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run build' to verify no TypeScript errors"
echo "2. Test the pages to ensure functionality is preserved"

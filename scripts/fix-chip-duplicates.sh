#!/bin/bash

# Fix remaining Chip duplicates in service files

SERVICE_FILES=(
  "/Users/dh/projects/projects/wodh-app/src/components/pages/services/UxrservicesLegacy.tsx"
  "/Users/dh/projects/projects/wodh-app/src/components/pages/services/UservicehubfinalLegacy.tsx"
  "/Users/dh/projects/projects/wodh-app/src/components/pages/services/UserviceUhubLegacy.tsx"
)

for file in "${SERVICE_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."

    # Add imports if not present
    if ! grep -q "import { Chip } from" "$file"; then
      sed -i '' '/^import.*from "framer-motion";$/a\
import { Chip } from "@/components/ui/Chip";
' "$file"
    fi

    # Remove the Chip function definition (multi-line)
    # Match from "function Chip({" to the closing "}"
    perl -i -0pe 's/function Chip\(\{[^}]*children: React\.ReactNode;[^}]*\}\) \{[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n[^}]*\n\}//' "$file"
  fi
done

echo "Done!"

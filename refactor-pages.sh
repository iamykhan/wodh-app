#!/bin/bash

# Automated Page Refactoring Script
# Applies clean architecture pattern to all pages

set -e

APP_DIR="/Users/dh/projects/projects/wodh-app/src/app"
COMPONENTS_DIR="/Users/dh/projects/projects/wodh-app/src/components/pages"

# Pages already refactored (skip these)
SKIP_PAGES=("page.tsx" "industries")

# Function to refactor a single page
refactor_page() {
    local page_path=$1
    local page_dir=$(dirname "$page_path")
    local page_name=$(basename "$page_dir")

    # Skip if already refactored
    for skip in "${SKIP_PAGES[@]}"; do
        if [[ "$page_name" == "$skip" ]] || [[ "$page_dir" == *"/$skip"* ]]; then
            echo "⏭️  Skipping $page_name (already refactored)"
            return
        fi
    done

    # Determine category
    local category="utility"
    if [[ "$page_name" == *"service"* ]] || [[ "$page_name" == *"hub"* ]]; then
        category="services"
    elif [[ "$page_name" == *"portfolio"* ]]; then
        category="portfolio"
    elif [[ "$page_name" == *"casestudy"* ]] || [[ "$page_name" == *"3dcasestudy"* ]]; then
        category="casestudies"
    elif [[ "$page_name" == *"creativetech"* ]]; then
        category="creativetech"
    fi

    # Create component name (PascalCase)
    local component_name=$(echo "$page_name" | sed -r 's/(^|-)([a-z])/\U\2/g')
    component_name="${component_name}Legacy"

    local legacy_dir="$COMPONENTS_DIR/$category"
    local legacy_file="$legacy_dir/${component_name}.tsx"

    # Create category directory if it doesn't exist
    mkdir -p "$legacy_dir"

    # Check if page file exists and has content
    if [[ ! -f "$page_path" ]]; then
        echo "⚠️  Page not found: $page_path"
        return
    fi

    # Check if file is already refactored (contains import statement)
    if grep -q "from \"@/components/pages" "$page_path" 2>/dev/null; then
        echo "✅ Already refactored: $page_name"
        return
    fi

    # Move original content to Legacy component
    echo "📦 Moving $page_name to $category/$component_name"
    cp "$page_path" "$legacy_file"

    # Update export in legacy file
    sed -i '' 's/export default function .* {/export default function '"$component_name"'() {/g' "$legacy_file"

    # Create clean page entry point
    local import_path="@/components/pages/$category/$component_name"

    cat > "$page_path" << EOF
/**
 * $(echo $page_name | tr '-' ' ' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1') Page
 * Refactored architecture - clean entry point
 */

import $component_name from "$import_path";

export default function Page() {
  return <$component_name />;
}
EOF

    echo "✅ Refactored: $page_name"
}

# Find all page.tsx files and refactor them
echo "🚀 Starting batch page refactoring..."
echo ""

find "$APP_DIR" -name "page.tsx" -type f | while read page_path; do
    refactor_page "$page_path"
done

echo ""
echo "✅ Batch refactoring complete!"

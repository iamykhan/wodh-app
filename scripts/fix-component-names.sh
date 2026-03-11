#!/bin/bash

# Fix invalid component names (those starting with numbers)

set -e

# List of pages with problematic names
declare -A FIXES
FIXES["3dart-designservicesv1"]="ThreeDArtDesignServicesV1Legacy"
FIXES["3dart-designservicesv2"]="ThreeDArtDesignServicesV2Legacy"
FIXES["3dart-designservicesv3"]="ThreeDArtDesignServicesV3Legacy"
FIXES["3dartcasestudyv1"]="ThreeDArtCaseStudyV1Legacy"
FIXES["3dartcasestudyv2"]="ThreeDArtCaseStudyV2Legacy"
FIXES["3dartcasestudyv3"]="ThreeDArtCaseStudyV3Legacy"
FIXES["3dcasestudysinglev1"]="ThreeDCaseStudySingleV1Legacy"
FIXES["3dcasestudysinglevd"]="ThreeDCaseStudySingleVDLegacy"
FIXES["3dcasestudysingleve"]="ThreeDCaseStudySingleVELegacy"
FIXES["3dcasestudysinglevf"]="ThreeDCaseStudySingleVFLegacy"
FIXES["3dartcss"]="ThreeDArtCSSLegacy"
FIXES["xr-services-357"]="XRServices357Legacy"

APP_DIR="/Users/dh/projects/projects/wodh-app/src/app"
SERVICES_DIR="/Users/dh/projects/projects/wodh-app/src/components/pages/services"
CASESTUDIES_DIR="/Users/dh/projects/projects/wodh-app/src/components/pages/casestudies"
UTILITY_DIR="/Users/dh/projects/projects/wodh-app/src/components/pages/utility"

echo "🔧 Fixing invalid component names..."

for page_name in "${!FIXES[@]}"; do
    correct_name="${FIXES[$page_name]}"
    page_dir="$APP_DIR/$page_name"

    # Determine directory
    comp_dir="$SERVICES_DIR"
    if [[ "$page_name" == *"casestudy"* ]] || [[ "$page_name" == "3dcasestudy"* ]]; then
        comp_dir="$CASESTUDIES_DIR"
    elif [[ "$page_name" == "3dartcss" ]]; then
        comp_dir="$UTILITY_DIR"
    fi

    # Find and rename the legacy file
    old_file=$(find "$comp_dir" -name "*${page_name}*" -o -name "3dart*" -o -name "3dcase*" | grep -i "${page_name}" | head -1)

    if [[ -n "$old_file" ]]; then
        new_file="$comp_dir/$correct_name.tsx"

        if [[ -f "$old_file" ]] && [[ "$old_file" != "$new_file" ]]; then
            echo "📝 Renaming: $(basename $old_file) → $correct_name.tsx"
            mv "$old_file" "$new_file"

            # Update export in the file
            sed -i '' "s/export default function .* {/export default function $correct_name() {/g" "$new_file"
        fi

        # Update the page.tsx import
        if [[ -f "$page_dir/page.tsx" ]]; then
            echo "✏️  Updating: $page_name/page.tsx"
            category=$(basename $(dirname "$new_file"))

            cat > "$page_dir/page.tsx" << EOF
/**
 * $(echo $page_name | tr '-' ' ' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1') Page
 * Refactored architecture - clean entry point
 */

import $correct_name from "@/components/pages/$category/$correct_name";

export default function Page() {
  return <$correct_name />;
}
EOF
        fi
    fi
done

echo "✅ Component names fixed!"

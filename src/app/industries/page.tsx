/**
 * Industries Page
 * Refactored architecture - clean entry point
 *
 * Structure:
 * - Types extracted to /types/industries.ts
 * - Legacy component temporarily wrapped
 * - Ready for gradual section-by-section refactoring
 */

import IndustriesLegacy from "@/components/industries/IndustriesLegacy";

export default function IndustriesPage() {
  return <IndustriesLegacy />;
}

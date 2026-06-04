# Expand Word Bank — Design Spec

**Date**: 2026-06-04
**Status**: Approved

## Goal

Expand CET-4, CET-6, 考研, and GRE word banks from ~130 total words to ~4,000 curated high-frequency words with full metadata (phonetics, definitions, example sentences, synonyms).

## Data Source

**`kajweb/dict`** (GitHub) — curated exam-specific core vocabulary lists sourced from Youdao Dictionary and New Oriental (新东方). Each entry includes US/UK phonetics, Chinese translations, example sentences with Chinese translations, and synonyms.

## Target Size

| Category | Before | After | Source Subset |
|----------|--------|-------|---------------|
| CET-4 | ~50 | ~1,000 | 四级真题核心词 |
| CET-6 | ~30 | ~1,000 | 六级真题核心词 |
| 考研 | ~10 | ~1,200 | 考研必考词汇 |
| GRE | ~10 | ~800 | GRE 高频精选 |
| **Total** | ~130 | **~4,000** | |

IELTS and TOEFL remain unchanged for now.

## Data Format (Unchanged)

```ts
interface Word {
  id: string;           // e.g. "cet4-001"
  category: WordCategory;
  word: string;
  phonetic: string;     // US phonetic
  partOfSpeech: string;
  definition: string;   // Chinese definition
  example: string;      // English example sentence
  exampleTranslation: string; // Chinese translation of example
  synonyms?: string[];
}
```

## Implementation Steps

1. **Clone source data** — `git clone https://github.com/kajweb/dict` into a temp location
2. **Write conversion script** (`scripts/convert-words.ts`) — reads the source JSON files, maps fields to our `Word` interface, generates sequential IDs, deduplicates, and writes TypeScript output files
3. **Run script** — generate `cet4.ts`, `cet6.ts`, `kaoyan.ts`, `gre.ts`
4. **Replace word files** — overwrite the 4 files in `src/data/words/`
5. **Verify** — `npm run build` passes, manually spot-check words in the app

## Non-Goals

- No component or page changes
- No store/logic changes
- No change to IELTS/TOEFL data
- No change to the `Word` type or `WordCategory` type

## Risks

- **File size**: 1,000 word objects per file may be large. Mitigation: already lazy-loaded per category via `wordsByCategory`.
- **Data quality**: Source data may have occasional errors. Mitigation: spot-check a random sample.
- **Duplicate words across categories**: Same word may appear in CET-4 and CET-6. Mitigation: keep them separate (each category is independent — users may study CET-4 first, then CET-6).

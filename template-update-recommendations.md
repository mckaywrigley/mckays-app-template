# Template Update Recommendations

## Critical Updates Needed

### 1. Fix React Version Issues

**Current Problem:**
```json
"react": "^16.8 || ^17.0 || ^18.0 || ^19.0",
"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0"
```

**Solution:**
```json
"react": "^19.0.0",
"react-dom": "^19.0.0"
```

**Add to package.json to fix peer dependency issues:**
```json
{
  "overrides": {
    "react": "$react",
    "react-dom": "$react-dom"
  }
}
```

### 2. Update Next.js to Latest

**Update:**
```bash
npm install next@latest
```

**Current**: 15.0.3 → **Target**: 15.1+

### 3. Fix Supabase Rules Inconsistency

**Option A: Remove Supabase Rules (Recommended)**
- Remove all storage rules from `.cursorrules`
- Remove storage.mdc from rules folder
- Focus on current Postgres + Drizzle stack

**Option B: Implement Supabase Properly**
```bash
npm install @supabase/supabase-js
```

Update storage rules to use modern patterns:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## Rule Updates Needed

### 1. Update .cursorrules

Remove or update these sections:
- All Supabase Storage references
- Outdated auth helper examples
- Add guidance for React 19 peer dependency issues

### 2. Environment Setup

Add to rules:
```markdown
## Dependency Installation Issues

When installing packages with React 19, you may encounter peer dependency conflicts. Use:

```bash
npm install --legacy-peer-deps <package-name>
```

Or add overrides to package.json:
```json
{
  "overrides": {
    "react": "$react",
    "react-dom": "$react-dom"
  }
}
```

### 3. Update Tech Stack Documentation

**Remove from tech stack:**
- Supabase (unless implementing properly)

**Add version specifications:**
- Next.js 15.1+
- React 19 (stable)
- Node.js 18.18.0+ (Next.js 15 requirement)

## Additional Recommendations

### 1. ESLint Update
Current template uses ESLint 8, but ESLint 9 is supported in Next.js 15.1.

### 2. Add Modern Features
Consider adding rules for:
- `after` API (now stable in Next.js 15.1)
- `forbidden` and `unauthorized` APIs (experimental)
- Improved error handling patterns

### 3. TypeScript Strictness
Current tsconfig.json target is ES2017, consider updating to ES2022+ for better modern JavaScript support.

## Breaking Changes to Address

### Next.js 15 Async Request APIs
The template seems to handle this correctly already (auth() calls are awaited), but verify:
- All `cookies()` calls are awaited
- All `headers()` calls are awaited  
- All `params` in pages are properly typed as `Promise<T>`

### React 19 Changes
- `useFormState` is deprecated in favor of `useActionState`
- Some TypeScript type changes may be needed

## Implementation Priority

1. **High**: Fix React version ranges and add overrides
2. **High**: Remove/fix Supabase storage rules
3. **Medium**: Update to Next.js 15.1
4. **Medium**: Update rules documentation
5. **Low**: Consider additional modern features
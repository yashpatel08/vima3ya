# Vima3ya Frontend Assignment

## Task 1 — Reusable Form System with Scroll Navigation

### Tech Stack
- **React 18** with **TypeScript** (TSX)
- **Vite** (dev server + bundler)
- **Formik** (form state + validation)
- **Tailwind CSS v3** (all styling — zero external CSS files beyond Tailwind base)

### Running the project

```bash
cd task-1
npm install
npm run dev
```

Then open http://localhost:5173

---

### Architecture

#### `FormField.tsx` — Reusable component
Accepts:
| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Visible field label |
| `name` | `string` | Formik field key |
| `type` | `text \| email \| tel \| date \| textarea \| select` | Input type |
| `placeholder` | `string?` | Placeholder text |
| `validator` | `"email" \| "phone" \| "required"` | Preset validator |
| `errorMessage` | `string?` | Custom error override |
| `options` | `string[]?` | For select fields |

**Validation behavior:**
- Errors **do not show** while typing or on focus
- Errors **do not show** on blur alone
- Errors **only appear after the first Submit click** (`submitCount > 0`)
- After submit attempt, errors **update live** as the user corrects them
- Default error: `"This field is required"` if no `validator` or `errorMessage` is passed

#### `Sidebar.tsx` — Scroll-synced nav
- 4 bullet points: A, B, C, D
- **Cumulative highlight**: once a section scrolls into view, its bullet stays highlighted
- Clicking a bullet smooth-scrolls to that section
- Progress bar tracks scroll position

#### `ShimmerLoader.tsx` — API simulation overlay
- Full-screen backdrop with skeleton card
- Triggered by `onFormComplete()`
- Stays visible for **3 seconds**, then auto-hides

#### `onFormComplete()` logic
- Fires automatically when **all 12 fields are filled and valid**
- Re-fires on every subsequent change **as long as form stays valid** (after first submit)
- Triggers shimmer loader for 3s to simulate an API call
# 📚 AssignTrack — Student Assignment Tracker

> React 19 · Tailwind CSS v4 · Framer Motion 12

A polished, dark-themed student assignment tracker with smooth animations, filters, search, and localStorage persistence.

---

## ✨ Features

| Feature | Detail |
|---|---|
| Add / Edit / Delete | Full CRUD for assignments |
| Mark Complete / Undo | Toggle completion state |
| Overdue highlighting | Red accent + badge for past-due |
| "Due Today!" state | Amber highlight for same-day deadlines |
| Relative labels | "3 days left", "2 days overdue" |
| Filter tabs | All / Pending / Completed with live counts |
| Search | Searches subject + title in real-time |
| Sort | Due date ↑↓ or Subject A–Z |
| Stats bar | Total / Pending / Completed / Overdue counters |
| localStorage | Data persists across page refreshes |
| Validation | Inline error messages per field |
| Framer Motion | Spring animations, staggered list, modal scale |
| Toast notifications | Slide-in feedback for every action |
| Responsive | Mobile-first, works on all screen sizes |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output goes to ./dist/
```

### Preview Production Build

```bash
npm run preview
```

---

## 🗂️ Project Structure

```
assigntrack/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite + Tailwind v4 plugin config
├── package.json
├── README.md
└── src/
    ├── main.jsx                # React root render
    ├── App.jsx                 # Root component — all state & layout
    ├── index.css               # Global styles + Tailwind v4 import
    ├── utils.js                # Pure helpers: uid, dates, localStorage
    ├── icons.jsx               # Inline SVG icon components
    └── components/
        ├── StatsBar.jsx        # 4-up animated stat counters
        ├── AssignmentCard.jsx  # Individual assignment card
        ├── AssignmentForm.jsx  # Add / Edit modal form
        ├── EmptyState.jsx      # Context-aware empty state
        └── Toast.jsx           # Slide-in toast notifications
```

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---|---|---|
| react | 19.x | UI framework |
| react-dom | 19.x | DOM renderer |
| tailwindcss | 4.x | Utility-first CSS |
| @tailwindcss/vite | 4.x | Tailwind v4 Vite plugin |
| framer-motion | 12.x | Animations & transitions |
| vite | 8.x | Build tool & dev server |

---

## 🗺️ Jira Project Setup

### Epics
| Epic | Name |
|---|---|
| EP-1 | Assignment CRUD |
| EP-2 | UI & Styling |
| EP-3 | Filters, Search & Sort |
| EP-4 | localStorage Persistence |
| EP-5 | Animations & Polish |

### Sample Sprint (2 weeks)
| Days | Tasks |
|---|---|
| 1–2 | Project scaffold, Vite + Tailwind setup |
| 3–4 | Add/Delete assignments, localStorage |
| 5–6 | Card UI, overdue logic, status badges |
| 7–8 | Filter tabs, search, sort |
| 9 | Edit modal, form validation |
| 10 | Framer Motion animations, toasts, stats bar |

### Sample Bugs to Track
| ID | Summary | Priority |
|---|---|---|
| BUG-01 | Completed cards still show overdue badge | Medium |
| BUG-02 | Date input not clearing on form reset | Low |
| BUG-03 | Search doesn't reset when tab switches | Low |

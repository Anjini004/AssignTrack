// icons.jsx — Lightweight inline SVG icon system

const Icon = ({ d, size = 16, className = '', strokeWidth = 2 }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
)

export const PlusIcon      = (p) => <Icon {...p} d="M12 5v14M5 12h14" />
export const TrashIcon     = (p) => <Icon {...p} d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
export const EditIcon      = (p) => <Icon {...p} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
export const CheckIcon     = (p) => <Icon {...p} d="M20 6L9 17l-5-5" />
export const UndoIcon      = (p) => <Icon {...p} d="M3 12a9 9 0 109-9M3 3v6h6" />
export const SearchIcon    = (p) => <Icon {...p} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
export const SortIcon      = (p) => <Icon {...p} d="M3 6h18M7 12h10M11 18h2" />
export const BookIcon      = (p) => <Icon {...p} d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 7H20v13H6.5A2.5 2.5 0 014 17.5v-13z" />
export const ClockIcon     = (p) => <Icon {...p} d="M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2" />
export const CloseIcon     = (p) => <Icon {...p} d="M18 6L6 18M6 6l12 12" />
export const WarningIcon   = (p) => <Icon {...p} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
export const CalendarIcon  = (p) => <Icon {...p} d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
export const GraduationIcon= (p) => <Icon {...p} d="M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />

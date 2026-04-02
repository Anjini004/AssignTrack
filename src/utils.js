// utils.js — Pure utility functions

/** Generate a unique ID */
export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 5)

/** Returns true if the date string is strictly before today */
export const isOverdue = (dateStr) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dateStr + 'T00:00:00') < today
}

/** Format "YYYY-MM-DD" → "15 Jun 2025" */
export const fmtDate = (dateStr) =>
  new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

/** Human-relative label: "3 days left", "2 days overdue", "Due today!" */
export const daysRelative = (dateStr) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due  = new Date(dateStr + 'T00:00:00')
  const diff = Math.round((due - today) / 86_400_000)
  if (diff === 0)  return 'Due today!'
  if (diff === 1)  return 'Due tomorrow'
  if (diff === -1) return '1 day overdue'
  if (diff < 0)   return `${Math.abs(diff)} days overdue`
  return `${diff} days left`
}

/** localStorage helpers */
const LS_KEY = 'assigntrack_v3'
export const loadData = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] }
  catch { return [] }
}
export const saveData = (data) =>
  localStorage.setItem(LS_KEY, JSON.stringify(data))

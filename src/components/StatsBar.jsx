// StatsBar.jsx
import { motion } from 'framer-motion'
import { isOverdue } from '../utils'

export default function StatsBar({ assignments }) {
  const total     = assignments.length
  const completed = assignments.filter(a => a.completed).length
  const pending   = total - completed
  const overdue   = assignments.filter(a => !a.completed && isOverdue(a.dueDate)).length

  const stats = [
    {
      label: 'TOTAL',
      value: total,
      color: '#94a3b8',
      bg: 'rgba(30,41,59,0.6)',
      border: 'rgba(71,85,105,0.4)',
      glow: 'transparent',
    },
    {
      label: 'PENDING',
      value: pending,
      color: '#fbbf24',
      bg: 'rgba(245,158,11,0.06)',
      border: 'rgba(245,158,11,0.25)',
      glow: 'rgba(245,158,11,0.06)',
    },
    {
      label: 'COMPLETED',
      value: completed,
      color: '#34d399',
      bg: 'rgba(16,185,129,0.06)',
      border: 'rgba(16,185,129,0.25)',
      glow: 'rgba(16,185,129,0.06)',
    },
    {
      label: 'OVERDUE',
      value: overdue,
      color: overdue > 0 ? '#f87171' : '#374151',
      bg: overdue > 0 ? 'rgba(239,68,68,0.06)' : 'rgba(30,41,59,0.4)',
      border: overdue > 0 ? 'rgba(239,68,68,0.25)' : 'rgba(55,65,81,0.3)',
      glow: overdue > 0 ? 'rgba(239,68,68,0.05)' : 'transparent',
    },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
    }}>
      {stats.map(({ label, value, color, bg, border }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: [0.21, 1.02, 0.73, 1] }}
          style={{
            background: bg,
            border: `1.5px solid ${border}`,
            borderRadius: '16px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            fontSize: '36px',
            fontWeight: 800,
            fontFamily: 'JetBrains Mono, monospace',
            color: color,
            lineHeight: 1,
            letterSpacing: '-1px',
          }}>
            {String(value).padStart(2, '0')}
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: '#475569',
          }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

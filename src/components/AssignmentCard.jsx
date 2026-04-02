// AssignmentCard.jsx
import { motion } from 'framer-motion'
import { isOverdue, fmtDate, daysRelative } from '../utils'
import { TrashIcon, EditIcon, CheckIcon, UndoIcon, BookIcon, ClockIcon } from '../icons'

export default function AssignmentCard({ assignment, onToggle, onDelete, onEdit, index }) {
  const { id, subject, title, dueDate, completed } = assignment
  const overdue  = !completed && isOverdue(dueDate)
  const relLabel = daysRelative(dueDate)
  const dueToday = relLabel === 'Due today!'

  const statusCfg = completed
    ? { barColor: '#10b981', badgeBg: 'rgba(16,185,129,0.1)', badgeColor: '#34d399', badgeBorder: 'rgba(16,185,129,0.25)', dot: '#34d399', label: '✓ Completed' }
    : overdue
    ? { barColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.1)',  badgeColor: '#f87171', badgeBorder: 'rgba(239,68,68,0.25)',  dot: '#f87171', label: '⚠ Overdue' }
    : dueToday
    ? { barColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.1)', badgeColor: '#fbbf24', badgeBorder: 'rgba(245,158,11,0.25)', dot: '#fbbf24', label: '⏰ Due Today' }
    : { barColor: '#475569', badgeBg: 'rgba(71,85,105,0.15)', badgeColor: '#94a3b8', badgeBorder: 'rgba(71,85,105,0.3)',  dot: '#64748b', label: '◷ Pending' }

  const cardBorder = overdue ? 'rgba(239,68,68,0.25)' : dueToday ? 'rgba(245,158,11,0.2)' : 'rgba(51,65,85,0.6)'
  const cardBg     = 'rgba(15,23,42,0.75)'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: completed ? 0.65 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.21, 1.02, 0.73, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        background: cardBg,
        border: `1.5px solid ${cardBorder}`,
        borderRadius: '16px',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        boxShadow: overdue ? '0 4px 20px rgba(239,68,68,0.08)' : '0 2px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        width: '4px',
        flexShrink: 0,
        background: statusCfg.barColor,
        borderRadius: '0',
      }} />

      {/* Card content */}
      <div style={{
        flex: 1,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        minWidth: 0,
      }}>
        {/* Main info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Subject */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '6px',
          }}>
            <BookIcon size={12} style={{ color: '#475569', flexShrink: 0 }} />
            <span style={{
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '1px', textTransform: 'uppercase',
              color: '#64748b',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {subject}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '16px', fontWeight: 700,
            color: completed ? '#475569' : '#f1f5f9',
            textDecoration: completed ? 'line-through' : 'none',
            marginBottom: '10px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {title}
          </h3>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Status badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '12px', fontWeight: 600,
              background: statusCfg.badgeBg,
              color: statusCfg.badgeColor,
              border: `1px solid ${statusCfg.badgeBorder}`,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusCfg.dot, flexShrink: 0 }} />
              {statusCfg.label}
            </span>

            {/* Due date */}
            <span style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '13px', color: '#64748b',
              whiteSpace: 'nowrap',
            }}>
              <ClockIcon size={12} />
              {fmtDate(dueDate)}
            </span>

            {/* Relative */}
            {!completed && (
              <span style={{
                fontSize: '13px', fontWeight: 500,
                color: overdue ? '#f87171' : dueToday ? '#fbbf24' : '#475569',
              }}>
                · {relLabel}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '8px',
          flexShrink: 0, alignItems: 'flex-end',
        }}>
          {/* Toggle complete */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onToggle(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              border: completed
                ? '1.5px solid rgba(71,85,105,0.4)'
                : '1.5px solid rgba(16,185,129,0.35)',
              background: completed
                ? 'rgba(30,41,59,0.4)'
                : 'rgba(16,185,129,0.08)',
              color: completed ? '#64748b' : '#34d399',
              fontSize: '13px', fontWeight: 600,
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {completed ? <UndoIcon size={13} /> : <CheckIcon size={13} />}
            {completed ? 'Undo' : 'Mark Done'}
          </motion.button>

          {/* Edit + Delete row */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {!completed && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(id)}
                title="Edit"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '34px', height: '34px',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(71,85,105,0.4)',
                  background: 'rgba(30,41,59,0.5)',
                  color: '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#93c5fd'; e.currentTarget.style.borderColor = 'rgba(147,197,253,0.4)'; e.currentTarget.style.background = 'rgba(59,130,246,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(71,85,105,0.4)'; e.currentTarget.style.background = 'rgba(30,41,59,0.5)' }}
              >
                <EditIcon size={14} />
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(id)}
              title="Delete"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px',
                borderRadius: '8px',
                border: '1.5px solid rgba(71,85,105,0.4)',
                background: 'rgba(30,41,59,0.5)',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.4)'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(71,85,105,0.4)'; e.currentTarget.style.background = 'rgba(30,41,59,0.5)' }}
            >
              <TrashIcon size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// EmptyState.jsx
import { motion } from 'framer-motion'
import { PlusIcon } from '../icons'

const MESSAGES = {
  all:       { emoji: '📚', heading: 'No assignments yet',    sub: 'Start by adding your first assignment.',        showCta: true },
  pending:   { emoji: '🎉', heading: "You're all caught up!", sub: 'No pending assignments. Enjoy the break!',       showCta: false },
  completed: { emoji: '🎯', heading: 'Nothing completed yet', sub: 'Mark assignments as done when you finish them.', showCta: false },
  search:    { emoji: '🔍', heading: 'No results found',      sub: 'Try a different search term.',                   showCta: false },
}

export default function EmptyState({ type = 'all', onAdd }) {
  const m = MESSAGES[type] || MESSAGES.all
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 20px',
        textAlign: 'center',
        background: 'rgba(15,23,42,0.4)',
        border: '1.5px dashed rgba(51,65,85,0.5)',
        borderRadius: '20px',
        minHeight: '300px',
      }}
    >
      <motion.div
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.21, 1.02, 0.73, 1] }}
        style={{ fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}
      >
        {m.emoji}
      </motion.div>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#94a3b8', marginBottom: '8px' }}>
        {m.heading}
      </h3>
      <p style={{ fontSize: '14px', color: '#475569', marginBottom: '28px', maxWidth: '280px', lineHeight: 1.6 }}>
        {m.sub}
      </p>
      {m.showCta && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px',
            borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: '#0c1018',
            fontSize: '14px', fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(245,158,11,0.3)',
          }}
        >
          <PlusIcon size={14} />
          Add your first assignment
        </motion.button>
      )}
    </motion.div>
  )
}

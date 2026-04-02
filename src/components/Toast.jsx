// Toast.jsx
import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ toasts }) {
  return (
    <div style={{
      position: 'fixed', bottom: '28px', right: '28px',
      zIndex: 200,
      display: 'flex', flexDirection: 'column', gap: '8px',
      pointerEvents: 'none',
    }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 40, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ duration: 0.28, ease: [0.21, 1.02, 0.73, 1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 18px',
              borderRadius: '12px',
              border: '1px solid rgba(71,85,105,0.5)',
              background: 'rgba(10,15,28,0.97)',
              backdropFilter: 'blur(16px)',
              color: '#e2e8f0',
              fontSize: '14px', fontWeight: 500,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '16px' }}>{t.icon}</span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

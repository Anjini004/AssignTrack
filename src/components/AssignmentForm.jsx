// AssignmentForm.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, CheckIcon, CloseIcon, WarningIcon } from '../icons'

function Field({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: '11px', fontWeight: 700,
        letterSpacing: '1px', textTransform: 'uppercase',
        color: '#64748b',
      }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '12px', color: '#f87171',
            }}
          >
            <WarningIcon size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const baseInput = {
  width: '100%',
  background: 'rgba(15,23,42,0.8)',
  border: '1.5px solid rgba(51,65,85,0.7)',
  borderRadius: '10px',
  padding: '12px 14px',
  fontSize: '14px',
  color: '#e2e8f0',
  fontFamily: 'Outfit, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function AssignmentForm({ editData, onSubmit, onCancel }) {
  const isEdit = !!editData
  const [subject,  setSubject]  = useState(editData?.subject  ?? '')
  const [title,    setTitle]    = useState(editData?.title    ?? '')
  const [dueDate,  setDueDate]  = useState(editData?.dueDate  ?? '')
  const [errors,   setErrors]   = useState({})
  const subjectRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => subjectRef.current?.focus(), 150)
    return () => clearTimeout(t)
  }, [])

  const validate = () => {
    const e = {}
    if (!subject.trim()) e.subject = 'Subject name is required'
    if (!title.trim())   e.title   = 'Assignment title is required'
    if (!dueDate)        e.dueDate = 'Please select a due date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ subject: subject.trim(), title: title.trim(), dueDate })
  }

  const inputStyle = (hasErr) => ({
    ...baseInput,
    borderColor: hasErr ? 'rgba(248,113,113,0.5)' : 'rgba(51,65,85,0.7)',
    background: hasErr ? 'rgba(239,68,68,0.05)' : 'rgba(15,23,42,0.8)',
  })

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(245,158,11,0.5)'
    e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.08)'
  }
  const handleBlur = (e, hasErr) => {
    e.target.style.borderColor = hasErr ? 'rgba(248,113,113,0.5)' : 'rgba(51,65,85,0.7)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(4,8,18,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        key="panel"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.28, ease: [0.21, 1.02, 0.73, 1] }}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(10,15,28,0.98)',
          border: '1.5px solid rgba(51,65,85,0.7)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        {/* Top gradient line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.7) 40%, rgba(249,115,22,0.7) 60%, transparent 100%)',
        }} />

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '24px 28px 20px',
          borderBottom: '1px solid rgba(51,65,85,0.4)',
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1 }}>
              {isEdit ? '✏️  Edit Assignment' : '📝  New Assignment'}
            </h2>
            <p style={{ fontSize: '13px', color: '#475569', marginTop: '5px' }}>
              {isEdit ? 'Update the details below' : 'Track your upcoming work'}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onCancel}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px',
              borderRadius: '8px', border: '1px solid rgba(51,65,85,0.5)',
              background: 'rgba(30,41,59,0.5)', color: '#64748b', cursor: 'pointer',
            }}
          >
            <CloseIcon size={15} />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Field label="Subject Name" error={errors.subject}>
            <input
              ref={subjectRef}
              value={subject}
              onChange={e => { setSubject(e.target.value); setErrors(p => ({ ...p, subject: '' })) }}
              placeholder="e.g. Data Structures"
              style={inputStyle(errors.subject)}
              onFocus={handleFocus}
              onBlur={e => handleBlur(e, errors.subject)}
              maxLength={50} autoComplete="off"
            />
          </Field>

          <Field label="Assignment Title" error={errors.title}>
            <input
              value={title}
              onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: '' })) }}
              placeholder="e.g. Binary Search Tree Lab"
              style={inputStyle(errors.title)}
              onFocus={handleFocus}
              onBlur={e => handleBlur(e, errors.title)}
              maxLength={80} autoComplete="off"
            />
          </Field>

          <Field label="Due Date" error={errors.dueDate}>
            <input
              type="date"
              value={dueDate}
              onChange={e => { setDueDate(e.target.value); setErrors(p => ({ ...p, dueDate: '' })) }}
              style={{ ...inputStyle(errors.dueDate), colorScheme: 'dark' }}
              onFocus={handleFocus}
              onBlur={e => handleBlur(e, errors.dueDate)}
            />
          </Field>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px 20px',
                borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                color: '#0c1018',
                fontSize: '14px', fontWeight: 700,
                fontFamily: 'Outfit, sans-serif',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(245,158,11,0.3)',
              }}
            >
              {isEdit ? <><CheckIcon size={14} /> Update Assignment</> : <><PlusIcon size={14} /> Add Assignment</>}
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={onCancel}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1.5px solid rgba(51,65,85,0.6)',
                background: 'rgba(30,41,59,0.5)',
                color: '#94a3b8',
                fontSize: '14px', fontWeight: 600,
                fontFamily: 'Outfit, sans-serif',
                cursor: 'pointer',
              }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

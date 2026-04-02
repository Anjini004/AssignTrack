// App.jsx — AssignTrack · React 19 · Tailwind v4 · Framer Motion 12

import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StatsBar       from './components/StatsBar'
import AssignmentCard from './components/AssignmentCard'
import AssignmentForm from './components/AssignmentForm'
import EmptyState     from './components/EmptyState'
import Toast          from './components/Toast'
import { uid, loadData, saveData } from './utils'
import { PlusIcon, SearchIcon, SortIcon, CloseIcon } from './icons'

const FILTER_KEYS = ['all', 'pending', 'completed']

export default function App() {
  const [assignments, setAssignments] = useState(() => loadData())
  const [showForm,    setShowForm]    = useState(false)
  const [editId,      setEditId]      = useState(null)
  const [filter,      setFilter]      = useState('all')
  const [search,      setSearch]      = useState('')
  const [sortBy,      setSortBy]      = useState('dateAsc')
  const [toasts,      setToasts]      = useState([])

  useEffect(() => { saveData(assignments) }, [assignments])

  const showToast = (message, icon = '✅') => {
    const id = uid()
    setToasts(prev => [...prev, { id, message, icon }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200)
  }

  const addAssignment = ({ subject, title, dueDate }) => {
    setAssignments(prev => [...prev, {
      id: uid(), subject, title, dueDate,
      completed: false, createdAt: new Date().toISOString()
    }])
    closeForm()
    showToast('Assignment added!', '📝')
  }

  const updateAssignment = ({ subject, title, dueDate }) => {
    setAssignments(prev =>
      prev.map(a => a.id === editId ? { ...a, subject, title, dueDate } : a)
    )
    closeForm()
    showToast('Assignment updated!', '✏️')
  }

  const deleteAssignment = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id))
    showToast('Deleted.', '🗑️')
  }

  const toggleComplete = (id) => {
    let next
    setAssignments(prev => prev.map(a => {
      if (a.id !== id) return a
      next = !a.completed
      return { ...a, completed: next }
    }))
    setTimeout(() => showToast(next ? 'Marked complete! 🎉' : 'Marked pending.', next ? '🎉' : '↩️'), 0)
  }

  const startEdit = (id) => { setEditId(id); setShowForm(true) }
  const closeForm = () => { setShowForm(false); setEditId(null) }
  const openAdd   = () => { setEditId(null); setShowForm(true) }

  const visible = useMemo(() => {
    const q = search.toLowerCase().trim()
    let list = assignments.filter(a => {
      const matchSearch = !q || a.subject.toLowerCase().includes(q) || a.title.toLowerCase().includes(q)
      const matchFilter =
        filter === 'all' ||
        (filter === 'completed' &&  a.completed) ||
        (filter === 'pending'   && !a.completed)
      return matchSearch && matchFilter
    })
    list.sort((a, b) => {
      if (sortBy === 'dateAsc')  return new Date(a.dueDate) - new Date(b.dueDate)
      if (sortBy === 'dateDesc') return new Date(b.dueDate) - new Date(a.dueDate)
      if (sortBy === 'subject')  return a.subject.localeCompare(b.subject)
      return 0
    })
    return list
  }, [assignments, filter, search, sortBy])

  const counts = {
    all:       assignments.length,
    pending:   assignments.filter(a => !a.completed).length,
    completed: assignments.filter(a =>  a.completed).length,
  }

  const emptyType = search && assignments.length > 0 ? 'search' : filter !== 'all' ? filter : 'all'
  const editData  = editId ? assignments.find(a => a.id === editId) : null

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#080c17' }}>

      {/* ── Fixed background decorations ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Amber glow – top left */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
        }} />
        {/* Indigo glow – bottom right */}
        <div style={{
          position: 'absolute', bottom: '-15%', right: '-5%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
        }} />
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        width: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backgroundColor: 'rgba(8,12,23,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 32px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{
              width: '40px', height: '40px',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
              flexShrink: 0,
            }}>📚</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1 }}>
                AssignTrack
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1 }}>
                Student Assignment Tracker
              </div>
            </div>
          </div>

          {/* Nav right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              {assignments.length} assignment{assignments.length !== 1 ? 's' : ''}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openAdd}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                color: '#0c1018',
                boxShadow: '0 4px 16px rgba(245,158,11,0.35)',
                whiteSpace: 'nowrap',
              }}
            >
              <PlusIcon size={15} />
              New Assignment
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── PAGE BODY ── */}
      <main style={{
        position: 'relative',
        zIndex: 1,
        flex: 1,
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 32px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}>

        {/* Stats */}
        <StatsBar assignments={assignments} />

        {/* ── Search + Sort row ── */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
            <span style={{
              position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
              color: '#475569', pointerEvents: 'none', display: 'flex',
            }}>
              <SearchIcon size={15} />
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by subject or title…"
              style={{
                width: '100%',
                background: 'rgba(30,41,59,0.6)',
                border: '1.5px solid rgba(71,85,105,0.5)',
                borderRadius: '12px',
                padding: '12px 40px 12px 42px',
                fontSize: '14px',
                color: '#e2e8f0',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(245,158,11,0.5)'
                e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(71,85,105,0.5)'
                e.target.style.boxShadow = 'none'
              }}
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
                    display: 'flex', padding: '4px',
                  }}
                >
                  <CloseIcon size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Sort */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <span style={{
              position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
              color: '#475569', pointerEvents: 'none', display: 'flex',
            }}>
              <SortIcon size={14} />
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: 'rgba(30,41,59,0.6)',
                border: '1.5px solid rgba(71,85,105,0.5)',
                borderRadius: '12px',
                padding: '12px 36px 12px 36px',
                fontSize: '14px',
                color: '#cbd5e1',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                colorScheme: 'dark',
              }}
            >
              <option value="dateAsc">Due: Earliest first</option>
              <option value="dateDesc">Due: Latest first</option>
              <option value="subject">Subject: A – Z</option>
            </select>
            <span style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              color: '#64748b', pointerEvents: 'none', fontSize: '11px',
            }}>▾</span>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div style={{
          display: 'flex',
          gap: '4px',
          background: 'rgba(15,21,38,0.8)',
          border: '1.5px solid rgba(51,65,85,0.5)',
          borderRadius: '16px',
          padding: '5px',
        }}>
          {FILTER_KEYS.map(key => (
            <motion.button
              key={key}
              onClick={() => setFilter(key)}
              layout
              style={{
                position: 'relative',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                background: 'transparent',
                color: filter === key ? '#f1f5f9' : '#64748b',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
            >
              {filter === key && (
                <motion.div
                  layoutId="activeTabBg"
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '12px',
                    background: 'rgba(51,65,85,0.8)',
                    border: '1px solid rgba(100,116,139,0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1, textTransform: 'capitalize' }}>{key}</span>
              <span style={{
                position: 'relative', zIndex: 1,
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '1px 7px',
                borderRadius: '8px',
                background: filter === key ? 'rgba(71,85,105,0.8)' : 'rgba(30,41,59,0.6)',
                color: filter === key ? '#94a3b8' : '#475569',
              }}>
                {counts[key]}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── Assignment list ── */}
        <div style={{ flex: 1 }}>
          {visible.length === 0 ? (
            <EmptyState type={emptyType} onAdd={openAdd} />
          ) : (
            <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AnimatePresence mode="popLayout">
                {visible.map((a, i) => (
                  <AssignmentCard
                    key={a.id} assignment={a} index={i}
                    onToggle={toggleComplete} onDelete={deleteAssignment} onEdit={startEdit}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <AnimatePresence>
            {search && assignments.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', fontSize: '13px', color: '#475569', marginTop: '24px' }}
              >
                {visible.length === 0
                  ? `No results for "${search}"`
                  : `Showing ${visible.length} of ${assignments.length} assignments`
                }
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        position: 'relative', zIndex: 1,
        width: '100%',
        textAlign: 'center',
        padding: '20px 32px',
        fontSize: '12px',
        color: '#334155',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        AssignTrack · React 19 + Tailwind v4 + Framer Motion 12 ❤️
      </footer>

      {/* ── Modal ── */}
      <AnimatePresence>
        {showForm && (
          <AssignmentForm
            key="form"
            editData={editData}
            onSubmit={editId ? updateAssignment : addAssignment}
            onCancel={closeForm}
          />
        )}
      </AnimatePresence>

      <Toast toasts={toasts} />
    </div>
  )
}

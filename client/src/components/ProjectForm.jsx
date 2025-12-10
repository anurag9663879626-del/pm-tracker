import React, { useState, useEffect } from 'react'

export default function ProjectForm ({ onSubmit, initial = {}, onCancel }) {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [status, setStatus] = useState(initial.status || 'Pending')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setTitle(initial.title || '')
    setDescription(initial.description || '')
    setStatus(initial.status || 'Pending')
  }, [initial])

  const handleSubmit = e => {
    e.preventDefault()
    setError(null)
    if (!title || !title.trim()) return setError('Title is required')
    setSubmitting(true)
    Promise.resolve(onSubmit({ title, description, status })).finally(() => setSubmitting(false))
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <span className="spinner" /> : 'Save'}</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn" style={{ marginLeft: 8 }}>Cancel</button>}
      </div>
    </form>
  )
}

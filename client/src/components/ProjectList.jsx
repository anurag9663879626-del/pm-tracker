import React from 'react'

export default function ProjectList ({ projects = [], onEdit, onDelete }) {
  if (!projects.length) return <div>No projects yet.</div>
  return (
    <div>
      {projects.map(p => (
        <div key={p.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
          <h3>{p.title} <small style={{ color: '#666' }}>({p.status})</small></h3>
          <p>{p.description}</p>
          <div>
            <button onClick={() => onEdit(p)}>Edit</button>
            <button onClick={() => onDelete(p.id)} style={{ marginLeft: 8 }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

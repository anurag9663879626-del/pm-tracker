import React, { useState, useEffect, useContext } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '../services/projectsService'
import ProjectForm from '../components/ProjectForm'
import ProjectList from '../components/ProjectList'
import { AuthContext } from '../AuthContext'

export default function Dashboard () {
  const { user } = useContext(AuthContext)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  async function load () {
    setLoading(true)
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  const handleCreate = async (payload) => {
    try {
      const project = await createProject(payload)
      setProjects(prev => [project, ...prev])
      setShowForm(false)
    } catch (err) { console.error(err) }
  }

  const handleUpdate = async (payload) => {
    try {
      const updated = await updateProject(editing.id, payload)
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p))
      setEditing(null)
    } catch (err) { console.error(err) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await deleteProject(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err) { console.error(err) }
  }

  if (!user) return <div>Please login to view your projects.</div>

  return (
    <div>
      <h2>Your Projects</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => { setShowForm(true); setEditing(null) }} className="btn btn-primary">New Project</button>
      </div>

      {showForm && <ProjectForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}

      {editing && (
        <ProjectForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
      )}

      {loading ? <div><span className="spinner" /> Loading...</div> : <ProjectList projects={projects} onEdit={p => setEditing(p)} onDelete={handleDelete} />}
    </div>
  )
}

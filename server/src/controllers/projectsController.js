const Project = require('../models/projectModel')

const VALID_STATUSES = ['Pending', 'In Progress', 'Completed']

module.exports = {
  async list (req, res) {
    try {
      const userId = req.user.id
      const projects = await Project.getProjectsByUser(userId)
      res.json({ projects })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  },

  async get (req, res) {
    try {
      const id = Number(req.params.id)
      const project = await Project.getProjectById(id)
      if (!project || project.user_id !== req.user.id) return res.status(404).json({ message: 'Project not found' })
      res.json({ project })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  },

  async create (req, res) {
    try {
      const userId = req.user.id
      const { title, description, status } = req.body
      if (!title) return res.status(400).json({ message: 'Title is required' })
      if (status && !VALID_STATUSES.includes(status)) return res.status(400).json({ message: 'Invalid status' })

      const project = await Project.createProject({ title, description, status, user_id: userId })
      res.status(201).json({ project })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  },

  async update (req, res) {
    try {
      const id = Number(req.params.id)
      const existing = await Project.getProjectById(id)
      if (!existing || existing.user_id !== req.user.id) return res.status(404).json({ message: 'Project not found' })

      const { title, description, status } = req.body
      if (status && !VALID_STATUSES.includes(status)) return res.status(400).json({ message: 'Invalid status' })

      const updated = await Project.updateProject(id, { title, description, status })
      res.json({ project: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  },

  async remove (req, res) {
    try {
      const id = Number(req.params.id)
      const existing = await Project.getProjectById(id)
      if (!existing || existing.user_id !== req.user.id) return res.status(404).json({ message: 'Project not found' })

      await Project.deleteProject(id)
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

const db = require('../config/db')

module.exports = {
  async createProject ({ title, description, user_id, status = 'Pending' }) {
    const [result] = await db.execute(
      'INSERT INTO projects (title, description, user_id, status) VALUES (?,?,?,?)',
      [title, description || null, user_id, status]
    )
    const id = result.insertId
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ? LIMIT 1', [id])
    return rows[0]
  },

  async getProjectsByUser (user_id) {
    const [rows] = await db.execute('SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC', [user_id])
    return rows
  },

  async getProjectById (id) {
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ? LIMIT 1', [id])
    return rows && rows.length ? rows[0] : null
  },

  async updateProject (id, { title, description, status }) {
    const parts = []
    const values = []
    if (title !== undefined) { parts.push('title = ?'); values.push(title) }
    if (description !== undefined) { parts.push('description = ?'); values.push(description) }
    if (status !== undefined) { parts.push('status = ?'); values.push(status) }
    if (!parts.length) return this.getProjectById(id)

    values.push(id)
    const sql = `UPDATE projects SET ${parts.join(', ')} WHERE id = ?`
    await db.execute(sql, values)
    return this.getProjectById(id)
  },

  async deleteProject (id) {
    await db.execute('DELETE FROM projects WHERE id = ?', [id])
    return true
  }
}

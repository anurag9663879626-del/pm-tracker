const db = require('../config/db')

module.exports = {
  async createUser ({ name, email, password }) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name || null, email, password]
    )
    return { id: result.insertId, name, email }
  },

  async findByEmail (email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
    return rows && rows.length ? rows[0] : null
  },

  async findById (id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [id])
    return rows && rows.length ? rows[0] : null
  }
}

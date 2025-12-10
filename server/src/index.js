require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

console.log('[DEBUG] Loading app...')

app.use(cors())
app.use(express.json())

console.log('[DEBUG] Middleware configured')

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

console.log('[DEBUG] Loading auth routes...')
const authRoutes = require('./routes/auth')
console.log('[DEBUG] Loading projects routes...')
const projectsRoutes = require('./routes/projects')
console.log('[DEBUG] Loading auth middleware...')
const authMiddleware = require('./middleware/auth')

console.log('[DEBUG] Mounting routes...')
app.use('/api/auth', authRoutes)
app.use('/api/projects', authMiddleware, projectsRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).json({ message: 'Server error', error: err.message })
})

const PORT = process.env.PORT || 5000
console.log('[DEBUG] Starting server on port ' + PORT)
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log('[DEBUG] Server listening')

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message)
  process.exit(1)
})

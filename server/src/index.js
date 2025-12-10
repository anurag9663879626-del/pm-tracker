require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const authRoutes = require('./routes/auth')
const projectsRoutes = require('./routes/projects')
const authMiddleware = require('./middleware/auth')

app.use('/api/auth', authRoutes)
app.use('/api/projects', authMiddleware, projectsRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

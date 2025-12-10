const express = require('express')
const router = express.Router()
const controller = require('../controllers/projectsController')

// GET /api/projects - list all projects for authenticated user
router.get('/', controller.list)

// GET /api/projects/:id - get details for a single project (owned by user)
router.get('/:id', controller.get)

// POST /api/projects - create new project
router.post('/', controller.create)

// PUT /api/projects/:id - update project
router.put('/:id', controller.update)

// DELETE /api/projects/:id - delete project
router.delete('/:id', controller.remove)

module.exports = router

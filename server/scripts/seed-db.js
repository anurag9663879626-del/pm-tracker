require('dotenv').config()
const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306
})

async function seedDatabase () {
  try {
    console.log('🌱 Seeding database with sample data...\n')
    const conn = await pool.getConnection()

    // Sample users with hashed passwords
    const sampleUsers = [
      {
        name: 'Anurag Chowdhury',
        email: 'anurag@example.com',
        password: await bcrypt.hash('password123', 10)
      },
      {
        name: 'John Developer',
        email: 'john@example.com',
        password: await bcrypt.hash('secure456', 10)
      },
      {
        name: 'Sarah Designer',
        email: 'sarah@example.com',
        password: await bcrypt.hash('design789', 10)
      }
    ]

    // Clear existing data
    await conn.query('DELETE FROM projects')
    await conn.query('DELETE FROM users')
    console.log('✅ Cleared existing data\n')

    // Insert users and get their IDs
    const userIds = []
    for (const user of sampleUsers) {
      const [result] = await conn.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [user.name, user.email, user.password]
      )
      userIds.push(result.insertId)
      console.log(`✅ Created user: ${user.name} (${user.email})`)
    }

    console.log('\n📋 Sample Projects:\n')

    // Sample projects for each user
    const projectsByUser = {
      [userIds[0]]: [ // Anurag's projects
        { title: 'PM Tracker App', description: 'Full-stack project management application with React, Express and MySQL', status: 'In Progress' },
        { title: 'API Documentation', description: 'Write comprehensive API docs for backend endpoints', status: 'Pending' },
        { title: 'Database Optimization', description: 'Optimize database queries and add indexes', status: 'Completed' }
      ],
      [userIds[1]]: [ // John's projects
        { title: 'Mobile App Development', description: 'Build React Native mobile app for project tracker', status: 'Pending' },
        { title: 'User Authentication', description: 'Implement OAuth 2.0 integration', status: 'In Progress' },
        { title: 'Testing Suite', description: 'Write unit and integration tests', status: 'Completed' }
      ],
      [userIds[2]]: [ // Sarah's projects
        { title: 'UI Redesign', description: 'Update the frontend UI with modern design patterns', status: 'In Progress' },
        { title: 'Figma Mockups', description: 'Create comprehensive design mockups for all pages', status: 'Completed' },
        { title: 'Brand Guidelines', description: 'Establish design system and brand guidelines', status: 'Pending' }
      ]
    }

    // Insert projects
    for (const [userId, projects] of Object.entries(projectsByUser)) {
      for (const project of projects) {
        await conn.query(
          'INSERT INTO projects (title, description, status, user_id) VALUES (?, ?, ?, ?)',
          [project.title, project.description, project.status, userId]
        )
        console.log(`  ✅ "${project.title}" - ${project.status}`)
      }
      console.log('')
    }

    await conn.release()
    await pool.end()

    console.log('🎉 Database seeding complete!\n')
    console.log('📝 Test Credentials:\n')
    sampleUsers.forEach((user, idx) => {
      console.log(`User ${idx + 1}:`)
      console.log(`  Email: ${user.email}`)
      console.log(`  Password: ${idx === 0 ? 'password123' : idx === 1 ? 'secure456' : 'design789'}\n`)
    })

    process.exit(0)
  } catch (err) {
    console.error('❌ Error seeding database:', err.message)
    process.exit(1)
  }
}

seedDatabase()

const axios = require('axios')

const API_URL = 'http://localhost:5000/api'

async function getToken (email, password) {
  try {
    console.log(`\n🔑 Getting JWT token for: ${email}\n`)
    const res = await axios.post(`${API_URL}/auth/login`, { email, password })
    
    const { token, user } = res.data
    
    console.log('✅ Login successful!\n')
    console.log('👤 User:', user)
    console.log('\n🎫 JWT Token:')
    console.log(token)
    console.log('\n📋 Token Details:')
    
    // Decode token to show payload
    const parts = token.split('.')
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
      console.log('  - UserId:', payload.userId)
      console.log('  - Expires:', new Date(payload.exp * 1000).toLocaleString())
    }
    
    console.log('\n💡 Use this token in API requests:')
    console.log(`Authorization: Bearer ${token}`)
    
    return token
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message
    console.error('❌ Error:', errorMsg)
    if (err.code === 'ECONNREFUSED') {
      console.error('\n⚠️  Cannot connect to server at ' + API_URL)
      console.error('Make sure backend is running: node server/src/index.js')
    }
    process.exit(1)
  }
}

// Default test users
const users = {
  anurag: { email: 'anurag@example.com', password: 'password123' },
  john: { email: 'john@example.com', password: 'secure456' },
  sarah: { email: 'sarah@example.com', password: 'design789' }
}

const userArg = process.argv[2] || 'anurag'
const user = users[userArg]

if (!user) {
  console.log('\n📝 Usage: node get-token.js [user]\n')
  console.log('Available users: anurag, john, sarah\n')
  console.log('Examples:')
  console.log('  node get-token.js anurag')
  console.log('  node get-token.js john')
  console.log('  node get-token.js sarah\n')
  process.exit(0)
}

getToken(user.email, user.password)

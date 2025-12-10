const axios = require('axios')

axios.post('http://localhost:5000/api/auth/login', { 
  email: 'anurag@example.com',
  password: 'password123'
})
  .then(res => {
    console.log('✅ Success!')
    console.log('Token:', res.data.token.substring(0, 50) + '...')
  })
  .catch(err => {
    console.error('Error:', err.message)
    if (err.response) {
      console.error('Status:', err.response.status)
      console.error('Data:', err.response.data)
    }
  })

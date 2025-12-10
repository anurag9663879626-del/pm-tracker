#!/usr/bin/env node
/**
 * Local Integration Test for PM Tracker
 * Verifies that the backend and frontend can communicate end-to-end.
 * 
 * Usage: node test-local.js
 * 
 * Prerequisites:
 * - Server running on http://localhost:5000
 * - MySQL database initialized with server/sql/init.sql
 */

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = null;
let userId = null;

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = (msg, color = 'reset') => {
  console.log(`${colors[color]}${msg}${colors.reset}`);
};

// Test 1: Check server health
async function testHealth() {
  log('\n🔵 Test 1: Server Health Check', 'blue');
  try {
    const res = await axios.get(`${API_URL}/health`);
    log(`✅ Server is healthy: ${JSON.stringify(res.data)}`, 'green');
    return true;
  } catch (err) {
    log(`❌ Server health check failed: ${err.message}`, 'red');
    return false;
  }
}

// Test 2: User Registration
async function testRegister() {
  log('\n🔵 Test 2: User Registration', 'blue');
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123';

  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      name: 'Test User',
      email: testEmail,
      password: testPassword,
    });

    if (res.data.token && res.data.user) {
      authToken = res.data.token;
      userId = res.data.user.id;
      log(`✅ Registration successful: ${res.data.user.email}`, 'green');
      log(`   Token: ${authToken.substring(0, 20)}...`, 'green');
      return true;
    } else {
      log(`❌ Registration failed: missing token or user data`, 'red');
      return false;
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    log(`❌ Registration failed: ${msg}`, 'red');
    return false;
  }
}

// Test 3: User Login
async function testLogin() {
  log('\n🔵 Test 3: User Login', 'blue');
  const testEmail = `test-login-${Date.now()}@example.com`;
  const testPassword = 'LoginPassword123';

  try {
    // First, register a user
    await axios.post(`${API_URL}/auth/register`, {
      name: 'Login Test User',
      email: testEmail,
      password: testPassword,
    });

    // Then, login
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: testPassword,
    });

    if (res.data.token && res.data.user) {
      log(`✅ Login successful: ${res.data.user.email}`, 'green');
      return true;
    } else {
      log(`❌ Login failed: missing token or user data`, 'red');
      return false;
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    log(`❌ Login failed: ${msg}`, 'red');
    return false;
  }
}

// Test 4: Create Project
async function testCreateProject() {
  log('\n🔵 Test 4: Create Project', 'blue');
  if (!authToken) {
    log(`⚠️  Skipped (no auth token)`, 'yellow');
    return false;
  }

  try {
    const res = await axios.post(
      `${API_URL}/projects`,
      {
        title: 'Test Project',
        description: 'This is a test project',
        status: 'Pending',
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (res.data.project && res.data.project.id) {
      log(`✅ Project created: ${res.data.project.title} (ID: ${res.data.project.id})`, 'green');
      return res.data.project.id;
    } else {
      log(`❌ Project creation failed: missing project data`, 'red');
      return false;
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    log(`❌ Project creation failed: ${msg}`, 'red');
    return false;
  }
}

// Test 5: Get Projects
async function testGetProjects() {
  log('\n🔵 Test 5: Get Projects (List)', 'blue');
  if (!authToken) {
    log(`⚠️  Skipped (no auth token)`, 'yellow');
    return false;
  }

  try {
    const res = await axios.get(`${API_URL}/projects`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (Array.isArray(res.data.projects)) {
      log(`✅ Retrieved ${res.data.projects.length} project(s)`, 'green');
      return true;
    } else {
      log(`❌ Get projects failed: invalid response format`, 'red');
      return false;
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    log(`❌ Get projects failed: ${msg}`, 'red');
    return false;
  }
}

// Test 6: Update Project
async function testUpdateProject(projectId) {
  log('\n🔵 Test 6: Update Project', 'blue');
  if (!authToken || !projectId) {
    log(`⚠️  Skipped (no auth token or project ID)`, 'yellow');
    return false;
  }

  try {
    const res = await axios.put(
      `${API_URL}/projects/${projectId}`,
      {
        status: 'In Progress',
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (res.data.project && res.data.project.status === 'In Progress') {
      log(`✅ Project updated: status is now "${res.data.project.status}"`, 'green');
      return true;
    } else {
      log(`❌ Project update failed`, 'red');
      return false;
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    log(`❌ Project update failed: ${msg}`, 'red');
    return false;
  }
}

// Test 7: Delete Project
async function testDeleteProject(projectId) {
  log('\n🔵 Test 7: Delete Project', 'blue');
  if (!authToken || !projectId) {
    log(`⚠️  Skipped (no auth token or project ID)`, 'yellow');
    return false;
  }

  try {
    const res = await axios.delete(`${API_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (res.data.success) {
      log(`✅ Project deleted successfully`, 'green');
      return true;
    } else {
      log(`❌ Project deletion failed`, 'red');
      return false;
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    log(`❌ Project deletion failed: ${msg}`, 'red');
    return false;
  }
}

// Test 8: Unauthorized Access (401)
async function testUnauthorized() {
  log('\n🔵 Test 8: Unauthorized Access (Invalid Token)', 'blue');
  try {
    await axios.get(`${API_URL}/projects`, {
      headers: { Authorization: 'Bearer invalid_token_xyz' },
    });
    log(`❌ Unauthorized access not blocked (expected 401)`, 'red');
    return false;
  } catch (err) {
    if (err.response?.status === 401) {
      log(`✅ Unauthorized access blocked correctly (401)`, 'green');
      return true;
    } else {
      log(`❌ Unexpected error: ${err.message}`, 'red');
      return false;
    }
  }
}

// Run all tests
async function runTests() {
  log('\n╔════════════════════════════════════════════════════╗', 'blue');
  log('║  PM Tracker — Local Integration Test Suite        ║', 'blue');
  log('╚════════════════════════════════════════════════════╝', 'blue');

  const results = [];

  // Check if server is reachable
  const healthOk = await testHealth();
  if (!healthOk) {
    log(
      '\n❌ Server is not running. Start the server with: npm run dev (from server folder)',
      'red'
    );
    process.exit(1);
  }

  results.push(['Server Health', await testHealth()]);
  results.push(['User Registration', await testRegister()]);
  results.push(['User Login', await testLogin()]);

  const projectId = await testCreateProject();
  results.push(['Create Project', projectId !== false]);

  results.push(['Get Projects', await testGetProjects()]);
  results.push(['Update Project', projectId ? await testUpdateProject(projectId) : false]);
  results.push(['Delete Project', projectId ? await testDeleteProject(projectId) : false]);
  results.push(['Unauthorized Access', await testUnauthorized()]);

  // Summary
  log('\n╔════════════════════════════════════════════════════╗', 'blue');
  log('║  Test Summary                                      ║', 'blue');
  log('╚════════════════════════════════════════════════════╝', 'blue');

  const passed = results.filter(([_, result]) => result).length;
  const total = results.length;

  results.forEach(([name, result]) => {
    const icon = result ? '✅' : '❌';
    log(`${icon} ${name}`, result ? 'green' : 'red');
  });

  log(`\n📊 Results: ${passed}/${total} tests passed`, passed === total ? 'green' : 'yellow');

  if (passed === total) {
    log('\n🎉 All tests passed! Your PM Tracker is working correctly.', 'green');
  } else {
    log(`\n⚠️  ${total - passed} test(s) failed. Check the errors above.`, 'yellow');
  }
}

// Execute
runTests().catch(err => {
  log(`\n❌ Test suite error: ${err.message}`, 'red');
  process.exit(1);
});

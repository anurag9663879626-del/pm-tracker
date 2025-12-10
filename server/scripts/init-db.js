#!/usr/bin/env node
/**
 * Database initialization script
 * Checks if tables exist, creates them if needed
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function initializeDatabase() {
  console.log('🔧 Initializing database...\n');

  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 1,
  });

  try {
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');

    // Check if tables exist
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`📋 Existing tables: ${tables.length === 0 ? 'none' : tables.map(t => Object.values(t)[0]).join(', ')}`);

    // Read and execute init.sql
    const sqlFile = path.join(__dirname, '..', 'sql', 'init.sql');
    const initSQL = fs.readFileSync(sqlFile, 'utf8');

    // Split by semicolon and execute each statement
    const statements = initSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`\n📝 Executing ${statements.length} SQL statement(s)...\n`);

    for (const statement of statements) {
      try {
        await connection.query(statement);
        const tableName = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] || 'unknown';
        console.log(`✅ ${tableName}`);
      } catch (err) {
        console.error(`❌ ${err.message}`);
      }
    }

    // Verify tables
    const [finalTables] = await connection.query('SHOW TABLES');
    console.log(`\n✅ Database initialized. Tables: ${finalTables.map(t => Object.values(t)[0]).join(', ')}`);

    connection.release();
    await pool.end();
  } catch (err) {
    console.error(`\n❌ Database initialization failed:`);
    console.error(`   Error: ${err.message}`);
    console.error(`\n   Check your MySQL credentials in .env:`);
    console.error(`   - MYSQL_HOST: ${process.env.MYSQL_HOST}`);
    console.error(`   - MYSQL_USER: ${process.env.MYSQL_USER}`);
    console.error(`   - MYSQL_DATABASE: ${process.env.MYSQL_DATABASE}`);
    process.exit(1);
  }
}

initializeDatabase();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getStudents = (request, response) => {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createStudents = (request, response) => {
    const { first_name, last_name, age } = request.body
  
    pool.query('INSERT INTO students (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, age], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Student added with ID: ${results.rows[0].id}`)
    })
  }

const getById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports = {
    getStudents,
    createStudents,
    getById,
}
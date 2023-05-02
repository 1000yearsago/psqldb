const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.json({ info: 'UKD Students database' })
  });
app.get('/students', db.getStudents)
app.post('/students', db.createStudents)
app.get('/students/:id', db.getById)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Define API routes
app.post('/api/entries', (req, res) => {
  const { title, content, posterUrl, rating, releaseDate, userRating } = req.body;
  const query = 'INSERT INTO journal_entries (title, content, posterUrl, rating, releaseDate, userRating) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, content, posterUrl, rating, releaseDate, userRating], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(201).send('Entry added');
  });
});

app.get('/api/entries', (req, res) => {
  const query = 'SELECT * FROM journal_entries';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

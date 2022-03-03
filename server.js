const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  password: '7foldQibei',
  host: 'localhost',
  database: 'contact_manager',
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  db.query('SELECT * from contacts', (error, data) => {
    if (error) {
      return res.json({ status: 'ERROR', error });
    }

    return res.json(data);
  });
});

app.post('/', (req, res) => {
  let newContact = { ...req.body };

  db.query('INSERT INTO contacts SET ?', newContact, (error, result) => {
    if (error) {
      return res.json({ status: 'ERROR', error });
    }

    return res.json({result});
  });
});

app.listen(4000, () => console.log('App is running on port 4000'));

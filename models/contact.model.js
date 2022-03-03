const sql = require('../utilities/database');


// constructor
const Contact = function (data) {
  this.name = data.name;
  this.email = data.email;
  this.phone = data.phone;
  this.international = data.internation || true;
};

Contact.create = (newContact, result) => {
  sql.query('INSERT INTO contacts SET ?', newContact, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    /** Notice use of spread operator to merge values into new object */
    console.log('created contact: ', { id: res.insertId, ...newContact });
    result(null, { id: res.insertId, ...newContact });
  });
};

Contact.findById = (id, result) => {
  sql.query(`SELECT * FROM contacts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found contact: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Contact with the id
    result({ status: 'NOT_FOUND' }, null);
  });
};

Contact.getAll = (name, result) => {
  let query = 'SELECT * FROM contacts';

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('contacts: ', res);
    result(null, res);
  });
};

Contact.getAllInternational = (result) => {
  sql.query('SELECT * FROM contacts WHERE international=true', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('contacts: ', res);
    result(null, res);
  });
};

Contact.updateById = (id, contact, result) => {
  sql.query(
    'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?',
    [contact.name, contact.email, contact.phone, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Contact with the id
        result({ status: 'NOT_FOUND' }, null);
        return;
      }

      console.log('updated contact: ', { id: id, ...contact });
      result(null, { id: id, ...contact });
    }
  );
};

Contact.remove = (id, result) => {
  sql.query('DELETE FROM contacts WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Contact with the id
      result({ status: 'NOT_FOUND' }, null);
      return;
    }

    console.log('deleted contact with id: ', id);
    result(null, res);
  });
};

Contact.removeAll = (result) => {
  sql.query('DELETE FROM contacts', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contacts`);
    result(null, res);
  });
};

module.exports = Contact;

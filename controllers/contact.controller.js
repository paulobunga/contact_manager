const Contact = require('../models/contact.model');

// Create and Save a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Contact
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    international: req.body.international || false,
  });

  /** If no manipulationt is required, can use spread operator on req..body
   * const contact = new Contact({...req.body});
   */

  // Save Contact in the database
  Contact.create(contact, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Contact.',
      });
    else res.send(data);
  });
};

// Retrieve all Contacts from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Contact.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving contacts.',
      });
    else res.send(data);
  });
};

// Find a single Contact by Id
exports.findOne = (req, res) => {
  Contact.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.status === 'NOT_FOUND') {
        res.status(404).send({
          message: `Not found Contact with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Contact with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Contacts
exports.findAllInternational = (req, res) => {
  Contact.getAllInternation((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving contacts.',
      });
    else res.send(data);
  });
};

// Update a Contact identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  Contact.updateById(req.params.id, new Contact(req.body), (err, data) => {
    if (err) {
      if (err.status === 'NOT_FOUND') {
        res.status(404).send({
          message: `Not found Contact with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Contact with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  Contact.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.status === 'NOT_FOUND') {
        res.status(404).send({
          message: `Not found Contact with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Contact with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Contact was deleted successfully!` });
  });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all contacts.',
      });
    else res.send({ message: `All Contacts were deleted successfully!` });
  });
};

module.exports = app => {
  const contactsCtrl = require('../controllers/contact.controller');

  let express = require('express');
  let router = express.Router();

  // Create a new Tutorial
  router.post('/', contactsCtrl.create);

  // Retrieve all Contacts
  router.get('/', contactsCtrl.findAll);

  // Retrieve all international Contacts
  router.get('/international', contactsCtrl.findAllInternational);

  // Retrieve a single Tutorial with id
  router.get('/:id', contactsCtrl.findOne);

  // Update a Tutorial with id
  router.put('/:id', contactsCtrl.update);

  // Delete a Tutorial with id
  router.delete('/:id', contactsCtrl.delete);

  // Delete all Contacts
  router.delete('/', contactsCtrl.deleteAll);

  app.use('/api/v1/contacts', router);
}
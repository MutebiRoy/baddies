const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Routes for services
router.get('/', serviceController.getAllServices);       // Get all services
router.get('/:id', serviceController.getServiceById);    // Get a single service by ID
router.post('/', serviceController.createService);       // Create a new service
router.put('/:id', serviceController.updateService);     // Update an existing service
router.delete('/:id', serviceController.deleteService);  // Delete a service

module.exports = router;

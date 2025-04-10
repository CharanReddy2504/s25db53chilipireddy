var express = require('express');
var router = express.Router();

// Import the controller for crystal
var crystal_controller = require('../controllers/crystal');

// CRUD operations for Crystal
// GET request for list of all crystals
router.get('/crystals', crystal_controller.crystal_list); 

// GET request for a specific crystal by ID
router.get('/crystals/:id', crystal_controller.crystal_detail);

// POST request to create a new crystal
router.post('/crystals', crystal_controller.crystal_create_post);

// PUT request to update a crystal
router.put('/crystals/:id', crystal_controller.crystal_update_put);

// DELETE request to delete a crystal
router.delete('/crystals/:id', crystal_controller.crystal_delete);

module.exports = router;

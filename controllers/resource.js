var express = require('express');
var router = express.Router();

// Import the controllers
var api_controller = require('../controllers/api');
var crystal_controller = require('../controllers/crystal');  // Ensure the correct controller is required

// API route to list the available resources
router.get('/', api_controller.api);  // Route for API metadata

// CRYSTAL ROUTES
router.post('/crystals', crystal_controller.crystal_create_post);  // POST to create a new crystal
router.delete('/crystals/:id', crystal_controller.crystal_delete);  // DELETE to remove a crystal
router.put('/crystals/:id', crystal_controller.crystal_update_put);  // PUT to update a crystal
router.get('/crystals/:id', crystal_controller.crystal_detail);  // GET details of a specific crystal
router.get('/crystals', crystal_controller.crystal_list);  // GET all crystals

module.exports = router;

const express = require('express');
const router = express.Router();

// Import the Crystal controller
const crystalController = require('../controllers/crystalController');

// ===================================
//           CRYSTAL ROUTES
// ===================================

// GET all crystals
router.get('/', crystalController.crystal_list);

// GET crystal by ID
router.get('/:id', crystalController.crystal_detail);

// POST create a new crystal
router.post('/', crystalController.crystal_create_post);

// PUT update a crystal by ID
router.put('/:id', crystalController.crystal_update_put);

// DELETE a crystal by ID
router.delete('/:id', crystalController.crystal_delete);

module.exports = router;

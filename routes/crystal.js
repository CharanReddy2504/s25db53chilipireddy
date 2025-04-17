const express = require('express');
const router = express.Router();
const crystalController = require('../controllers/crystal');

// Page views
router.get('/view/detail', crystalController.crystal_view_one_Page);
router.get('/view/create', crystalController.crystal_create_Page);
router.get('/view/update', crystalController.crystal_update_Page);
router.get('/view/delete', crystalController.crystal_delete_Page);

// API Routes
router.get('/', crystalController.crystal_list);
router.get('/:id', crystalController.crystal_detail);
router.post('/', crystalController.crystal_create_post);
router.put('/:id', crystalController.crystal_update_put);
router.delete('/:id', crystalController.crystal_delete);

// Export the router
module.exports = router;

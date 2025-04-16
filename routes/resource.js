var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var crystal_controller = require('../controllers/crystal');

// API route to list the available resources
router.get('/', api_controller.api);

// ✅ Only CRYSTAL routes — no costume!
router.post('/crystals', crystal_controller.crystal_create_post);
router.delete('/crystals/:id', crystal_controller.crystal_delete);
router.put('/crystals/:id', crystal_controller.crystal_update_put);
router.get('/crystals/:id', crystal_controller.crystal_detail);
router.get('/crystals', crystal_controller.crystal_list);

module.exports = router;


var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var crystal_controller = require('../controllers/crystal');

// API route to list the available resources
router.get('/', api_controller.api);

// ✅ Only CRYSTAL routes — no costume!
router.post('/crystal', crystal_controller.crystal_create_post);
router.delete('/crystal/:id', crystal_controller.crystal_delete);
router.put('/crystal/:id', crystal_controller.crystal_update_put);
router.get('/crystal/:id', crystal_controller.crystal_detail);
router.get('/crystal', crystal_controller.crystal_list);

module.exports = router;


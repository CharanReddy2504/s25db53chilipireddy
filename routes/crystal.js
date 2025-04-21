const express = require('express');
const router = express.Router();
const crystalController = require('../controllers/crystal');

// Middleware to protect update view route
const secured = (req, res, next) => {
    console.log("SECURED middleware running. req.user =", req.user);
    if (req.user) {
      return next();
    }
    res.redirect("/login");
  };
  

// PAGE VIEWS
router.get('/view/all', crystalController.crystal_view_all_Page);
router.get('/view/detail', crystalController.crystal_view_one_Page);
router.get('/view/create', crystalController.crystal_create_Page);
router.get('/view/update', secured, crystalController.crystal_update_Page);
router.get('/view/delete', crystalController.crystal_delete_Page);

// API ROUTES
router.get('/', crystalController.crystal_list);
router.get('/:id', crystalController.crystal_detail);
router.post('/', crystalController.crystal_create_post);
router.put('/:id', crystalController.crystal_update_put);
router.delete('/:id', crystalController.crystal_delete);

module.exports = router;

router.get('/view/detail', crystalController.crystal_view_one_Page);

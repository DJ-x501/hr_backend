const express = require('express');
const AuthController = require('./authController');
const router = express.Router();


// Define the root route

router.post("/admin/register", AuthController.registerAdmin);
router.post("/admin/login", AuthController.loginAdmin);


module.exports = router;
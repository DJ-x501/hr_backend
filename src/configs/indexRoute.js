const express = require("express");
const router = express.Router();
const authRoute = require("../module/auth.admin/authRoute");


// Define the root route
router.get('/',function(req,res){
    res.send("Welcome to the HR Software API!");
});


//auth routes for all users & admin
router.use("/auth", authRoute);


module.exports = router;
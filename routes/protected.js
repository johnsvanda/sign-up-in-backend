const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
router.get("/", verify, (req,res)=>{
    res.json({
        message: "Data you shouldn't normally get"
    })
})

module.exports = router;
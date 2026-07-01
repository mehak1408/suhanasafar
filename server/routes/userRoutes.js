const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")


const { registerUser ,loginUser } = require("../controllers/userController")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/create-user",protect,adminOnly,registerUser)
module.exports = router ;
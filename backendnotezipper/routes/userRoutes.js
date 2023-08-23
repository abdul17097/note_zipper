const express = require('express');
const router = express.Router();
const {registerUser, loginUser, updateUser} = require('../controlers/userController');
const { verifyToken } = require('../utils/verifyToken');
const protect = require('../middleware/authMiddleWare');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').put(protect,updateUser)



module.exports = router
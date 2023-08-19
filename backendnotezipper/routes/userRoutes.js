const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controlers/userController');
const { verifyToken } = require('../utils/verifyToken');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/mynote',verifyToken, (req, res) => {
    const note = [
        {
            id: 1,
            title: "title",
            note: "content"
        }
    ]
    res.status(200).json(note);
});

module.exports = router
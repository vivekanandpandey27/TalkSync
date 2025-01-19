const express = require('express');
const { sendMessage } = require('../controllers/messageController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();



router.post("/send/:id",isAuthenticated,  sendMessage);
module.exports = router;

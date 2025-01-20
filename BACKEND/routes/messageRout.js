const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();



router.post("/send/:id",isAuthenticated,  sendMessage);
router.get("/:id",isAuthenticated,getMessage);
module.exports = router;

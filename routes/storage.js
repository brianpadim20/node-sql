const uploadMiddleware = require("../utils/handleStorage")
const express = require ("express");
const { createItem } = require ("../controllers/storage")
const router = express.Router();

// Método post
router.post("/",uploadMiddleware.single("myfile"), createItem);

module.exports = router;
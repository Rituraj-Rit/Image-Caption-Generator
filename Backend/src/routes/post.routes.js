const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const {createPostController} = require('../controllers/post.controller')


/* POST /api/posts [protected] {image-file}*/
router.post('/',
    authMiddleware,   /* req.user = userDate */
    upload.single("image"),
    createPostController 
)

module.exports = router;    
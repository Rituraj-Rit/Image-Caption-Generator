require('dotenv').config()
let express = require('express')
let authRoutes = require('./routes/auth.route')
let postRoutes = require('./routes/post.routes')
let cookieParser = require('cookie-parser')


let app = express()

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes);


module.exports = app;
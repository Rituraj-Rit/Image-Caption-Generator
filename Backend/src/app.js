require('dotenv').config()
let express = require('express')
let authRoutes = require('./routes/auth.route')
let postRoutes = require('./routes/post.routes')
let cookieParser = require('cookie-parser')
let path = require('path')


let app = express()

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes);
app.use(express.static(path.join(__dirname, '../public')));


app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = app;
let postModel = require('../models/post.model');
let generateCaption = require('../service/ai.service')
let uploadFile = require('../service/storage.service')
let {v4: uuidv4} = require('uuid')

async function createPostController(req, res){
    const file = req.file;
    console.log("File received", file)

    const base64Image = Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);
    // Day - 141 
    // npm i uuid
    const result = await uploadFile(file.buffer, `${uuidv4()}`)
/*
const [ caption, result ] = await Promise.all([
generateCaption(base64Image),
uploadFile(file.buffer, `${uuidv4()}`)

])
*/

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user: req.user._id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })
    // res.json({
    //     caption,
    //     result,
    // })
}

module.exports = {createPostController}
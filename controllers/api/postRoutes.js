const router = require('express').Router();
const { Post } = require('../../models');
const authenticated = require('../../utils/auth');

router.post('/', authenticated, async (req, res) => {
    try {
        const newPost = await Post.create({
            
        })
    } catch (err) {
        res.status(400).json(err);
    }
})
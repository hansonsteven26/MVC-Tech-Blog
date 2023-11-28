const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const authenticated = require('../../utils/auth');

// get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          // include the comments and the username associated with the comment
          model: Comment,
          attributes: ['id', 'content', 'date_created', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          // include the User who wrote the post
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a specific post
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'date_created', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    
    if (!postData) {
      return res.status(404).json({ message: 'No post found with that ID' });
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// create a post
router.post('/', authenticated, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
router.delete('/:id', authenticated, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      return res.status(404).json({ message: 'No post with that ID' });
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
const router = require('express').Router();
const { Post } = require('../../models');
const authenticated = require('../../utils/auth');

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
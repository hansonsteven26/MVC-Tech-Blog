const router = require('express').Router();
const { Comment, User } = require('../../models');
const authenticated = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    if (!commentData) {
      return res.status(404).json({ message: 'No comment found with that ID' });
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', authenticated, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', authenticated, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      return res.status(404).json({ message: 'No comment found with that ID' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

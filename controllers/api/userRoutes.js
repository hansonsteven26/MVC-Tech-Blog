const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exlcude: ['password'] },
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one user, alon with their posts and comments
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exlcude: ['password'] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'date_created'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'date_created'],
          include: {
            model: Post,
            attributes: ['id', 'title'],
          },
        },
      ],
    });

    if (!userData) {
      return res.status(400).json({ message: 'No user found with that ID' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

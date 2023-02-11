const router = require('express').Router();
const {User, Account, Batch, Box, Container} = require('../../models');
const {withAuth, adminAuth} = require('../../utils/auth');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
    const userDB = await User.findAll({
      order: [
        ["name", "ASC"]
      ],
      attributes: [
        'id',
        'name'
      ]
    });
    const users = userDB.map(user => user.get({plain: true}));
    res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;

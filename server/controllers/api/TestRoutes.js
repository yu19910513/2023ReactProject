const router = require('express').Router();
const {User} = require('../../models');

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

const router = require("express").Router();
const { User, Address } = require("../../models");
const { signToken, authenticate } = require("../../utils/auth");
const bcrypt = require("bcrypt");
const secret = process.env.ADMIN_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ error: "Email is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: "password is incorrect" });
    }
    const token = signToken(user);
    res.send({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error during login" });
  }
});
router.post("/signup", (req, res) => {
  try {
    req.body.adminSecret != secret
      ? (req.body.admin = false)
      : (req.body.admin = true);
    User.create({
      ...req.body,
    }).then((user) => {
      const token = signToken(user);
      res.send({ token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/profile/:id', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     User.findByPk(req.params.id)
//       .then(user => {
//         if (!user) {
//           return res.status(404).send({ message: 'User not found' });
//         }
//         if (user.id !== decoded.id) {
//           return res.status(401).send({ message: 'Unauthorized access' });
//         }
//         res.send({
//           id: user.id,
//           name: user.name,
//           username: user.username,
//           password: user.password
//         });
//       });
//   } catch (error) {
//     console.error(error);
//     return res.status(401).send({ message: 'Unauthorized access' });
//   }
// });

router.get("/owner/:id", authenticate, (req, res) => {
  try {
    User.findByPk(req.params.id, {
      include: [{
        model: Address,
        // as: 'address'
      }]
    }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      console.log(req.body);
      if (user.id !== req.body.data.id && !user.admin) {
        return res.status(401).send({ message: `Unauthorized access` });
      }
      res.send(user);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Unauthorized access" });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(400).send("User not found");
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

module.exports = router;

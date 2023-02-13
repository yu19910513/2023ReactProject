const router = require("express").Router();
const { User, Address } = require("../../models");
const { signToken, authenticate } = require("../../utils/auth");
const bcrypt = require("bcrypt");
// const { log } = require("util");
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
      Address.create({
        user_id: user.id,
      });
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
      include: [
        {
          model: Address,
        },
      ],
    }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      console.log(req.token);
      if (user.id !== req.token.data.id && !req.token.data.admin) {
        return res.status(401).send({ message: `Unauthorized access` });
      }
      res.send(user);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Unauthorized access" });
  }
});

router.put("/updateUserData", authenticate, (req, res) => {
  User.update(
    {
      name: req.body.user.name,
      email: req.body.user.email,
      admin: req.body.user.admin,
    },
    {
      where: {
        id: req.token.data.id,
      },
    }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
    })
    .then(() => {
      const address = req.body.address;
      Address.update(
        {
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          phone: address.phone
        },
        {
          where: {
            user_id: req.token.data.id,
          },
        }
      ).then(() => {
        res.status(200).send({
          message: "User and address data updated successfully",
        });
      });
    });
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

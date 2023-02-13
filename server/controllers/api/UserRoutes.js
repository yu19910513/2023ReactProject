const router = require("express").Router();
const { User, Address } = require("../../models");
const { signToken, authenticate } = require("../../utils/auth");
const sequelize = require("sequelize");
const { Transaction } = require("sequelize");
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
      Address.create({
        user_id: user.id,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

router.put("/updateUserData", authenticate, async (req, res) => {
  try {
    const user = await User.update(
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
    );
    const address = await Address.update(
      {
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zipCode: req.body.address.zipCode,
        phone: req.body.address.phone,
      },
      {
        where: {
          user_id: req.token.data.id,
        },
      }
    );
    if (!user) {
      return res.status(404).json({ message: "No user found with this id" });
    }

    if (!address) {
      return res
        .status(404)
        .json({ message: "No address found with this user" });
    }

    if (user && address) {
      const newTokenRaw = await User.findByPk(req.token.data.id);
      const newToken = newTokenRaw.get({plain: true});
      const token = signToken(newToken);
      res.status(200).send({
        message: "User and address data updated successfully",
        token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "System Error" });
  }
});

module.exports = router;

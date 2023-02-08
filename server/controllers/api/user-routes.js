const router = require("express").Router();
const jwt = require('jsonwebtoken');
const { User, Account, Batch, Box, Container } = require("../../models");
const { withAuth, adminAuth } = require("../../utils/auth");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ error: "Email or password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.send({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error during login" });
  }
});

module.exports = router;

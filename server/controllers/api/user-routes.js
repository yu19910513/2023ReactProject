const router = require("express").Router();
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");
const bcrypt = require("bcrypt");

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
    res.send({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error during login" });
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

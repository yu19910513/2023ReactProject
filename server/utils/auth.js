const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiration = "2h";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.token = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Token");
  }
};

const signToken = ({ email, id, name, admin }) => {
  const payload = { email, id, name, admin };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};


module.exports = { authenticate, signToken };

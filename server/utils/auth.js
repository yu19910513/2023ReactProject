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
    req.body = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Token");
  }
};

const signToken = ({ email, id, admin }) => {
  const payload = { email, id, admin };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

const adminAuth = (req, res, next) => {
  if (!req.session.admin) {
    withAuth(req, res, next);
  } else {
    next();
  }
};

module.exports = { withAuth, adminAuth, authenticate, signToken };

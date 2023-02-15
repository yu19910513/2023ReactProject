const express = require("express");
const cors = require("cors");
const routes = require("./controllers");
const sequelize = require("./config/connection");

const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "dapeng",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(session(sess));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening: http://IP:${PORT}`));
});

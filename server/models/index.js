const User = require("./user");
const Address = require( "./address");


User.hasOne(Address, {
  foreignKey: "user_id",
});

//Relation
Address.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Address };

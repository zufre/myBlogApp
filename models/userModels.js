var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  userName: String,
  password: String
});
module.exports = mongoose.model("User", UserSchema);

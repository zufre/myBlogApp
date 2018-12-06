let mongoose = require("mongoose");

let BlogSchmema = new mongoose.Schema({
  title: { type: String, required: "Cannot be empty" },
  subTitle: { type: String, required: "Cannot be empty" },
  comImage: { type: String, required: "Cannot be empty" },
  blog: { type: String, required: "Cannot be empty" },
  date: { type: Date, defaul: Date.now }
});

module.exports = mongoose.model("Blog", BlogSchema);

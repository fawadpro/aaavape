const mongoose = require("mongoose");

const TopMenuSchema = new mongoose.Schema({
  menuItem: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TopMenu", TopMenuSchema);

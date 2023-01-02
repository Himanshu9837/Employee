const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employeetransaction", transactionSchema);
const mongoose = require("mongoose");
const accountsConstants = require("../../constants/accounts.constants");

const Schema = mongoose.Schema;
const accountTypes = Object.values(accountsConstants.ACCOUNT_TYPES);
const accountStatus = Object.values(accountsConstants.ACCOUNT_STATUS);

const AccountSchema = new Schema({
  number: { type: String, required: true, unique: true, length: 10 },
  status: { 
    type: String, 
    enum: {
      values: accountStatus,
      message: "Please provide a valid account status",
    },
    default: "ACTIVE"
  },
  type: {
    type: String,
    enum: {
      values: accountTypes,
      message: "{VALUE} is not a valid account type",
    },
    default: "savings",
  },
  balance: { type: String, required: true, default: "0.00" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

module.exports = AccountSchema;

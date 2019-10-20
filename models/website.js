const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  requestUrl: String,
  responseUrl: String,
  locale: String,
  status: Number,
  statusText: String,
  GTM: Object,
  hasErrors: Boolean,
  errorMessage: String,
  errorDetails: Object,
  date: { type: Number, default: Date.now }
});

module.exports = mongoose.model("Website", websiteSchema);

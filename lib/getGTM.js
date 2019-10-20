const axios = require("axios");
const { gtmAlgorithm } = require("./gtmAlgorithm");
const { errorHandler } = require("./errorHandler");

// Models
const Website = require("../models/website");

async function getGTM(url) {
  try {
    // Get site HTML
    const res = await axios.get(url);
    // Find GTM object
    const GTM = await gtmAlgorithm(res.data);
    // Check if GTM exists
    if (JSON.stringify(GTM) !== "{}") {
      const site = {
        requestUrl: res.config.url,
        responseUrl: res.request.res.responseUrl,
        status: res.status,
        statusText: res.statusText,
        hasErrors: false,
        GTM: GTM
      };
      return site;
    } else {
      const site = {
        requestUrl: res.config.url,
        responseUrl: res.request.res.responseUrl,
        status: res.status,
        statusText: res.statusText,
        hasErrors: true,
        errorMessage: "PGdataLayer.GTM object not found."
      };
      return site;
    }
  } catch (error) {
    const saveError = await errorHandler(error);
    return saveError;
  }
}

module.exports = { getGTM };

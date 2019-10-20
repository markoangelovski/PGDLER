// Models
const Website = require("../models/website");

const errorHandler = async error => {
  // For "Website not found" errors
  if (!error.response) {
    const website = new Website({
      requestUrl: error.config.url,
      locale: "",
      GTM: {},
      hasErrors: true,
      errorMessage: error.code,
      errorDetails: {
        status: error.errno,
        statusText: error.code,
        headers: error.request._currentRequest._header,
        config: error.config
      }
    });
    console.error("Unique error (no response):", error.message);
    const saved = await website.save();
    return saved;
  } else {
    // For the rest of the numbered errors (301, 404, 500, etc)
    const website = new Website({
      requestUrl: error.config.url,
      locale: "",
      GTM: {},
      hasErrors: true,
      errorMessage: `${error.response.status} - ${error.response.statusText}`,
      errorDetails: {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        config: error.response.config
      }
    });
    console.error("Unique error (with response):", error.message);
    const saved = await website.save();
    return saved;
  }
};

module.exports = { errorHandler };

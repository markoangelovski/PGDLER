const { getGTM } = require("./getGTM");

// Models
const Website = require("../models/website");

async function processsWebsite(url) {
  try {
    // Get website GTM
    const res = await getGTM(url);

    if (!res.hasErrors) {
      // Save website entry to DB
      const website = new Website({
        requestUrl: res.requestUrl,
        responseUrl: res.responseUrl,
        locale: res.GTM.SiteLocale
          ? res.GTM.SiteLocale
          : res.GTM.FacebookConnectLocale
          ? res.GTM.FacebookConnectLocale
          : `${res.GTM.SiteLanguage}-${res.GTM.SiteCountry}`,
        status: res.status,
        statusText: res.statusText,
        GTM: res.GTM,
        hasErrors: false,
        error: {}
      });
      const saved = await website.save();
      return saved;
    } else {
      return res;
    }
  } catch (error) {
    console.error(error.message);
    return error;
  }
}
module.exports = { processsWebsite };

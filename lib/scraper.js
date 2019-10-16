const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML(url) {
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      const html = res.data;
      return html;
    }
  } catch (error) {
    console.error("Error while fetching HTML:", error);
  }
}

function getNaturella(html) {
  try {
    const $ = cheerio.load(html);
    const json = $("script")
      .html()
      .split("= ")[1];
    console.log(JSON.parse(json).GTM);
  } catch (error) {
    console.error("Error while parsing HTML:", error);
  }
}

module.exports = { getHTML, getNaturella };

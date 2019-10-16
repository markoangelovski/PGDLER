const { getHTML, getNaturella } = require("./lib/scraper");

async function go() {
  console.log("Fetching HTML...");
  const html = await getHTML("https://www.naturella.com.mx/");
  getNaturella(html);
  console.log("HTML fetched:!");
}

go();

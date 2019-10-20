const express = require("express");
const { processsWebsite } = require("./processWebsite");

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("req.query", req.query);
  if (JSON.stringify(req.query) === "{}") {
    res.status(404).json({
      title: "PGDataLayer.GTM Object Inspector",
      status: 200,
      statusText: "OK",
      message:
        "Inspect a website by entering URL to query string ?site=http(s)://{website URL}"
    });
  } else if (!req.query.site) {
    res.status(404).json({
      message:
        "Ooops, wrong question! Search for a website by entering ?site=http(s)://{website URL}{website URL} in the address bar."
    });
  } else if (
    req.query.site.match(
      /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/
    )
  ) {
    try {
      const website = await processsWebsite(req.query.site);
      res.status(200).json(website);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message
      });
    }
  } else {
    res.status(404).json({
      message: "Site input not valid. Try again.",
      request: req.query
    });
  }
});

router.get("/*", (req, res) => {
  res.status(404).json({
    message: "Invalid input."
  });
});

module.exports = router;

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const go = require("./lib/initiateScraping");

const app = express();

//Connect to DB
connectDB();

// Middlewaare
app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.set("json spaces", 2);

// Define routes
app.use("/", go);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

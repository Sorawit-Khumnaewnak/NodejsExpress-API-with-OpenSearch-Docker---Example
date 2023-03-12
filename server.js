require("dotenv").config();
const express = require('express');
const logger = require("./middleware/logger");

// TODO: Setup ExpressJS
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Setup Logger setup
app.use(logger);

// TODO: Setup gateway Create
app.use("/api/create/index", require("./api/create/index"));
app.use("/api/create/document", require("./api/create/document"));

// TODO: Setup gateway Search
app.use("/api/search/match", require("./api/search/match"));
app.use("/api/search/term", require("./api/search/term"));
app.use("/api/search/v2", require("./api/search/search"));

// TODO: Setup gateway Delete
app.use("/api/delete/document", require("./api/delete/document"));
app.use("/api/delete/index", require("./api/delete/index"));

// TODO: Setup gateway Update
app.use("/api/update/document", require("./api/update/document"));

// TODO: Running . .. 
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
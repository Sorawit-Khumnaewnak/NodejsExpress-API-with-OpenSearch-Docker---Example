require("dotenv").config();
var { Client } = require("@opensearch-project/opensearch");

// TODO: Create a client.
var client = new Client({
    node: `${process.env.OPENSEARCH_HOST}:${process.env.OPENSEARCH_PORT}`,
})

module.exports = client;
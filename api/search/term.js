const express = require("express");
const router = express.Router();
const clientOpensearch = require("../../config/connect/opensearch");


router.post("/", async (req, res) => {

    // TODO: Search for the document.

    const data_req = req.body

    if (!(("index_name" in data_req) && ("key_name" in data_req) && ("query" in data_req))) {

        res.status(400).send({ msg: "Please input 'index_name, key_name and query' is required" })

    } else {

        try {

            let query = { query: { term: {} } };
            query['query']['term'][data_req['key_name']] = data_req['query']

            var response = await clientOpensearch.search({
                index: data_req['index_name'],
                body: query,
            });

            res.status(200).json({ results: response.body.hits })

        } catch (err) {

            console.log(err);
            res.status(404).json({ results: err })

        }
    }
})


module.exports = router
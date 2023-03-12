const express = require("express");
const router = express.Router();
const clientOpensearch = require("../../config/connect/opensearch");


router.post("/", async (req, res) => {

    // TODO: Create an index with non-default settings.

    const data_req = req.body

    if (!(("index_name" in data_req) && ("number_of_shards" in data_req) && ("number_of_replicas" in data_req))) {

        res.status(400).send({ msg: "Please input 'index_name' is required" })

    } else {

        try {
            var response = await clientOpensearch.indices.create({
                index: data_req['index_name'],
                body: {
                    settings: {
                        index: {
                            number_of_shards: data_req['number_of_shards'],
                            number_of_replicas: data_req['number_of_replicas'],
                        },
                    },
                },
            });

            res.status(201).json({ results: response.body })

        } catch (err) {

            console.log(err);
            res.status(404).json({ results: err })

        }

    }


})


module.exports = router
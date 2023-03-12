const express = require("express");
const router = express.Router();
const clientOpensearch = require("../../config/connect/opensearch");


router.delete("/", async (req, res) => {

    // TODO: Delete the index.

    const data_req = req.body

    if (!(("index_name" in data_req))) {

        res.status(400).send({ msg: "Please input 'index_name' is required" })

    } else {

        try {

            var response = await clientOpensearch.indices.delete({
                index: data_req['index_name'],
            });

            res.status(200).json({ results: response.body })

        } catch (err) {

            console.log(err);
            res.status(404).json({ results: err })

        }
    }
})


module.exports = router
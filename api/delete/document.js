const express = require("express");
const router = express.Router();
const clientOpensearch = require("../../config/connect/opensearch");


router.delete("/", async (req, res) => {

    // TODO: Delete the document.

    const data_req = req.body

    if (!(("index_name" in data_req && "id" in data_req))) {

        res.status(400).send({ msg: "Please input 'index_name and id' is required" })

    } else {

        try {

            var response = await clientOpensearch.delete({
                index: data_req['index_name'],
                id: data_req['id'],
            });

            res.status(200).json({ results: response.body })

        } catch (err) {

            console.log(err);
            res.status(404).json({ results: err })

        }
    }
})


module.exports = router
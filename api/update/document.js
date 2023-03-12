const express = require("express");
const router = express.Router();
const clientOpensearch = require("../../config/connect/opensearch");
const moment = require('moment-timezone');


router.post("/", async (req, res) => {

    // TODO: Add a document to the index.

    const data_req = req.body

    if (!(("index_name" in data_req && "id" in data_req && "document" in data_req))) {

        res.status(400).send({ msg: "Please input 'index_name, id and document' is required" })

    } else {

        let document = data_req['document'];
        document['update_at'] = moment().tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss')

        try {

            let params = {
                index: data_req['index_name'],
                id: data_req['id'],
                body: {
                    doc: document
                }
            };

            // console.log(JSON.stringify(params))

            let response = await clientOpensearch.update(params);

            res.status(200).json({ results: response.body })

        } catch (err) {

            console.log(err);
            res.status(404).json({ results: err })

        }
    }
})


module.exports = router
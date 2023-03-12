const express = require("express");
const router = express.Router();
const clientOpensearch = require("../../config/connect/opensearch");
const moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');


router.post("/", async (req, res) => {

    // TODO: Add a document to the index.

    const data_req = req.body

    if (!(("index_name" in data_req && "document" in data_req))) {

        res.status(400).send({ msg: "Please input 'index_name and document' is required" })

    } else {
        
        let document = data_req['document'];
        let currentDate = moment().tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss')
        document['update_at'] = currentDate
        document['create_at'] = currentDate

        try {

            let response = await clientOpensearch.index({
                id: uuidv4(),
                index: data_req['index_name'],
                body: document,
                refresh: true,
            });

            res.status(201).json({ results: response.body })

        } catch (err) {

            console.log(err);
            res.status(404).json({ results: err })

        }
    }
})


module.exports = router
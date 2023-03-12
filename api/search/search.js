const express = require("express");
const router = express.Router();
const clientOpensearch = require("../../config/connect/opensearch");


router.post("/", async (req, res) => {

    // TODO: Search for the document.

    const data_req = req.body

    if (!(("index_name" in data_req) && (("must" in data_req) || ("must_not" in data_req) || ("should" in data_req)))) {

        res.status(400).send({ msg: "Please input 'index_name and (must, must_not or should) ' is required" })

    } else {

        try {

            let query = {query: {bool: {}}}

            for (const [key, value] of Object.entries(data_req)) {
                console.log(key, value);
                if (key === "must"){
                    for (let index = 0; index < value.length; index++) {

                        if (!("must" in query['query']['bool'])){
                            query['query']['bool']['must'] = []
                        }

                        let temp_ = {"match": {}}
                        temp_['match'][value[index]['key_name']] = value[index]['query']
                        query['query']['bool']['must'].push(temp_)
                        
                    }
                } else if (key === "must_not"){
                    for (let index = 0; index < value.length; index++) {

                        if (!("must_not" in query['query']['bool'])){
                            query['query']['bool']['must_not'] = []
                        }

                        let temp_ = {"match": {}}
                        temp_['match'][value[index]['key_name']] = value[index]['query']
                        query['query']['bool']['must_not'].push(temp_)
                        
                    }
                }  else if (key === "should"){
                    for (let index = 0; index < value.length; index++) {

                        if (!("should" in query['query']['bool'])){
                            query['query']['bool']['should'] = []
                        }

                        let temp_ = {"match": {}}
                        temp_['match'][value[index]['key_name']] = value[index]['query']
                        query['query']['bool']['should'].push(temp_)
                        
                    }
                } 
            }

            console.log(JSON.stringify(query))

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
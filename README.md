# NodejsExpress(API) with OpenSearch(Docker) - Example

## 1. Set up docker
```
$: docker-compose up -d
```

## 2. Install library by npm
```
$: npm install
```

## 3. Start running by npm
```
$: npm start
```

```
// Output listening on port 3000
$: npm WARN lifecycle The node binary used for scripts is /usr/local/opt/node@14/bin/node but npm is using /usr/local/Cellar/node@14/14.21.3/libexec/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.
$: opensearch@1.0.0 start /Users/sorawitkhumnaewnak/Desktop/WORK/PhenixBox/Demo/NodejsExpress(API) with OpenSearch(Docker) - Example
$: node server.js
$: Server listening on port 3000
```

## 4. TEST API - Create index
```
$: curl --location 'localhost:3000/api/create/index' \
--data '{
    "index_name": "demo",
    "number_of_shards": 4,
    "number_of_replicas": 3
}
'
```

## 5. TEST API - Create document
```
$: curl --location 'localhost:3000/api/create/document' \
--data '{
    "index_name": "demo",
    "document": {
        "title": "The Code",
        "author": "major/sf",
        "year": "2011",
        "subtitle": "th/eng"
    }
}'
```

## 6. View all document API in POSTMAN
- Link: https://documenter.getpostman.com/view/12552521/2s93JtR3uS
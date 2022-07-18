const {
    Client
} = require('@elastic/elasticsearch');
module.exports = new Client({
    node: "http://localhost:9200",
    auth: {
        username: process.env.elasticusername,
        password: process.env.elasticpassword
    }
})
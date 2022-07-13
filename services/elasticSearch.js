const {
    Client
} = require('@elastic/elasticsearch');
module.exports = new Client({
    node: "http://localhost:9200",
    auth: {
        username: "Amaan",
        password: "9868439196"
    }
})
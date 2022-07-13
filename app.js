const express = require('express'),
    app = express(),
    elasticClient = require('./services/elasticSearch'),
    bodyParser = require('body-parser')


app.use(bodyParser.json());



app.post('/createGOT', async (req, res) => {
    const {
        character,
        quote
    } = req.body
    await elasticClient.index({
        index: 'game-of-thrones',
        document: {
            character: character,
            quote: quote
        }
    })
    return res.sendStatus(200)
})
app.get('/getAllGOT', async (req, res) => {
    const result = await elasticClient.search({
        index: 'game-of-thrones'
    })
    return res.json(result)
})
app.post('/getGotByQuote', async (req, res) => {
    const {
        quote
    } = req.body
    const result = await elasticClient.search({
        index: 'game-of-thrones',
        query: {
            match: {
                quote: quote
            }
        }
    })
    return res.json(result)
})
app.post('/getGotByCharacter', async (req, res) => {
    const {
        character
    } = req.body
    const result = await elasticClient.search({
        index: 'game-of-thrones',
        query: {
            match: {
                character: character
            }
        }
    })
    return res.json(result)
})


//schema
// await elasticClient.index({
//     index: 'game-of-thrones2',
//     document: {
//       character: 'Ned Stark',
//       quote: 'Winter is coming.'
//     }
//   })



app.listen('80', () => {
    console.log('80 is UP!')
})
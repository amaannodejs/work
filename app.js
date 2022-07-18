require('dotenv').config()
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

app.post('/getDataFromStartingCharacter', async (req, res) => {
    const {
        character
    } = req.body
    const results=[]
    const wresult=[]
    const fields=["character","quote"]

    for(let field of fields){
        let queryResult=await elasticClient.search({
            index: 'game-of-thrones',
            _source:[field],
            query: {
                prefix: {[field]:`${character[0].toLowerCase()}` }
            }
        })
        queryResult=queryResult.hits.hits.map(ele=>ele._source[field])
        results.push(...queryResult)
    }
    for(let result of results){
        result=result.split(" ")
        result.forEach(ele=>{
            if(ele[0].toLowerCase()==character[0].toLowerCase()){
                wresult.push(ele)
            }
        })
    }
    
    return res.json(wresult)
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
require('dotenv').config()
const express=require('express'),
    app=express(),
    {Client}=require('@elastic/elasticsearch')



   

const client = new Client({
        node: "http://localhost:9200",
        auth: {
            username: process.env.elasticusername,
            password: process.env.elasticpassword
          }
      })


//console.log(client)



async function run () {
    // Let's start by indexing some data
    
    await client.index({
      index: 'game-of-thrones2',
      document: {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      }
    })
  
    await client.index({
      index: 'game-of-thrones2',
      document: {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      }
    })
  
    await client.index({
      index: 'game-of-thrones2',
      document: {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    })
    await client.indices.putMapping({
        index: 'game-of-thrones2',
        body: {
        properties: { 
            character: { type: 'text' },
            quote: { type: 'text' } }
        }
    });
  
    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones2' })
  
    // Let's search!
    const result= await client.search({
      index: 'game-of-thrones',
      query: {
        match: { quote: 'winter' }
      }
    })
  
    console.log(result.hits.hits)
  }
  run().catch(console.log)


app.listen('80',()=>{
    console.log('80 is UP!')
})
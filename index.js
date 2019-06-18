const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const monk = require('monk')

const db = require('monk')('mongodb://annabdev:psswrd@cluster0-shard-00-00-joopd.mongodb.net:27017,cluster0-shard-00-01-joopd.mongodb.net:27017,cluster0-shard-00-02-joopd.mongodb.net:27017/DANDD?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')

db.then(() => {
    console.log('Connected to DB')
})

app.use(bodyParser.json())
app.use(cors())

const DANDD = db.collection('Character')



app.get('/', async (req, res) => {
    const result = await DANDD.find()
    console.log("get")
    res.status(200)
    .send(result)
})

app.post('/', async (req, res) => {
    const result = await DANDD.insert(req.body)
    console.log("Post")
    res.status(200).send(result) 
  })

  app.put('/:id', async (req, res) => {
    const result = await DANDD.findOneAndUpdate(req.params._id, { $set: req.body})
    console.log("put");
    res.status(200).send(result); 
  })
 
  app.delete('/:id', async (req, res) => {
    const result = await DANDD.findOneAndDelete(req.params.id)
    console.log("delete")
    res.status(200)
    .send(result)
  }) 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
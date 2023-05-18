const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000

const gallery = require('./Data/gallery.json');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Toy is Selling');
});


app.get('/gallery', (req, res) => {
    res.send(gallery);
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zvd8xno.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();
        const allToyCollections = client.db("toyMonster").collection("toys");
       

        // GET Data Using email Query

        app.get('/toys', async (req, res) => {
            let query = {};
            // console.log(req.query);
            if (req.query?.email) {
                query = { userEmail: req.query.email }
            }
            const result = await allToyCollections.find(query).toArray()
            res.send(result)
            console.log(result)
        })

         // GET API of toys read toy
         app.get("/toys", async (req, res) => {
            const result = await allToyCollections.find().toArray();
            res.send(result);
        })

        //POST API of toys Insert toy by the user
        app.post("/toys", async (req, res) => {
            const toy = req.body;
            const result = await allToyCollections.insertOne(toy);
            res.send(result);
            console.log(toy)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`Toy API is Selling on port ${port}`);
})
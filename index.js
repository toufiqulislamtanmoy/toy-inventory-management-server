const express = require('express');
const app = express();
const cors = require('cors');
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


app.listen(port, () => {
    console.log(`Toy API is Selling on port ${port}`);
})
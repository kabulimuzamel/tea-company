require('dotenv').config();
const express = require('express');
const app = express();
const connectMongo = require('./db/connectMongo');

const admin = require('./routes/adminProduct')

app.use('/api/v1/product', )
app.use('/api/v1/admin/', admin)


const port = process.env.PORT || 3000;


const start = async () => {
    try {
        await connectMongo(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
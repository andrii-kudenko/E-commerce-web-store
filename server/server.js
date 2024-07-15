const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs')
const path = require('path');
require('dotenv').config()

// app
const app = express()

// db
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            bufferCommands: false,
            useUnifiedTopology: true,
        })
        .then(() => console.log('DB CONNECTED'))
        .catch(err => console.log(`DB CONNECTION ERROR ${err}`))
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }

} 

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

// routes middleware

// fs.readdirSync('./routes').map((r) => 
//     app.use('api/', require('./routes/' + r)))

readdirSync('./routes').forEach((file) => {
    const routePath = path.join(__dirname, 'routes', file);
    const route = require(routePath);
    app.use('/api', route);
});

// app.use('/api', authRoutes)

// port
const port = process.env.PORT || 8000;

const startServer = async () => {
    await connectDB();

    app.listen(port, () => console.log(`Server is running on port ${port}`));
}

startServer()
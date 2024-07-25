const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Schema = require('./graphql/mutation');

const app = express();

require('dotenv').config();

mongoose.connect(process.env.DB_URI).then(() => console.log("Database Connected...")).catch((err) => console.log("Database connection error..."));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/graphQl', graphqlHTTP({
    Schema,
    graphiql: true
}));

app.use(bodyParser.json());
app.use(express.static(path.resolve('./Public')));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Server connection error...");
    } else {
        console.log(`Server connected on port: ${process.env.PORT}`);
    }
});
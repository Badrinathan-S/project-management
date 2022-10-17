const express = require('express');
const colors = require('colors');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port  = process.env.PORT || 5000;

const app = express();



app.use(bodyParser.json());

connectDB();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === 'developement',
    })
  );

app.listen(port, console.log(`Server running on port ${port}`))


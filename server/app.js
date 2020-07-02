const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('connected to DB');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const port = process.env.PORT || 443;
app.listen(port, () => {
  console.log(`Running in port ${port}`);
});

const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const schema = require("./schema/schema");

//app config
const app = express();
const port = process.env.PORT || 8080;

// bind express with graphql
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

//DB config
const connection_URI = `mongodb+srv://gql_admin:cCBCsYXmUBDGOdVg@cluster0.ninue.mongodb.net/learn_graphql?retryWrites=true&w=majority`;
mongoose.connect(connection_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("DB is connected");
});

// API routes
app.get("/", (req, res) => res.status(200).send("Learning GraphQL"));

// Listen
app.listen(port, () => console.log(`Listening on port : ${port}`));

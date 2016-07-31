import graphqlHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {printSchema} from 'graphql/utilities';
import express from 'express';
import {EventSchema} from './schema/schema';
import bodyParser from 'body-parser';


let app = express();

app.use('/graphql', graphqlHTTP({
  schema: EventSchema,
  graphiql: true
}));


let server = app.listen(
  3000,
  () => console.log(`GraphQL running on ${server.address().port}`)
);

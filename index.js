import graphqlHTTP from 'express-graphql';
import express from 'express';
import {EventSchema} from './schema/schema';

// Database ====================================================================

import massive from 'massive';
let db = massive.connectSync({db: 'thecall'});

// Controllers =================================================================

import EventController from './controllers/event';
import OrganizationController from './controllers/organization';
import TagController from './controllers/tag';

let Events = new EventController({db: db});
let Organizations = new OrganizationController({db: db});
let Tags = new TagController({db: db});

let ctx = {
  db: db,
  Events: Events,
  Organizations: Organizations,
  Tags: Tags
}


let app = express();

app.use('/graphql', graphqlHTTP({
  schema: EventSchema,
  graphiql: true,
  context: ctx
}));


let server = app.listen(
  3000,
  () => console.log(`GraphQL running on ${server.address().port}`)
);

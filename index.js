import graphqlHTTP from 'express-graphql';
import express from 'express';
import {EventSchema} from './schema/schema';

// Logging =====================================================================

import bunyan from 'bunyan';
let log = bunyan.createLogger({name: 'easy-events'});

// Database ====================================================================

import massive from 'massive';
let db = massive.connectSync({db: 'thecall'});

// Controllers =================================================================

import EventController from './controllers/event';
import OrganizationController from './controllers/organization';
import TagController from './controllers/tag';

// Context =====================================================================

let ctx = {};

ctx.log = log;
ctx.Events = new EventController({db: db, ctx: ctx});
ctx.Organizations = new OrganizationController({db: db, ctx: ctx});
ctx.Tags = new TagController({db: db, ctx: ctx});


let app = express();

app.use('/graphql', graphqlHTTP({
  schema: EventSchema,
  graphiql: true,
  context: ctx
}));


let server = app.listen(
  3000,
  () => log.info(`GraphQL running on ${server.address().port}`)
);

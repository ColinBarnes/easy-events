import graphqlHTTP from 'express-graphql';
import express from 'express';
import {EventSchema} from './schema/schema';
import config from './config';

// Logging =====================================================================

import bunyan from 'bunyan';
let log = bunyan.createLogger({name: config.name});

// Database ====================================================================

import massive from 'massive';
let db = massive.connectSync({connectionString: config.database});

// Controllers =================================================================

import EventController from './controllers/event';
import OrganizationController from './controllers/organization';
import TagController from './controllers/tag';

// Context =====================================================================

let ctx = {
  log: log,
  db: db
};

ctx.ctx = ctx;
ctx.Events = new EventController(ctx);
ctx.Organizations = new OrganizationController(ctx);
ctx.Tags = new TagController(ctx);


let app = express();

app.use('/graphql', graphqlHTTP({
  schema: EventSchema,
  graphiql: true,
  context: ctx
}));


let server = app.listen(
  config.port,
  () => log.info(`GraphQL running on ${server.address().port}`)
);

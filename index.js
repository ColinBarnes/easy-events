import graphqlHTTP from 'express-graphql';
import express from 'express';
import {EventSchema} from './schema/schema';
import config from './config';
import jwt from 'jsonwebtoken';

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

// Server ======================================================================

let app = express();

app.post('/guestlogin', (req, res) => {
  let token = jwt.sign({
    user: 'guest'
  }, config.secret, {
    expiresIn: '2h'
  });

  res.json({
    success: true,
    token: token
  })
});

let authenticate = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];
  if(token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if(err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded =  decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      sucess: false,
      message: 'No token provided. Please provide a Bearer token in the "Authorization" header.'
    });
  }
}

app.use('/graphql', authenticate, graphqlHTTP({
  schema: EventSchema,
  graphiql: config.graphiql,
  context: ctx
}));


let server = app.listen(
  config.port,
  () => log.info(`GraphQL running on ${server.address().port}`)
);

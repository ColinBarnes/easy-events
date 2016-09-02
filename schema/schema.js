import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

// Manually definted types
import {eventType, eventInputType} from './eventType';
import {tagType, tagInputType} from './tagType';
import {organizationType, organizationInputType} from './organizationType';

// Database ====================================================================

import massive from 'massive';
let db = massive.connectSync({db: 'thecall'});

// Controllers =================================================================

import EventController from '../controllers/eventcontroller';
let Events = new EventController({db: db});

// Resolver functions
import {getEvent, getEvents, getOrganization, getOrganizations, getTag, getTags} from './resolvers';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    event: {
      type: eventType,
      args: {
        id: {
          description: "id of the event",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}) => Events.getByID(id)
    },
    events: {
      description: "A list of all of the current approved events.",
      type: new GraphQLList(eventType),
      resolve: () => Events.getAll()
    },
    organization: {
      type: organizationType,
      args: {
        id: {
          description: "id of the organization",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}) => getOrganization(id)
    },
    organizations: {
      type: new GraphQLList(organizationType),
      resolve: () => getOrganizations()
    },
    tag: {
      type: tagType,
      args: {
        id: {
          description: "id of the tag",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}) => getTag(id)
    },
    tags: {
      type: new GraphQLList(tagType),
      resolve: () => getTags()
    }
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutations',
  descriptions: 'All of the possible changes',
  fields: () => ({
    createEvent: {
      type: eventType,
      description: 'Add a new event',
      args: {
        event: {type: eventInputType}
      },
      resolve: (root, {event}) => event
    },
    creatOrganization: {
      type: organizationType,
      description: 'Add a new organization',
      args: {
        organization: {type: organizationInputType}
      },
      resolve: (root, {organization}) => organization
    },
    createTag: {
      type: tagType,
      description: 'Add a new tag',
      args: {
        tag: {type: tagInputType}
      },
      resolve: (root, {tag}) => tag
    }
  })
});

export const EventSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

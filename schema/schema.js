import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

// Manually definted types
import eventType from './eventType';
import tagType from './tagType';
import organizationType from './organizationType';

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
      resolve: (root, {id}) => getEvent(id)
    },
    events: {
      description: "A list of all of the current approved events.",
      type: new GraphQLList(eventType),
      resolve: () => getEvents()
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

export const EventSchema = new GraphQLSchema({
  query: queryType
});

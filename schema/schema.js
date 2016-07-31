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

// Sample data
import {events, tags, organizations}  from './example';

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
      resolve: (root, {id}) => events[Number(id)]
    },
    events: {
      type: new GraphQLList(eventType),
      resolve: () => events
    },
    organization: {
      type: organizationType,
      args: {
        id: {
          description: "id of the organization",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}) => organizations[Number(id)]
    }
  })
});

export const EventSchema = new GraphQLSchema({
  query: queryType
});

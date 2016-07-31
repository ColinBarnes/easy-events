import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

import tagType from './tagType';
import organizationType from './organizationType';

const eventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString,
      description: "The name of the event"
    },
    description: {
      type: GraphQLString,
      description: "A description of the event"
    },
    organization: {
      type: organizationType,
      description: "The organization hosting the event"
    },
    start_time: {
      type: GraphQLString,
      description: "Starting date and time of the event in ISO 8601 format"
    },
    end_time: {
      type: GraphQLString,
      description: "Ending date and time of the event in ISO 8601 format"
    },
    address: {
      type: GraphQLString,
      description: "Street address"
    },
    city: {
      type: GraphQLString,
      description: "City"
    },
    state: {
      type: GraphQLString,
      description: "State abbreviation"
    },
    postal_code: {
      type: GraphQLString,
      description: "US postal code"
    },
    country: {
      type: GraphQLString,
      description: "Country"
    },
    min_people: {
      type: GraphQLInt,
      description: "The minimum number of people needed for the event"
    },
    max_people: {
      type: GraphQLInt,
      description: "The maximum number of people needed for the event, 0 if there is no maximum"
    },
    tags: {
      type: new GraphQLList(tagType),
      description: "A list of tags associated with the event"
    }

  })
});

export default eventType;

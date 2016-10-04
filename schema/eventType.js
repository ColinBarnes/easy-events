import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType
} from 'graphql';

import {tagType, tagAttributesInputType} from './tagType';
import {organizationType, organizationAttributesInputType} from './organizationType';
import {DateTimeType} from './utilityTypes';

const statusEnum = new GraphQLEnumType({
  name: "Status",
  description: "A flag to show whether or not the event has been approved.",
  values: {
    PENDING: {
      value: "pending",
      description: "The event should not be public yet."
    },
    APPROVED: {
      value: "approved",
      description: "The event has been reviewed and should be public."
    },
    REMOVED: {
      value: "removed",
      description: "The event has been removed, and it should not be public."
    }
  }
});

export const eventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: statusEnum,
      description: "A flag to show whether or not the event has been approved.",
      resolve: (root, args, ctx) => ctx.Events.getStatusById(root.id)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the event"
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A description of the event"
    },
    organization: {
      type: organizationType,
      description: "The organization hosting the event",
      resolve: (root, args, ctx) => ctx.Organizations.getByEventID(root.id)
    },
    start_time: {
      type: DateTimeType,
      description: "Starting date and time of the event"
    },
    end_time: {
      type: DateTimeType,
      description: "Ending date and time of the event"
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
      description: "A list of tags associated with the event",
      resolve: (root, args, ctx) => ctx.Tags.getByEventID(root.id)
    }

  })
});

export const eventInputType = new GraphQLInputObjectType({
  name: 'EventInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the event"
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A description of the event"
    },
    organization: {
      type: organizationAttributesInputType,
      description: "The organization hosting the event"
    },
    start_time: {
      type: new GraphQLNonNull(DateTimeType),
      description: "Starting date and time of the event in ISO 8601 format"
    },
    end_time: {
      type: DateTimeType,
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
    min_people: {
      type: GraphQLInt,
      description: "The minimum number of people needed for the event"
    },
    max_people: {
      type: GraphQLInt,
      description: "The maximum number of people needed for the event, 0 if there is no maximum"
    },
    tags: {
      type: new GraphQLList(tagAttributesInputType),
      description: "A list of tags associated with the event"
    }
  })
});

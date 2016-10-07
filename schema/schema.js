import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

// Manually definted types
import {eventType, eventAttributesInputType, eventInputType} from './eventType';
import {tagType, tagAttributesInputType, tagInputType} from './tagType';
import {organizationType, organizationAttributesInputType, organizationInputType} from './organizationType';

// Schema ======================================================================

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
      resolve: (root, {id}, ctx) => ctx.Events.getByID(id)
    },
    events: {
      description: "A list of all of the current approved events.",
      type: new GraphQLList(eventType),
      resolve: (root, args, ctx) => ctx.Events.getAll()
    },
    organization: {
      type: organizationType,
      args: {
        id: {
          description: "id of the organization",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}, ctx) => ctx.Organizations.getByID(id)
    },
    organizations: {
      type: new GraphQLList(organizationType),
      resolve: (root, args, ctx) => ctx.Organizations.getAll()
    },
    tag: {
      type: tagType,
      args: {
        id: {
          description: "id of the tag",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}, ctx) => ctx.Tags.getByID(id)
    },
    tags: {
      type: new GraphQLList(tagType),
      resolve: (root, args, ctx) => ctx.Tags.getAll()
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
      resolve: (root, {event}, ctx) => ctx.Events.create(event)
    },
    updateEvent: {
      type: eventType,
      description: 'Update an event',
      args: {
        event: {type: eventAttributesInputType}
      },
      resolve: (root, {event}, ctx) => ctx.Events.update(event)
    },
    creatOrganization: {
      type: organizationType,
      description: 'Add a new organization',
      args: {
        organization: {type: organizationInputType}
      },
      resolve: (root, {organization}, ctx) => ctx.Organizations.create(organization)
    },
    updateOrganization: {
      type: organizationType,
      description: 'Update an organization',
      args: {
        organization: {type: organizationAttributesInputType}
      },
      resolve: (root, {organization}, ctx) => ctx.Organizations.update(organization)
    },
    createTag: {
      type: tagType,
      description: 'Add a new tag',
      args: {
        tag: {type: tagInputType}
      },
      resolve: (root, {tag}, ctx) => ctx.Tags.create(tag)
    },
    updateTag: {
      type: tagType,
      description: 'Update a tag',
      args: {
        tag: {type: tagAttributesInputType}
      },
      resolve: (root, {tag}, ctx) => ctx.Tags.update(tag)
    }
  })
});

export const EventSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

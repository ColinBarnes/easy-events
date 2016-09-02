import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

export const organizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString,
      description: "The name of the organization"
    },
    description: {
      type: GraphQLString,
      description: "A description of the organization"
    }
  })
});

export const organizationInputType = new GraphQLInputObjectType({
  name: 'OrganizationInput',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString,
      description: "The name of the organization"
    },
    description: {
      type: GraphQLString,
      description: "A description of the organization"
    }
  })
});

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const organizationType = new GraphQLObjectType({
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

export default organizationType;

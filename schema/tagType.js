import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

export const tagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () =>({
    id: {
      type: GraphQLString
    },
    tag: {
      type: GraphQLString,
      description: "A tag"
    }
  })
});

export const tagInputType = new GraphQLInputObjectType({
  name: 'TagInput',
  fields: () =>({
    id: {
      type: GraphQLString
    },
    tag: {
      type: GraphQLString,
      description: "A tag"
    }
  })
});

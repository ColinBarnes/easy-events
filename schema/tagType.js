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

export const tagAttributesInputType = new GraphQLInputObjectType({
  name: 'TagAttributesInput',
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
    tag: {
      type: GraphQLString,
      description: "A tag"
    }
  })
});

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const tagType = new GraphQLObjectType({
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

export default tagType;

import {
  GraphQLScalarType,
  GraphQLError
} from 'graphql';

import { Kind } from 'graphql/language';

let dateTimeVal = function(val) {
  if(isNaN(Date.parse(val))) {
    throw new GraphQLError('Field error: value is not an ISO 8601 or RFC2822 date time value: ' + val);
  }
  return new Date(val).toISOString();
}

export const DateTimeType = new GraphQLScalarType({
  name: 'DateTime',
  serialize: (val) => val,
  parseValue: (val) => val,
  parseLiteral: (ast) => {
    if(ast.kind !== Kind.STRING) {
      throw new GraphQLError('Query error: Can only parse strings. Got a: ', ast.kind, [ast]);
    }

    if(isNaN(Date.parse(ast.value))) {
      throw new GraphQLError('Query error: Invalid date time format. Date time must be in ISO 8601 or RFC2822 format: ' + ast.value);
    }

    return new Date(ast.value).toISOString();
  }

});

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        username: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        }
    })
});

module.exports = UserType;
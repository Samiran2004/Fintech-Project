const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = require('graphql');

const TransactionType = new GraphQLObjectType({
    name: 'Transaction',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        userId: {
            type: GraphQLID
        },
        amount: {
            type: GraphQLFloat
        },
        transactionType: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        }
    })
});

module.exports = TransactionType;
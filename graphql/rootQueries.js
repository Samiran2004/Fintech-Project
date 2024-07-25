const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');

const UserType = require('./types/UserTypes');
const TransactionType = require('./types/TransactionTypes');
const User = require('../models/UserModel');
const Transaction = require('../models/TransactionModel');

const Rootqueries = new GraphQLObjectType({
     name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        transaction: {
            type: TransactionType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Transaction.findById(args.id);
            }
        },
        transactions:{
            type:GraphQLList(TransactionType),
            resolve(parent,args){
                return Transaction.find({});
            }
        }
    }
});

module.exports = Rootqueries;
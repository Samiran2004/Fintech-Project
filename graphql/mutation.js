const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat, GraphQLSchema } = require('graphql');
const UserType = require('./types/UserTypes');
const User = require('../models/UserModel');
const Transaction = require('../models/TransactionModel');
const RootQuery = require('./rootQueries');
const bcrypt = require('bcrypt');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                username: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                const hashedPassword = await bcrypt.hash(args.password, 10);
                let newUser = new User({
                    username: args.username,
                    email: args.email,
                    password: hashedPassword
                });
                const user = await newUser.save();
                return user;
            }
        },
        deposit: {
            type: UserType,
            args: {
                userId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                amount: {
                    type: new GraphQLNonNull(GraphQLFloat)
                }
            },
            async resolve(parent, args) {
                const user = await User.findById(args.userId);
                if (args.amount > 0) {
                    user.balance += args.amount;
                } else {
                    throw new Error("Nagetive value not accepted");
                }
                const newTransaction = new Transaction({
                    userId: args.userId,
                    amount: args.amount,
                    transactionType: 'deposit'
                });
                await newTransaction.save();
                return user;
            }
        },
        withdraw: {
            type: UserType,
            args: {
                userId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                amount: {
                    type: new GraphQLNonNull(GraphQLFloat)
                }
            },
            async resolve(parent, args) {
                const user = await User.findById(args.userId);
                if (!user) {
                    throw new Error("No User Found");
                }
                if (user.balance < args.amount) {
                    throw new Error("Insufficient balance");
                }
                user.balance -= args.amount;
                await user.save();
                const newTransaction = new Transaction({
                    userId: args.userId,
                    amount: args.amount,
                    transactionType: "withdraw"
                });
                await newTransaction.save();
                return user;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
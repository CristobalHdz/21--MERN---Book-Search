const { signToken } = require('../utils/auth')
const { User, Book } = require('../models')
const { AuthehticationError } = require('apollo-server-express')

const resolvers = {


    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
                return userData
            } throw new AuthenticationError("The user is not logged in.")
        }
    },


    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            if (!user) {
                throw new AuthenticationError("Email has not been registered. User not found.")
            }
            const correctPass = await user.isCorrectPassword(password)
            if (!correctPass) {
                throw new AuthenticationError("Invalid password")
            }
            const token = signToken(user)
            return { token, user }
        },

        saveBook: async (parent, {book}, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true}
                )
                return updatedUser
            }
        }
    }
}
module.exports = resolvers
const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // get the current user
    me: async (parent, ags, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
    },
  },
  Mutation: {
    // create a single user
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    // saveBook: parameter of book authors, description, title, bookId, image, and link; returns User type 
    saveBook: async (parent, { authors, description, title, bookId, image, link  }, context) => {

        const book = await Book.create({ authors, description, title, bookId, image, link });

        if (context.user){
            return User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: book._id } }
            );
        }

        throw AuthenticationError;
    },
    // removeBook: parameter of bookId; returns User type
    removeBook: async (parent, { bookId }, context) => {
        if (context.user){
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { books: { bookId: bookId } } },
                { new: true }
            );
        }
    },
    // login: accepts an email and password and returns an auth type
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
    },
  },
};

module.exports = resolvers;
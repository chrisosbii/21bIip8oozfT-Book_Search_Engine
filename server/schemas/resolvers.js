const { Book, User } = require('../models');

const resolvers = {
  Query: {
    // get single user
    tech: async () => {
      return User.find({});
    },
    // login as a user

    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation: {
    // create a single user

    // save a book to a user's 'savedBooks' field

    // remove a book from 'savedBooks'
    
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
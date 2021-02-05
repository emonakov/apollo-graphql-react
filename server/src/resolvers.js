const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    items: async (_, __, { dataSources, user }) => {
      if (!user) {
        throw new AuthenticationError('Login first');
      }
      const items = await dataSources.itemAPI.getItems();

      return {
        success: true,
        items: items || [],
      };
    },
  },
  Mutation: {
    login: async (_, { userName, password }, { dataSources }) => {
      if (!userName || !password) {
        throw new UserInputError('Fill required fields', {
          success: false,
          message: 'form is not filled',
        });
      }
      const user = await dataSources.userAPI.findUserByPassword({
        userName,
        password,
      });
      if (user) {
        return {
          success: true,
          token: Buffer.from(user.userName).toString('base64'),
        };
      }

      throw new AuthenticationError('Login failed');
    },
    signUp: async (_, { userName, password }, { dataSources }) => {
      if (!userName || !password) {
        throw new UserInputError('Fill required fields', {
          success: false,
          message: 'form is not filled',
        });
      }
      const user = await dataSources.userAPI.createUser({ userName, password });
      if (user) {
        return {
          success: true,
          token: Buffer.from(user.userName).toString('base64'),
        };
      }

      throw new AuthenticationError('Signup failed');
    },
    resetPassword: async (_, { userName, password }, { dataSources }) => {
      if (!userName || !password) {
        throw new UserInputError('Fill required fields', {
          success: false,
          message: 'form is not filled',
        });
      }
      const user = await dataSources.userAPI.updatePassword({
        userName,
        password,
      });
      if (user) {
        return {
          success: true,
          user,
        };
      }

      throw new AuthenticationError('Reset password failed');
    },
    createItem: async (_, { title }, { dataSources, user }) => {
      if (!user) {
        throw new AuthenticationError('Login first');
      }
      const item = await dataSources.itemAPI.addItem({ title });

      if (item) {
        return {
          success: true,
          item,
        };
      }

      throw new UserInputError('Fill required fields', {
        success: false,
        message: 'Item was not created',
      });
    },
    deleteItem: async (_, { itemId }, { dataSources, user }) => {
      if (!user) {
        throw new AuthenticationError('Login first');
      }

      const { isDeleted, id } = await dataSources.itemAPI.deleteItem({ itemId });

      return {
        success: isDeleted,
        message: isDeleted ? 'item deleted' : 'something went wrong',
        id,
      };
    },
  },
};

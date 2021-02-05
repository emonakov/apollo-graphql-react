module.exports = {
  Query: {
    items: async (_, __, { dataSources, user }) => {
      if (!user) {
        return {
          success: false,
          message: 'log in first',
          items: [],
        }
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
      const user = await dataSources.userAPI.findUserByPassword({ userName, password });
      if (user) {
        return {
          success: true,
          token: Buffer.from(user.userName).toString('base64'),
        };
      }

      return {
        success: false,
        message: 'Something went wrong',
      }
    },
    signUp: async (_, { userName, password }, { dataSources }) => {
      const user = await dataSources.userAPI.createUser({ userName, password });
      if (user) {
        return {
          success: true,
          token: Buffer.from(user.userName).toString('base64'),
        };
      }

      return {
        success: false,
        message: 'Something went wrong',
      }
    },
    resetPassword: async (_, { userName, password }, { dataSources }) => {
      const user = await dataSources.userAPI.updatePassword({ userName, password });
      if (user) {
        return {
          success: true,
          user,
        };
      }

      return {
        success: false,
        message: 'Something went wrong',
      }
    },
    createItem: async (_, { title }, { dataSources, user }) => {
      if (!user) {
        return {
          success: false,
          message: 'log in first',
        };
      }
      const item = await dataSources.itemAPI.addItem({ title });

      if (item) {
        return {
          success: true,
          item,
        }
      }

      return {
        success: false,
        message: 'Item was not created',
      };
    },
    deleteItem: async (_, { itemId }, { dataSources, user }) => {
      if (!user) {
        return {
          success: false,
          message: 'log in first',
        };
      }

      const isDeleted = await dataSources.itemAPI.deleteItem({ itemId });

      return {
        success: isDeleted,
        message: isDeleted ? 'item deleted' : 'something went wrong',
      };
    },
  },
};

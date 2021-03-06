const { DataSource } = require('apollo-datasource');

const { toHash, compare } = require('../services/password');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findUser({ userName: userNameArg } = {}) {
    const userName =
      this.context && this.context.user
        ? this.context.user.userName
        : userNameArg;
    if (!userName) return null;
    const user = await this.store.users.findOne({ where: { userName } });

    return user;
  }

  async findUserByPassword({ userName, password } = {}) {
    if (!userName || !password) return null;
    const user = await this.store.users.findOne({ where: { userName } });
    if (!user) {
      return null;
    }
    const isSamePassword = await compare(user.password, password);
    if (isSamePassword) {
      return user;
    }

    return null;
  }

  async createUser({ userName, password } = {}) {
    if (!userName || !password) return null;
    let user = await this.store.users.findOne({ where: { userName } });
    if (user) {
      return null;
    }
    const passwordHash = await toHash(password);
    user = await this.store.users.create({
      userName,
      password: passwordHash,
    });

    return user;
  }

  async updatePassword({ userName, password } = {}) {
    if (!userName || !password) return null;
    const passwordHash = await toHash(password);
    const user = await this.store.users.findOne({
      where: { userName },
    });

    if (user) {
      await user.update({
        password: passwordHash,
      });

      return user;
    }

    return null;
  }
}

module.exports = UserAPI;

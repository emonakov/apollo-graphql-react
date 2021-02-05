const { DataSource } = require('apollo-datasource');

class ItemAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getItems() {
    if (!this.context.user) {
      return null;
    }
    const res = await this.store.items.findAll({
      where: { userId: this.context.user.id },
    });

    return res;
  }

  async addItem({ title }) {
    if (!this.context.user) {
      return null;
    }
    const userId = this.context.user.id;
    const res = await this.store.items.findOrCreate({
      where: { userId, title },
    });

    return res && res.length ? res[0].get() : false;
  }

  async deleteItem({ itemId }) {
    const userId = this.context.user.id;

    return !!this.store.items.destroy({ where: { userId, id: itemId } });
  }
}

module.exports = ItemAPI;

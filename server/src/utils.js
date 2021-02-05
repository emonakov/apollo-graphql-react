const { Sequelize, Model } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './store.sqlite',
  logging: false,
});

module.exports.createStore = () => {

  const users = db.define('user', {
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
  });

  const items = db.define('item', {
    createdAt: Sequelize.DATE,
    title: Sequelize.STRING,
    userId: Sequelize.INTEGER,
  });

  return { db, users, items };
};

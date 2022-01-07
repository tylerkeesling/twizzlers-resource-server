'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Posts',
        'body',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        {
          transaction,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Posts',
        'body',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      ),
    ]);
  },
};

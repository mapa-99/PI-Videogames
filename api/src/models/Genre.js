const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define("Genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

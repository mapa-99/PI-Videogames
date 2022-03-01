const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define("genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

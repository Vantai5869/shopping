'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Invoice}) {
      this.hasMany(Invoice,{foreignKey:'invoiceId'})
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber:DataTypes.STRING,
    address:DataTypes.STRING,
    role:DataTypes.STRING,
    active :DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
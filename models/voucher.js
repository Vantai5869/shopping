'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Invoice}) {
      this.hasMany(Invoice,{foreignKey:'voucherId'})
    }
  };
  Voucher.init({
    voucherName: DataTypes.STRING,
    voucherPercent: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};
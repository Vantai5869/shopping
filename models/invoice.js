'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({InvoiceDetail, User, Voucher}) {
      this.hasMany(InvoiceDetail, {foreignKey:'invoiceId'});
      this.belongsTo(User, {foreignKey:'userId'});
      this.belongsTo(Voucher, {foreignKey:'voucherId'});
    }
  };
  Invoice.init({
    voucherId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Invoice}) {
      this.belongsTo(Product,{foreignKey:'productId'})
      this.belongsTo(Invoice,{foreignKey:'invoiceId'})
    }
  };
  InvoiceDetail.init({
    productId: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceDetail',
  });
  return InvoiceDetail;
};
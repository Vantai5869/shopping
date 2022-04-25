'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Sizes}) {
      this.belongsTo(Product, {foreignKey:'productId'})
      this.belongsTo(Sizes, {foreignKey:'sizeId'})
    }
  };
  ProductSize.init({
    productId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSize',
  });
  return ProductSize;
};
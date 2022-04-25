'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Brand, Product}) {
      this.belongsTo(Brand, { foreignKey: "brandId"});
      this.hasMany(Product,{foreignKey:"typeId"})
    }
  };
  Type.init({
    typeName: DataTypes.STRING,
    slug: DataTypes.STRING,
    brandId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};
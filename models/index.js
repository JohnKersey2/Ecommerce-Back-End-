const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
 foreignKey: 'category_id'
})

Category.hasMany(Product, {
  foreignKey: 'category_id'
})

Product.belongsToMany(Tag, {
  through: {
    foreignKey: 'product_id',
    model: ProductTag,
    unique: false
  },
  as: 'product_detail'
})

Tag.belongsToMany(Product, {
  through: {
    foreignKey: 'tag_id',
    model: ProductTag,
    unique: false
  },
  as: 'tag_detail'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
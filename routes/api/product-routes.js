const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', (req, res) => {
  try {
    Product.findAll()
      .then((searchResponse) => {
        res.json(searchResponse)
      })
  }
  catch (err) { res.json(err) }
});

// get one product by its id
router.get('/:id', (req, res) => {
  try {
    Product.findByPk(req.params.id)
      .then((searchResponse) => { res.json(searchResponse) })
  }
  catch (err) { res.json(err) }

});

// create new product
router.post('/', (req, res) => {
  try {
    Product.create(req.body)
      .then((product) => {
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
        res.status(200).json(product);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

// update product tags
router.put('/:id', (req, res) => {
  try {
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        return ProductTag.findAll({ where: { product_id: req.params.id } });
      })
      .then((productTags) => {
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      })
      .then((updatedProductTags) => res.json(updatedProductTags))
  }
  catch (err) {

    res.status(400).json(err);
  };
});

// delete one product by its id
router.delete('/:id', (req, res) => {
  try {
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.json(`Deleted product with id of ${req.params.id}`);
      })
  }
  catch (err) { res.json(err) };
});

module.exports = router;
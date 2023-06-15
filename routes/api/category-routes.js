const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories
router.get('/', (req, res) => {
  try {
    Category.findAll()
      .then((searchResponse) => {
        res.json(searchResponse);
      })
  }
  catch (err) { res.json(err) };
});

//find one category by its id
router.get('/:id', (req, res) => {
  try {
    Category.findByPk(req.params.id)
      .then((searchParams) => {
        res.json(searchParams)
      })
  }
  catch (err) { res.json(err) };
});

// create a new category
router.post('/', (req, res) => {
  /**
   *  create a new category
   *  req format:
   * @param {string} name - the name of the category that you are creating
   * {"category_name": "name"}
   */
  try {
    Category.create(req.body)
      .then(() => {
        res.json(`Created category ${req.body.category_name}`)
      })
  }
  catch (err) { res.json(err) };
});

// updata category by its id
router.put('/:id', (req, res) => {
  try {
    Category.update({
      category_name: req.body.category_name
    },
      {
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        res.json(`Updated category with id of ${req.params.id} to ${req.body.category_name}`);
      })
  }
  catch (err) { res.json(err) };
});

//delete a category by its id
router.delete('/:id', (req, res) => {
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.json(`Deleted category with id of ${req.params.id}`);
      })
  }
  catch (err) { res.json(err) };
});

module.exports = router;
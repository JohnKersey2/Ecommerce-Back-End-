const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
router.get('/', (req, res) => {
  try {
    Tag.findAll()
      .then((searchResponse) => {
        res.json(searchResponse)
      })
  }
  catch (err) { res.json(err) }
});

// find one tag by its id
router.get('/:id', (req, res) => {
  try {
    Tag.findByPk(req.params.id)
      .then((searchResponse) => {
        res.json(searchResponse)
      })
  }
  catch (err) { res.json(err) }
});

// create a new tag
router.post('/', (req, res) => {
  try {
    Tag.create(req.body)
      .then(() => {
        res.json(`Created tag '${req.body.tag_name}'`)
      })
  }
  catch (err) { res.json(err) }
});

//update tag by its id
router.put('/:id', (req, res) => {
  try {
    Tag.update({
      tag_name: req.body.tag_name
    },
      {
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        res.json(`Tag id ${req.params.id} updated to ${req.body.tag_name}`);
      })
  }
  catch (err) { res.json(err) }
});

// delete tag by its id
router.delete('/:id', (req, res) => {
  try {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.json(`Tag id ${req.params.id} deleted.`)
      })
  } catch (err) { res.json(err) }
});

module.exports = router;
const Category = require("../models/category");
const slugify = require("slugify");
const { dbErrorHandler } = require("../helpers/dbErrorHandler");

const create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  const category = new Category({ name, slug });
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json(data);
  });
};

const list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json(data);
  });
};

const read = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json(data);
  });
};

const remove = (req, res) => {
  const { slug } = req.params;
  Category.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json({ message: "Category deleted successfully" });
  });
};

module.exports = {
  create,
  list,
  read,
  remove
};

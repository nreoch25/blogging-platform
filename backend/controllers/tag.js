const Tag = require("../models/tag");
const slugify = require("slugify");
const { dbErrorHandler } = require("../helpers/dbErrorHandler");

const create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  const tag = new Tag({ name, slug });
  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json(data);
  });
};

const list = (req, res) => {
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json(data);
  });
};

const read = (req, res) => {
  const { slug } = req.params;
  Tag.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json(data);
  });
};

const remove = (req, res) => {
  const { slug } = req.params;
  Tag.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler(err) });
    }
    res.json({ message: "Tag deleted successfully" });
  });
};

module.exports = {
  create,
  list,
  read,
  remove
};

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.plugin(slug);

const Blog = new Schema(
  {
    author: ObjectId,
    name: { type: String, required: true },
    description: String,
    body: String,
    image: String,
    slug: { type: String, slug: 'name', unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Blog', Blog);

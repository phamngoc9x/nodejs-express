const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema(
  {
    author: ObjectId,
    name: { type: String, required: true },
    description: String,
    videoId: String,
    level: String,
    slug: { type: String, slug: 'name', unique: true },
  },
  { timestamps: true },
);

// add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model('Course', Course);

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const db = require('../../models/index');

const list = catchAsync(async (req, res) => {
  const posts = await db.Posts.findAll({ order: [['createdAt', 'DESC']] });
  res.status(httpStatus.OK).send(posts);
});

const create = catchAsync(async (req, res) => {
  const { title, description, body } = req.body;
  const { uid: userId, name: author } = req.jwt.claims;

  const post = await db.Posts.create({ userId, author, title, description, body });
  res.status(httpStatus.CREATED).send();
});

module.exports = {
  create,
  list,
};

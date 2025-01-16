const paginate = async (
  Model,
  filter,
  page,
  limit,
  sortField = "title",
  order = "asc"
) => {
  const skip = (page - 1) * limit;
  const sort = { [sortField]: order === "asc" ? 1 : -1 };

  const results = await Model.find(filter).skip(skip).limit(limit).sort(sort);

  const totalCount = await Model.countDocuments(filter);

  return {
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    results,
  };
};

module.exports = { paginate };

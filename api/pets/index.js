const delay = ms => new Promise(res => setTimeout(res, ms))

module.exports = async (req, res) => {
  const { pets } = require('../data')
  const currentPage = parseInt(req.query.currentPage || 0, 10)
  const perPage = 5;
  const startIndex = currentPage * perPage
  const hasMore = startIndex + perPage < pets.length
  await delay(500)
  res.json({
    pets: pets.slice(startIndex, startIndex + perPage),
    currentPage: parseInt(currentPage) + 1,
    perPage,
    hasMore,
  })
}

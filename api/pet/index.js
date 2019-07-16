const delay = ms => new Promise(res => setTimeout(res, ms))

module.exports = async (req, res) => {
  const { pets } = require('../data')
  const petId = req.query.id
  await delay(500)
  res.json(pets[petId])
}

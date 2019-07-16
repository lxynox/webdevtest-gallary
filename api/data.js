const path = require('path')
const fs = require('fs')

const json = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../assets/data/dogs.json'), 'utf8')
)
module.exports = {
  pets: json.dogs.map((dog, index) => ({ ...dog, id: index }))
}

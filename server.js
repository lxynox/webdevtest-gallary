const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const fallback = require('express-history-api-fallback')
const port = process.env.PORT || 3000

app.use(express.static(__dirname))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(
	'/api',
	(function api(router) {
		const delay = ms => new Promise(res => setTimeout(res, ms))
		const pets = JSON.parse(
			fs.readFileSync(path.join(__dirname, 'assets/data/dogs.json'), 'utf8')
		).dogs.map((dog, index) => ({...dog, id: index}))
		router.get('/pets', async (req, res) => {
      const currentPage = parseInt(req.query.currentPage || 0, 10)
      const perPage = 5;
      const startIndex = currentPage*perPage
      const hasMore = startIndex+perPage < pets.length
      await delay(500)
			res.json({
        pets: pets.slice(startIndex, startIndex+perPage),
        currentPage: parseInt(currentPage)+1,
        perPage,
        hasMore,
      })
		})
		router.get('/pets/:id', async (req, res) => {
			await delay(500)
			res.json(pets[req.params.id])
		})
		return router
	})(express.Router())
)
app.use(fallback('index.html', {root: __dirname}))

app.listen(port, () => {
	console.log(`server listening at port: ${port}`)
})

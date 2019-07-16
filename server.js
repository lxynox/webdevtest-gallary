const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
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
app.use('/pets', (req, res, next) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})
app.use('*', (req, res) => {
  res.status(404).sendFile('404.html', {root: path.join(__dirname, 'public')})
})

app.listen(port, () => {
	console.log(`server listening at port: ${port}`)
})

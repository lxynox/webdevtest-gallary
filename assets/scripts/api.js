const defaultOpts = { mode: 'cors',
  cache: 'no-cache',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const requester = (url, opts = {}) => fetch(url, {...defaultOpts, ...opts})
  .then(res => {
    if (!res.ok) return Promise.reject(res)
    return res
  })
  .then(res => res.json())

const api = {
	getPets: (query = {}) => {
    let search = ''
    if (Object.keys(query).length) {
      search = Object.keys(query).reduce((s, k) => s+k+'='+query[k], '?')
    }
    return requester(`/api/pets${search}`)
  },
  getPet: (id) => requester(`/api/pets/${id}`)
}

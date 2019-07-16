const render = () => {
	if (/\/pets\/(.*)/.test(location.pathname)) {
		const petId = location.pathname.split('/').pop()
		modalState = {...modalState, isOpen: true, currentPet: gallaryState.pets[petId]}
		if (modalState.currentPet == null) {
			modalState.isLoading = true
			api.getPet(petId).then(pet => {
				modalState.currentPet = pet
				modalState.isLoading = false
				renderModal(modalState)
			})
    }
		renderModal(modalState)
	} else {
		modalState = {...modalState, isOpen: false}
		renderModal(modalState)
	}
}

window.onpopstate = () => {
	render()
}

render()

api
	.getPets()
	.then(res => {
    gallaryState.pets = [...gallaryState.pets, ...res.pets]
    gallaryState.isLoading = false
    renderGallary(gallaryState)
    loadMoreState = {...loadMoreState, ...res}
    renderLoadMore(loadMoreState)
	})
	.catch(console.error)

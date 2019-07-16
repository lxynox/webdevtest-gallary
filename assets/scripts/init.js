const render = () => {
  /**
   * routing
   */
  if (/\/pets\/(.*)/.test(location.pathname)) {
    const petId = location.pathname.split('/').pop()
    modalState = {
      ...modalState,
      isOpen: true,
      currentPet: gallaryState.pets && gallaryState.pets[petId],
    }
    if (modalState.currentPet == null) {
      modalState.isLoading = true
      api
        .getPet(petId)
        .then(pet => {
          modalState.currentPet = pet
          modalState.isLoading = false
          renderModal(modalState)
        })
        .catch(console.error)
    }
    renderModal(modalState)
  } else {
    modalState = { ...modalState, isOpen: false }
    renderModal(modalState)
    if (gallaryState.pets == null) {
      gallaryState.isLoading = true
      api
        .getPets()
        .then(res => {
          if (!gallaryState.pets) gallaryState.pets = []
          gallaryState.pets = [...gallaryState.pets, ...res.pets]
          gallaryState.isLoading = false
          renderGallary(gallaryState)
          loadMoreState = { ...loadMoreState, ...res }
          renderLoadMore(loadMoreState)
        })
        .catch(console.error)
      renderGallary(gallaryState)
      renderLoadMore(loadMoreState)
    }
  }
}

window.onpopstate = () => {
  render()
}

render()

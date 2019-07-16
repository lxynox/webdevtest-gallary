let gallaryState = {pets: [], isLoading: true}

const gallary = document.querySelector('.gallary')
const spinnerContainer = document.createElement('div')
spinnerContainer.classList.add('spinner-container')
renderSpinner(spinnerContainer)

const renderGallary = ({pets, isLoading}) => {
  if (isLoading) {
    gallary.appendChild(spinnerContainer)
    return
  }
  if (spinnerContainer.parentNode === gallary) gallary.removeChild(spinnerContainer)
  const fragment = document.createDocumentFragment()
  pets.forEach(pet => {
    const li = document.createElement('li')
    li.classList.add('gallary-item')
    li.innerHTML = `<img src="${pet.image}" alt="puppy" />`
    li.addEventListener('click', () => {
      history.pushState({}, null, `/pets/${pet.id}`)
      modalState = {...modalState, isOpen: true, currentPet: pet, isLoading: false}
      renderModal(modalState)
    })
    fragment.appendChild(li)
  })
  gallary.appendChild(fragment)
}

renderGallary(gallaryState)

let gallaryState = { pets: null, isLoading: false }

const gallary = document.querySelector('.gallary')
const spinnerContainer = document.createElement('div')

const renderGallary = ({ pets, isLoading }) => {
  if (isLoading) {
    spinnerContainer.classList.add('spinner-container')
    renderSpinner(spinnerContainer)
    gallary.appendChild(spinnerContainer)
  } else {
    if (spinnerContainer.parentNode === gallary)
      gallary.removeChild(spinnerContainer)
    const fragment = document.createDocumentFragment()
    pets.forEach(pet => {
      const li = document.createElement('li')
      li.classList.add('gallary-item')
      li.innerHTML = `<img src="${pet.image}" alt="puppy" />`
      li.addEventListener('click', () => {
        history.pushState({}, null, `/pet/${pet.id}`)
        render()
      })
      fragment.appendChild(li)
    })
    gallary.appendChild(fragment)
  }
}

let modalState = { isOpen: false, currentPet: null, isLoading: false }

const modal = document.querySelector('.modal')
const modalCloser = document.querySelector('.modal-closer')
const modalOverlay = document.querySelector('.modal-overlay')
const modalContent = document.querySelector('.modal-content')
const modalSpinner = document.querySelector('.modal-spinner')

const renderModal = ({ isOpen, isLoading, currentPet }) => {
  if (isOpen) {
    modal.classList.add('is-visible')
    modalOverlay.classList.add('is-grayed')
    if (isLoading) {
      renderSpinner(modalSpinner)
      modalSpinner.classList.add('modal-spinner-fullsize')
    }
    else {
      modalSpinner.innerHTML = ''
      modalSpinner.classList.remove('modal-spinner-fullsize')
    }
    if (currentPet)
      modalContent.innerHTML = `<img src=${currentPet.image} />`
    else
      modalContent.innerHTML = ''
  } else {
    modal.classList.remove('is-visible')
    modalOverlay.classList.remove('is-grayed')
  }
}

modalCloser.addEventListener('click', () => {
  history.pushState({}, null, `/`)
  render();
})

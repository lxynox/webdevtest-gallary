let loadMoreState = {currentPage: 0, hasMore: false}

const loadMore = document.querySelector('.load-more')
const loadMoreBtn = document.querySelector('.load-more-btn')

const onLoadMoreClick = () => {
  gallaryState.isLoading = true
  api.getPets({currentPage: loadMoreState.currentPage}).then(res => {
    gallaryState.pets = [...gallaryState.pets, ...res.pets]
    gallaryState.isLoading = false
    renderGallary(res)
    loadMoreState = {...loadMoreState, ...res}
    renderLoadMore(res)
  })
}

const renderLoadMore = ({hasMore}) => {
  if (!hasMore) {
    loadMore.classList.add('hide')
    loadMoreBtn.removeEventListener('click', onLoadMoreClick)
  } else {
    loadMore.classList.remove('hide')
    loadMoreBtn.addEventListener('click', onLoadMoreClick)
  }
}

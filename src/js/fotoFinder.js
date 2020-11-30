import 'core-js';

import imgCard from '../templates/fotoSearch.hbs';
import ApiImages from './apiService';
import LoadMoreBtn from './load-more-btn';
import animateScrollTo from 'animated-scroll-to';
import { onOpenModal } from './modal';
import {
  errorMessage,
  emptyStringMessage,
  noPicturesAtAll,
} from './pnotifyMessages';

const refs = {
  search: document.querySelector('.js-search-form'),
  cardContainer: document.querySelector('.js-card-container'),
  imgGallery: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiImages = new ApiImages();

refs.search.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', fetchHits);
refs.imgGallery.addEventListener('click', onOpenModal);

async function onSearch(e) {
  e.preventDefault();
  clearImgContainer();
  apiImages.query = e.currentTarget.elements.query.value;
 
  try {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    apiImages.resetPage();
    fetchHits();

    if (apiImages.query === '') {
      return emptyStringMessage();
    }
  } catch (error) {
    errorMessage();
  }
}

function animateScroll() {
  const indexToScroll = 12 * (apiImages.page - 1) - 11;
  const itemToScroll = refs.imgGallery.children[indexToScroll];
  const options = {
    speed: 500,
    verticalOffset: -10,
  };

  animateScrollTo(itemToScroll, options);
}

async function fetchHits() {
  loadMoreBtn.disable();

  try {
    const response = await apiImages.fetchImages();
    if (response.length === 0) {
      noPicturesAtAll();
      animateScrollTo(0, options);
    } else if (response.length > 0) {
      imagesMurkup(response);

      loadMoreBtn.enable();
      animateScroll();
    }

    if (response.length < 12) {
      loadMoreBtn.hide();
    }
  } catch (error) {
    loadMoreBtn.hide();
  }
}

function imagesMurkup(hits) {
  refs.cardContainer.insertAdjacentHTML('beforeend', imgCard(hits));
}

function clearImgContainer() {
  refs.cardContainer.innerHTML = '';
}
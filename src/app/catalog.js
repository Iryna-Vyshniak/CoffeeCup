import { createClient } from 'pexels';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.header__menu-btn');
const searchbox = document.querySelector('[data-input]');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

// Sets the nav and menuBtn.
// Add click event listener to the menu. Toggle the active and active state of the menu.
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  nav.classList.toggle('active');
});

function renderMarkup(items) {
  return items.reduce(
    (acc, { alt, src: { large, large2x } }) =>
      (acc += `<a class="gallery__item" href="${large2x}">
    <img
      class="gallery__image"
      src="${large}"
      alt="${alt}"
    />
  </a>`),
    ''
  );
}

function setTitleImages(value) {
  const API_KEY = 'nK8dQ9g0n9ztLpNfMUyyoRWjFaSsbPf5sCCcMrST8otmYHlyeXOtDq1p';
  const client = createClient(API_KEY);
  let query = 'Sun Coffee';

  client.photos
    .search({ query, per_page: 40 })
    .then(({ photos }) => {
      // console.log(photos);
      // console.log(renderMarkup(photos));
      return renderMarkup(photos);
    })
    .then(data => {
      galleryContainer.innerHTML = data;
      lightbox.refresh();
    })
    .catch(err => console.log(err));
}

setTitleImages();

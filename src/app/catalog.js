import { createClient } from 'pexels';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

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
  let query = 'Coffee';

  client.photos
    .search({ query, per_page: 40 })
    .then(({ photos }) => {
      console.log(photos);
      console.log(renderMarkup(photos));
      return renderMarkup(photos);
    })
    .then(data => (galleryContainer.innerHTML = data))
    .catch(err => console.log(err));
}

setTitleImages();

const lightbox = new SimpleLightbox('.gallery a', {
  closeText: 'x',
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

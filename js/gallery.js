import { images } from './img.js';

const galleryEl = document.querySelector('.gallery');

let handleKeyPress;
galleryEl.innerHTML = images.reduce(
  (html, image) =>
    html +
    `
    <li class="gallery-item">
     <a
          class="gallery-link"
          href="${image.original}"
        >
          <img
            class="gallery-img"
            src="${image.preview}"
            data-source="${image.original}"
            alt="${image.description}"
          />
        </a>
      </li>
`,
  ''
);

galleryEl.addEventListener('click', event => {
  event.preventDefault();
  const normalSizeImg = event.target.dataset.source;

    // console.log(normalSizeImg);
  if (normalSizeImg) {
    const originImg = normalSizeImg;

    const modal = basicLightbox.create(
      `
    <img src="${originImg}">
`,
      {
        onShow: instance => {
          const handleKeyPress = event => {
            if (event.key === 'Escape') {
              instance.close();
            }
          };

          document.addEventListener('keydown', handleKeyPress);

          instance.element().addEventListener('click', event => {
            if (event.target.tagName === 'IMG') {
              return;
            }
            instance.close();
          });
        },
        onClose: instance => {
          document.removeEventListener('keydown', handleKeyPress);
        },
      }
    );

    modal.show();
  }
});

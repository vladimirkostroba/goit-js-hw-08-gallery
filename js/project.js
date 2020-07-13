import images from './gallery-items.js';

const refs = {
  ul: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  img: document.querySelector('.lightbox__image'),
  button: document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__content'),
};

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const renderGallery = images => {
  const galleryRef = images.map(el => {
    const gallItemRef = document.createElement('li');
    gallItemRef.classList.add('gallery__item');

    const gallLinkRef = document.createElement('a');
    gallLinkRef.classList.add('gallery__link');
    gallLinkRef.setAttribute('href', el.original);
    gallItemRef.append(gallLinkRef);

    const gallImgRef = document.createElement('img');
    gallImgRef.classList.add('gallery__image');
    gallImgRef.setAttribute('src', el.preview);
    gallImgRef.setAttribute('data-source', el.original);
    gallImgRef.setAttribute('alt', el.description);
    gallLinkRef.append(gallImgRef);

    return gallItemRef;
  });

  refs.ul.append(...galleryRef);
};

renderGallery(images);

// делигирование

refs.ul.addEventListener('click', onIMGclick);

function onIMGclick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.modal.classList.add('is-open'); //открытие модального окна

  refs.img.src = event.target.dataset.source; // подмена src
}

// Закрытие модального окна по клику на кнопку

refs.button.addEventListener('click', closeModal);

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.img.src = ''; // Очистка значения атрибута src элемента img.lightbox__image
}

// // закрытие по клику на lightbox__overlay

refs.overlay.addEventListener('click', clickOverlay);

function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

// закрытие по нажатию на Escape

window.addEventListener('keydown', onPressKey);
function onPressKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'ArrowRight' || 'ArrowLeft') {
    slider(event.key);
  }

  if (event.key === 'ArrowDown' || 'ArrowUp') {
    slider(event.key);
  }
}

// переключение картинок влево/вправо

function slider(key) {
  let imgIndex;

  const index = images.findIndex(image => image.original === refs.img.src);

  if (index === -1) {
    return;
  }

  if (key === 'ArrowRight' || 'ArrowDown') {
    nextImg();
  }

  if (key === 'ArrowLeft' || 'ArrowUp') {
    prevImg();
  }

  refs.img.src = images[imgIndex].original;

  function nextImg() {
    if (images.length === index + 1) {
      imgIndex = 0;
    } else {
      imgIndex = index + 1;
    }
  }

  function prevImg() {
    if (index === 0) {
      imgIndex = images.length - 1;
    } else {
      imgIndex = index - 1;
    }
  }
}

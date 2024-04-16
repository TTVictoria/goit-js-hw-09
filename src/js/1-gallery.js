console.log(Gallery);

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryList = document.querySelector('.gallery');

const fragment = document.createDocumentFragment();

images.forEach(img => {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery-item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery-link');
  galleryLink.href = img.original;

  const image = document.createElement('img');
  image.classList.add('gallery-image');
  image.src = img.preview;
  image.alt = img.description;

  galleryLink.appendChild(image);
  listItem.appendChild(galleryLink);
  fragment.appendChild(listItem);
});

galleryList.appendChild(fragment);

let galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const feedbackForm = document.querySelector('.feedback-form');
const emailForm = document.querySelector('[name="email"]');
const messageForm = document.querySelector('[name="message"]');

function loadSavedData() {
  const savedFeedback = localStorage.getItem('feedback-form-state');
  if (savedFeedback) {
    try {
      const parsedFeedback = JSON.parse(savedFeedback);
      emailForm.value = parsedFeedback.email;
      messageForm.value = parsedFeedback.message;
    } catch (error) {
      console.error('Error parsing saved feedback:', error);
    }
  }
}

function validateFields() {
  return emailForm.value.trim() !== '' && messageForm.value.trim() !== '';
}

function saveDataToLocalStorage() {
  const email = emailForm.value.trim();
  const message = messageForm.value.trim();

  const dataInput = {
    email: email,
    message: message,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(dataInput));
}

feedbackForm.addEventListener('input', event => {
  saveDataToLocalStorage();
});

document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  if (validateFields()) {
    const submittedEmail = emailForm.value.trim();
    const submittedMessage = messageForm.value.trim();

    console.log({
      email: submittedEmail,
      message: submittedMessage,
    });

    emailForm.value = '';
    messageForm.value = '';

    localStorage.removeItem('feedback-form-state');
  } else {
    console.error('Please fill in all fields.');
  }
});
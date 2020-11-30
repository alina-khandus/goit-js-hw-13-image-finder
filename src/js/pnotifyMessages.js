import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function errorMessage() {
  error({
    title: 'Что-то пошло не так',
    text: 'Мы над этим работаем',
    delay: 5000,
    closerHover: true,
  });
}

function noMorePicturesLeft() {
  info({
    title: 'Картинок больше нет',
    text: 'Введите другой запрос',
    delay: 5000,
    closerHover: true,
  });
}

function emptyStringMessage() {
  info({
    title: 'Нет информации',
    text: 'Мы что-нибудь подберерем',
    delay: 5000,
    closerHover: true,
  });
}

function noPicturesAtAll() {
  info({
    title: 'Нет в поиске',
    text: 'Введите другой запрос',
    delay: 5000,
    closerHover: true,
  });
}

export {
  errorMessage,
  noMorePicturesLeft,
  emptyStringMessage,
  noPicturesAtAll,
};
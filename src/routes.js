const { addBookHandler, getBooksHandler, getBookByIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{booId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: () => {

    },
  },
  {
    methode: 'DELETE',
    path: '/books/{bookId}',
    handler: () => {

    },
  },
];

module.exports = routes;

const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  /** undefined name */
  if (name === undefined || `${name}` === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  /** readPage bigger than pagecount */
  if (`${readPage}` > `${pageCount}`) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  /** Check if book success */
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

/** Get BookS */
const getBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const readingV = reading === '1';
  const finishedV = finished === '1';

  const keys = ['id', 'name', 'publisher'];

  // eslint-disable-next-line array-callback-return, no-bitwise, max-len
  if (`${name}` !== 'undefined') {
    // eslint-disable-next-line max-len
    const book = books.filter((b) => (b.name.toString().toLowerCase() === (name.toLowerCase()))).map((el) => keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {}));
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    return response;
  }

  if (`${reading}` !== 'undefined') {
    // eslint-disable-next-line max-len
    const book = books.filter((b) => b.reading === readingV).map((el) => keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {}));

    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    return response;
  }

  if (`${finished}` !== 'undefined') {
    // eslint-disable-next-line max-len
    const book = books.filter((b) => b.finished === finishedV).map((el) => keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {}));

    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    return response;
  }

  const book = books.filter((b) => b.name !== undefined).map((el) => keys.reduce((acc, key) => {
    acc[key] = el[key];
    return acc;
  }, {}));

  const response = h.response({
    status: 'success',
    data: {
      book,
    },
  });
  return response;
};

/** GET BOOK BY ID */
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (`${book}` !== 'undefined') {
    return {
      status: 'success',
      message: 'Without query',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (`${name}` === 'undefined' || `${name}` === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbaharui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'agal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toDateString();

  const index = books.findIndex((n) => n.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbaharui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const idx = books.findIndex((b) => b.id === bookId);

  if (idx !== -1) {
    books.splice(idx, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    messages: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};

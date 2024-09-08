import mongoose from 'mongoose';
import request from 'supertest';
import BooksRoute from '../routes/books.route';
import App from '../app';
import { CreateBookDto } from '@dtos/books.dto';

beforeAll(async () => {
  jest.setTimeout(10000);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing books', () => {
  describe('[GET] /books', () => {
    it('response findAll books', async () => {
      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.Books;

      books.find = jest.fn().mockReturnValue([
        { title: 'Book 1', isbn: '1234567890', price: 20, author: 'Author 1', category: 'Fiction' },
        { title: 'Book 2', isbn: '0987654321', price: 25, author: 'Author 2', category: 'Non-Fiction' },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);

      return request(app.getServer()).get(`${booksRoute.path}`).expect(200);
    });
  });

  describe('[GET] /books/:id', () => {
    it('response findOne book', async () => {
      const bookId = '60706478aad6c9ad19a31c84';

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.Books;

      books.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        title: 'Book 2',
        isbn: '0987654321',
        price: 25,
        author: 'Author 2',
        category: 'Non-Fiction',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}/${bookId}`).expect(200);
    });
  });

  describe('[POST] /books', () => {
    it('response Create book', async () => {
      const bookData: CreateBookDto = {
        title: 'Book 2',
        isbn: '0987654321',
        price: 25,
        author: 'Author 2',
      };

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.Books;

      books.findOne = jest.fn().mockReturnValue(null);
      books.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        title: 'Book 2',
        isbn: '0987654321',
        price: 25,
        author: 'Author 2',
        category: 'Non-Fiction',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).post(`${booksRoute.path}`).send(bookData).expect(201);
    });
  });

  describe('[PUT] /books/:id', () => {
    it('response Update book', async () => {
      const bookId = '60706478aad6c9ad19a31c84';
      const bookData: CreateBookDto = {
        title: 'Updated Book 2',
        isbn: '0987654322',
        price: 40,
        author: 'Author 5',
      };

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.Books;

      books.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: bookId,
        title: 'Updated Book 2',
        isbn: '0987654322',
        price: 40,
        author: 'Author 5',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).put(`${booksRoute.path}/${bookId}`).send(bookData);
    });
  });

  describe('[DELETE] /books/:id', () => {
    it('response Delete book', async () => {
      const bookId = '60706478aad6c9ad19a31c84';

      const booksRoute = new BooksRoute();
      const books = booksRoute.booksController.bookService.Books;

      books.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        title: 'Updated Book 2',
        isbn: '0987654322',
        price: 40,
        author: 'Author 5',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([booksRoute]);
      return request(app.getServer()).delete(`${booksRoute.path}/${bookId}`).expect(200);
    });
  });
});

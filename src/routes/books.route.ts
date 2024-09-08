import { Router } from 'express';
import BooksController from '@controllers/books.controller';
import { CreateBookDto, UpdateBookDto, UpdateV2BookDto } from '@dtos/books.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public booksController = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.booksController.getBooks);
    this.router.get(`${this.path}/:idOrIsbn`, authMiddleware, this.booksController.getBookByIdOrIsbn);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateBookDto, 'body'), this.booksController.createBook);
    this.router.put(`${this.path}/:idOrIsbn`, authMiddleware, validationMiddleware(UpdateBookDto, 'body', true), this.booksController.updateBook);
    this.router.delete(`${this.path}/:idOrIsbn`, authMiddleware, this.booksController.deleteBook);

    this.router.put(
      `/v2${this.path}/:idOrIsbn`,
      authMiddleware,
      validationMiddleware(UpdateV2BookDto, 'body', true),
      this.booksController.updateV2Book,
    );
  }
}

export default BooksRoute;

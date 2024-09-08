import { NextFunction, Request, Response } from 'express';
import { CreateBookDto, UpdateV2BookDto } from '@dtos/books.dto';
import { Book } from '@interfaces/books.interface';
import BookService from '@services/books.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import mongoose from 'mongoose';

class BooksController {
  public bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const limit = parseInt(req.query.limit as string) || 100; // Default limit 100

      // Validate pagination parameters
      if (page < 1 || limit < 1) {
        return res.status(400).json({ message: 'Page and limit must be positive integers' });
      }

      const findAllBooksData: Book[] = await this.bookService.findAllBooks({ limit, page });

      res.status(200).json({ data: findAllBooksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookByIdOrIsbn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idOrIsbn: string = req.params.idOrIsbn;

      const searchQuery = mongoose.Types.ObjectId.isValid(idOrIsbn) ? { _id: idOrIsbn } : { isbn: idOrIsbn };

      const findOneBookData: Book = await this.bookService.findBook(searchQuery);
      const { discount, price } = findOneBookData;

      const discountedPrice = discount ? price - price * (discount / 100) : undefined;

      res.status(200).json({ ...findOneBookData, discountedPrice });

      res.status(200).json({ data: findOneBookData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const BookData: CreateBookDto = req.body;
      const createBookData: Book = await this.bookService.createBook(BookData);

      res.status(201).json({ data: createBookData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idOrIsbn: string = req.params.idOrIsbn;

      const searchQuery = mongoose.Types.ObjectId.isValid(idOrIsbn) ? { _id: idOrIsbn } : { isbn: idOrIsbn };

      const bookData: CreateBookDto = req.body;

      const updateBookData: Book = await this.bookService.updateBook(searchQuery, bookData);

      res.status(200).json({ data: updateBookData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idOrIsbn: string = req.params.idOrIsbn;

      const searchQuery = mongoose.Types.ObjectId.isValid(idOrIsbn) ? { _id: idOrIsbn } : { isbn: idOrIsbn };

      await this.bookService.deleteBook(searchQuery);

      res.status(200).json({ data: null, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateV2Book = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idOrIsbn: string = req.params.idOrIsbn;

      const searchQuery = mongoose.Types.ObjectId.isValid(idOrIsbn) ? { _id: idOrIsbn } : { isbn: idOrIsbn };

      const bookData: UpdateV2BookDto = req.body;

      const updateBookData: Book = await this.bookService.updateV2Book(searchQuery, bookData);

      res.status(200).json({ data: updateBookData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;

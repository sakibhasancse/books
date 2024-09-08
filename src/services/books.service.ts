import { CreateBookDto, UpdateV2BookDto } from '@dtos/books.dto';
import { HttpException } from '@exceptions/HttpException';
import { Book } from '@interfaces/books.interface';
import BookModel from '@models/books.model';
import { isEmpty } from '@utils/util';
import CategoryModel from '@/models/categories.model';
import { Types } from 'mongoose';
import { PaginationParams } from '@/interfaces/paginations.interface';

class BookService {
  public Books = BookModel;
  public Category = CategoryModel;

  public async findAllBooks({ page, limit }: PaginationParams): Promise<Book[]> {
    // Calculate the skip value based on page and limit
    const skip = (page - 1) * limit;

    return this.Books.find().skip(skip).limit(limit).exec();
  }

  public async findBookById(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, 'bookId is empty');

    const findBook: Book = await this.Books.findOne({ _id: bookId });
    if (!findBook) throw new HttpException(404, "Book doesn't exist");

    return findBook;
  }

  public async findBook(query: { _id?: string; isbn?: string }): Promise<Book> {
    const findBook: Book = (await this.Books.findOne(query)).toJSON();
    if (!findBook) throw new HttpException(404, "Book doesn't exist");

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    if (bookData.category) {
      if (!Types.ObjectId.isValid(bookData.category)) throw new HttpException(404, 'Invalid category id');

      const hasCategory = await this.Category.findById(bookData.category);
      if (!hasCategory) throw new HttpException(404, "Category doesn't exist");
    }

    const createBookData: Book = await this.Books.create({ ...bookData });

    return createBookData;
  }

  public async updateBook(query: { _id?: string; isbn?: string }, bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    if (bookData.category) {
      if (!Types.ObjectId.isValid(bookData.category)) throw new HttpException(404, 'Invalid category id');

      const hasCategory = await this.Category.findById(bookData.category);
      if (!hasCategory) throw new HttpException(404, "Category doesn't exist");
    }

    const updateBook: Book = await this.Books.findOneAndUpdate(query, { ...bookData });
    if (!updateBook) throw new HttpException(404, "Book doesn't exist");

    return await this.Books.findById(updateBook._id);
  }

  public async deleteBook(query: { _id?: string; isbn?: string }): Promise<Book> {
    const deleteBook: Book = await this.Books.findOneAndRemove(query);
    if (!deleteBook) throw new HttpException(404, "Book doesn't exist");

    return deleteBook;
  }

  public async updateV2Book(query: { _id?: string; isbn?: string }, bookData: UpdateV2BookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    if (bookData.category) {
      if (!Types.ObjectId.isValid(bookData.category)) throw new HttpException(404, 'Invalid category id');

      const hasCategory = await this.Category.findById(bookData.category);
      if (!hasCategory) throw new HttpException(404, "Category doesn't exist");
    }

    const updateBook: Book = await this.Books.findOneAndUpdate(query, { ...bookData });
    if (!updateBook) throw new HttpException(404, "Book doesn't exist");

    return await this.Books.findById(updateBook._id);
  }
}

export default BookService;

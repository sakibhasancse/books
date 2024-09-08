import { model, Schema, Document } from 'mongoose';
import { Book } from '@interfaces/books.interface';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^(97(8|9))?\d{9}(\d|X)$/.test(v); // ISBN-10 or ISBN-13 validation
        },
        message: props => `${props.value} is not a valid ISBN format!`,
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      version: '0.2',
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    reviews: [
      {
        reviewer: String,
        comment: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
  },
  { timestamps: true },
);

const bookModel = model<Book & Document>('Book', bookSchema);

export default bookModel;

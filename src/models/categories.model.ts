import { model, Schema, Document } from 'mongoose';
import { Category } from '@interfaces/categories.interface';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
  },
  { timestamps: true },
);

const CategoryModel = model<Category & Document>('Category', CategorySchema);

export default CategoryModel;

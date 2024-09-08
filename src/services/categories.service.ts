import { CreateCategoryDto } from '@/dtos/categories.dto';
import { HttpException } from '@exceptions/HttpException';
import { Category } from '@interfaces/categories.interface';
import CategoryModel from '@models/categories.model';
import { isEmpty } from '@utils/util';

class CategoryService {
  public Category = CategoryModel;

  public async findAllCategory(): Promise<Category[]> {
    const Category: Category[] = await this.Category.find();
    return Category;
  }

  public async findCategoryById(CategoryId: string): Promise<Category> {
    if (isEmpty(CategoryId)) throw new HttpException(400, 'CategoryId is empty');

    const findCategory: Category = await this.Category.findOne({ _id: CategoryId });
    if (!findCategory) throw new HttpException(404, "Category doesn't exist");

    return findCategory;
  }

  public async createCategory(CategoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(CategoryData)) throw new HttpException(400, 'CategoryData is empty');

    const createCategoryData: Category = await this.Category.create({ ...CategoryData });

    return createCategoryData;
  }

  public async updateCategory(categoryId: string, CategoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(CategoryData)) throw new HttpException(400, 'CategoryData is empty');

    const updateCategoryById: Category = await this.Category.findByIdAndUpdate(categoryId, { CategoryData });
    if (!updateCategoryById) throw new HttpException(404, "Category doesn't exist");

    return updateCategoryById;
  }

  public async deleteCategory(categoryId: string): Promise<Category> {
    const deleteCategoryById: Category = await this.Category.findByIdAndDelete(categoryId);
    if (!deleteCategoryById) throw new HttpException(404, "Category doesn't exist");

    return deleteCategoryById;
  }
}

export default CategoryService;

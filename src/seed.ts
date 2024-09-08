import mongoose, { connect } from 'mongoose';
import userModel from './models/users.model';
import CategoryModel from './models/categories.model';
import bookModel from './models/books.model';
import { dbConnection } from './databases';
import dotenv from 'dotenv';
import { hash } from 'bcrypt';

dotenv.config(); // Load environment variables

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    console.log('Connecting to', dbConnection.url);
    await connect(process.env.MONGODB_DATABASE_URL || 'mongodb://root:dev@localhost:27018/admin');
    console.log('Connected to database');
  } catch (error) {
    console.error('Error in database connection:', error);
    throw error;
  }
}

const seed = async () => {
  try {
    console.log('Started seeding process');
    await connectToDatabase();
    await userModel.deleteMany();
    await CategoryModel.deleteMany();
    await bookModel.deleteMany();

    // Seed users
    const users = await userModel.insertMany([
      { username: 'admin', email: 'admin@example.com', password: await hash('admin123', 10) },
      { username: 'john_doe', email: 'john@example.com', password: await hash('password123', 10) },
    ]);
    console.log(`Users seeded: ${users.length}`);

    // Seed categories
    const categories = await CategoryModel.insertMany([{ name: 'Fiction' }, { name: 'Non-Fiction' }, { name: 'Science' }, { name: 'History' }]);
    console.log(`Categories seeded: ${categories.length}`);

    // Fetch category IDs by name for assigning to books
    const categoryMap: { [key: string]: mongoose.Types.ObjectId } = {};
    categories.forEach(category => {
      categoryMap[category.name] = category._id;
      console.log(category.name, category._id);
    });

    // Seed books with reference to category IDs
    const books = await bookModel.insertMany([
      {
        title: 'The Great Gatsby',
        isbn: '9780743273565',
        price: 10.99,
        author: 'F. Scott Fitzgerald',
        category: categoryMap['Fiction'], // Reference by ID
        review: 'A classic novel set in the 1920s.',
      },
      {
        title: 'A Brief History of Time',
        isbn: '9780553380163',
        price: 15.99,
        author: 'Stephen Hawking',
        category: categoryMap['Science'], // Reference by ID
        review: 'A landmark volume in science writing.',
        discount: 10, // 10% discount
      },
      {
        title: 'Sapiens: A Brief History of Humankind',
        isbn: '9780062316097',
        price: 19.99,
        author: 'Yuval Noah Harari',
        category: categoryMap['History'], // Reference by ID
        review: 'Explores the history and impact of Homo sapiens.',
      },
    ]);

    console.log(`Books seeded: ${books.length}`);

    // Disconnect from the database after seeding
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error during seeding:', error);
    // Ensure disconnection in case of errors
    await mongoose.disconnect();
  }
};

// Run the seed function
seed();

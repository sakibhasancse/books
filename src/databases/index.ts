import { MONGODB_DATABASE_URL } from '@config';

export const dbConnection = {
  url: MONGODB_DATABASE_URL || `mongodb://root:dev@mongo:27017/admin`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

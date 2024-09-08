import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '@config';

export const dbConnection = {
  url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  // `mongodb://root:dev@mongo:27017/admin`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

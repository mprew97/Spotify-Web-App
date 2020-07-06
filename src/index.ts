import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import itemsRouter from './server/items/items.router';
import errorHandler from './server/middleware/error.middleware';
import notFoundHandler from './server/middleware/not-found.middleware';

const dotenv = require('dotenv');

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/items', itemsRouter);
app.use(express.static('src/client'));
app.use(errorHandler);
app.use(notFoundHandler);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}

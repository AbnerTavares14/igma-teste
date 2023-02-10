import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import HandlerError from './middlewares/handleErrorMiddleware.js';

class App {
    public app: express.Application;

    public constructor() {
        this.app = express();
        this.middlewares();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(router);
        this.app.use(HandlerError);
    }

}

export default new App().app;
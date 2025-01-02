import * as session from 'express-session';
import { Injectable, NestMiddleware } from '@nestjs/common';

const FileStore = require('session-file-store')(session);

const fileStoreOptions = {};

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    session({
      store: new FileStore(fileStoreOptions),
      secret: 'aP9vB7xQ3sT6zL1mN8wK4jR5uY2eH0oG', // Its a random string value
      resave: false,
      saveUninitialized: false,
      rolling: false, // Prevents regeneration on every request
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, // 1 hour
      },
    })(req, res, next);
  }
}

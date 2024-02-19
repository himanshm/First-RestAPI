import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import todoRoutes from './routes/todos';

const app = express();

// Connect routes to our running Express application by using app.use, and then let's say we want to forward all requests that start with /todos to our todoRoutes,

// To make sure that the body we're trying to extract in controllers actually exists. And for that here in app.ts, we need to parse the bodies of incoming requests.
app.use(json());
// So this is middleware provided by a third-party package which will parse the bodies of all incoming requests and extract any JSON data it finds in there to then populate the body key on this request object with that parsed JSON data.

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(8080);

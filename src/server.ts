import express from 'express';
import cors from 'cors';

import connectDB from './config/db';
import usersRouter from './users/routes';

const app = express();
import routes from './routes'
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bem-vindo')
});

app.use('/api', routes)


app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`);
});

export default app;


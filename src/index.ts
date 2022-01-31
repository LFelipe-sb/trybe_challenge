import { app } from './app';

process.env.NODE_ENV = 'dev';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running'));

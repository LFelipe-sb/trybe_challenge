import { createConnection } from 'typeorm';

// Valores do arquivo ormconfig são apenas exemplo, serão substituídos por TYPEORM_* env vars
createConnection().then(() => console.log('connected with database'));
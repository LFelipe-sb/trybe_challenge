import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  // Valores do arquivo ormconfig são apenas exemplo, serão substituídos por TYPEORM_* env vars
  if(process.env.NODE_ENV === 'test') { 
    Object.assign(defaultOptions, {
      "type": "sqlite",
      "database": "./__tests__/database/trybe_challenge.db",
      "synchronize": true,
      "entities": ["src/app/entities/*.ts"],
      "migrationsTableName": "custom_migration_table",
      "migrations": ["src/database/migrations/*.ts"],
      "cli": {
          "migrationsDir": "src/database/migrations"
      }
    })  
  }

  return createConnection();
};

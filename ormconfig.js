// Valores ilustrativos que serão substituidos pelo .env
if(process.env.NODE_ENV.trim() == 'dev') {
  return module.exports = {
    "type": process.env.TYPEORM_CONNECTION_DEV || "postgres",
    "host": process.env.TYPEORM_HOST_DEV || "localhost",
    "port": process.env.TYPEORM_PORT_DEV || 5432,
    "username": process.env.TYPEORM_USERNAME_DEV || "postgres",
    "password": process.env.TYPEORM_PASSWORD_DEV || "postgres",
    "database": process.env.TYPEORM_DATABASE_DEV || "trybe_challenge",
    "entities": [process.env.TYPEORM_ENTITIES_DEV || "src/app/entities/*.ts"],
    "migrationsTableName": process.env.TYPEORM_MIGRATION_TABLE_DEV || "custom_migration_table",
    "migrations": [process.env.TYPEORM_MIGRATION_DEV || "src/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": process.env.TYPEORM_MIGRATION_DIR_DEV || "src/database/migrations"
    }
  }
}

if(process.env.NODE_ENV.trim() == 'production') {
  return module.exports = {
    "type": process.env.TYPEORM_CONNECTION_PRODUCTION || "postgres",
    "host": process.env.TYPEORM_HOST_PRODUCTION || "localhost",
    "port": process.env.TYPEORM_PORT_PRODUCTION || 5432,
    "username": process.env.TYPEORM_USERNAME_PRODUCTION || "postgres",
    "password": process.env.TYPEORM_PASSWORD_PRODUCTION || "postgres",
    "database": process.env.TYPEORM_DATABASE_PRODUCTION || "trybe_challenge",
    "ssl": { rejectUnauthorized: false },
    "entities": [process.env.TYPEORM_ENTITIES_PRODUCTION || "./dist/src/app/entities/*.js"],
    "migrationsTableName": process.env.TYPEORM_MIGRATION_TABLE_PRODUCTION || "custom_migration_table",
    "migrations": [process.env.TYPEORM_MIGRATION_PRODUCTION || "./dist/src/database/migrations/*.js"],
    "cli": {
        "migrationsDir": process.env.TYPEORM_MIGRATION_DIR_PRODUCTION || "./dist/src/database/migrations"
    }
  }
}

if(process.env.NODE_ENV.trim() == 'test') {
  return module.exports = {
    "type": process.env.TYPEORM_CONNECTION_TESTS || "sqlite",
    "database": process.env.TYPEORM_DATABASE_TESTS || "./src/database/trybe_challenge.db",
    "synchronize": true,
    "entities": [process.env.TYPEORM_ENTITIES_TESTS || "src/app/entities/*.ts"],
    "migrationsTableName": process.env.TYPEORM_MIGRATION_TABLE_TESTS || "custom_migration_table",
    "migrations": [process.env.TYPEORM_MIGRATION_TESTS || "src/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": process.env.TYPEORM_MIGRATION_DIR_TESTS || "src/database/migrations"
    }
  }
}

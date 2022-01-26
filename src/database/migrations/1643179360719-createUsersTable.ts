import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1643179360719 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
            {
                name: 'displayName',
                type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
                isUnique: true,
            },
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'image',
                type: 'varchar',
            },
        ],
        }));
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}

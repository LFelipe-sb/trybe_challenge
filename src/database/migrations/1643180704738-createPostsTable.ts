import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPostsTable1643180704738 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
        name: 'posts',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
            {
                name: 'title',
                type: 'varchar',
            },
            {
                name: 'content',
                type: 'varchar',
            },
            {
                name: 'userId',
                type: 'uuid',
            },
            {
                name: 'published',
                type: 'timestamp',
                default: 'now()'
            },
            {
                name: 'uptaded',
                type: 'timestamp',
                default: 'now()'
            },
        ],
        foreignKeys: [
            {
                name: 'fk_user_posts',
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id']
            }
        ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Database.ts1749800922864 implements MigrationInterface {
    name = 'Database.ts1749800922864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "image"`);
    }

}

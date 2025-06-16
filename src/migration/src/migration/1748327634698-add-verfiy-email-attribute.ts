import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddVerfiyEmailAttribute1748327634698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'users',
          new TableColumn({
            name: 'isVerified',
            type: 'boolean',
            isNullable: false,
            default: false,
          })
        );

        await queryRunner.addColumn(
          'posts',
          new TableColumn({
            name: 'image',
            type: 'string',
            isNullable: true,
          })
        )
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'isVerified');
      }

}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnIsReviewerInUsers1637768910393
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'is_reviewer',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'is_reviewer');
  }
}

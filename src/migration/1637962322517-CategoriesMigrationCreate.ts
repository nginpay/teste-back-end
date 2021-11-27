import {MigrationInterface, QueryRunner} from "typeorm";

export class CategoriesMigrationCreate1637962322517 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nome varchar(220) NOT NULL,
                imagem varchar(250) NOT NULL,
                createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`
        );
    }
    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`); // reverts things made in "up" method
    }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductsMigrationCreate1637962307154 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "products" (
                id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nome varchar(220) NOT NULL,
                idcateg int(11) NOT NULL,
                imagem varchar(250) NOT NULL,
                createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`
        );
    }
    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`); // reverts things made in "up" method
    }
}

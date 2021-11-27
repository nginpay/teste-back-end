import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersMigrationCreate1637959788992 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nome varchar(220) NOT NULL,
                email varchar(520) NOT NULL,
                senha varchar(250) NOT NULL,
                createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`
        );
    }
    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`); // reverts things made in "up" method
    }
}

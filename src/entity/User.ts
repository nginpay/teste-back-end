import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    email: string;
    @Column()
    senha: string;

    hashPassword() {
        this.senha = bcrypt.hashSync(this.senha, 8);
      }
}


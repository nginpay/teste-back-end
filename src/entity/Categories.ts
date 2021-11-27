import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    imagem: string;
}


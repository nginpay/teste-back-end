import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    idcateg: string;
    @Column()
    nome: string;
    @Column()
    imagem: string;
}


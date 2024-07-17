import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FileEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	filename: string

	@Column()
	imgUrl: string

}
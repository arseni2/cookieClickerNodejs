import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class CardEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	cookiePerHour: number

	@Column()
	price: number
}
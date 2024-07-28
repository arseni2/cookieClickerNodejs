import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";

@Entity("Task")
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column({nullable: true})
	imgUrl?: string

	@Column()
	cookie: number

	@ManyToMany(() => UserEntity)
	@JoinTable({name: "UserCompletedTask"}) // Это необходимо для создания таблицы соединений
	usersCompletedTaskIds: UserEntity[];

}
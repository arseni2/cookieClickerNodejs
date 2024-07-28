import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {FileEntity} from "../../file/file.entity";

@Entity("Community")
export class CommunityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @OneToOne(() => UserEntity, (user) => user.myCommunity)
    @JoinColumn()
    author: UserEntity

    @OneToMany(() => UserEntity, (user) => user.community)
    members: UserEntity[]

    @OneToOne(() => FileEntity)
    @JoinColumn()
    image: FileEntity
}

import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {CommunityEntity} from '../../community/entities/community.entity';
import {CardEntity} from "../../card/entites/card.entity";

export enum rankEnum {
    bronze='bronze',
    silver='silver',
    gold='gold',
    platina='platina',
    diamond='diamond',
    emerald='emerald'
}
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, type: "varchar"})
    tgId: string;

    @Column({type: "varchar"})
    username: string;

    @Column({default: rankEnum.bronze})
    rank: rankEnum;

    @Column({default: 0})
    cookie: number;

    @Column({default: 0})
    cookiePerHour: number;

    @Column({default: 1})
    tap: number;

    @Column({default: 1500})
    maxEnergy: number;

    @Column({default: 1500})
    currentEnergy: number;
    //можно держать в бд время последнего посещения и когда юзер снова заходит то высчитывать сколько времени его не было в секундах
    //а currentEnergy нужно обновлять используя useDebounce

    @ManyToOne(() => CommunityEntity, (community) => community.members)
    community: CommunityEntity

    @OneToOne(() => CommunityEntity, (community) => community.author)
    @JoinColumn()
    myCommunity: CommunityEntity

    @OneToMany(() => UserEntity, (user) => user.referrer)
    referrals: UserEntity[];

    @ManyToOne(() => UserEntity, (user) => user.referrals)
    referrer: UserEntity;

    @ManyToMany(() => CardEntity, {onDelete: "SET NULL"})
    @JoinTable()
    cards: CardEntity[]

    @Column({ default: Date.now(), type: "bigint" })
    lastVisit: number;
}

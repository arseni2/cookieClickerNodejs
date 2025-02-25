import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {BuyCardDto} from "./dto/buy-card.dto";
import {CardService} from "../card/card.service";
import {SetCookieDto} from "./dto/set-cookie.dto";

@Injectable()
export class UserService {
    //TODO:
    //1) написать инкрементация тапа
    //2) доделать таски
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private cardService: CardService,
        //private dataSource: DataSource
    ) {
    }

    async create(createUserDto: CreateUserDto, tgId: string) {
        let referrer: UserEntity = null;

        if (createUserDto.refId) {
            referrer = await this.userRepo.findOne({
                where: {id: createUserDto.refId}
            });

            if (!referrer) {
                throw new HttpException("refId не коректный", HttpStatus.BAD_REQUEST)
            }
        }

        const newUser = this.userRepo.create({...createUserDto, tgId});

        if (referrer) {
            newUser.referrer = referrer;
        }

        await this.userRepo.save(newUser, {transaction: false});

        return newUser;
    }

    async findOneByTgId(tgId: string) {
        return this.userRepo.findOne({where: {tgId}, transaction: false});
    }

    async profile(tgId: string) {
        const user = await this.findOneByTgId(tgId)
        const seconds = Math.ceil((Date.now() - user.lastVisit) / 1000)
        const energyRecovery = seconds*2
        user.currentEnergy += energyRecovery

        if(user.maxEnergy < user.currentEnergy) {
            user.currentEnergy = user.maxEnergy
        }
        user.lastVisit = Date.now()
        return this.userRepo.save(user)
    }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return this.userRepo.update(id, updateUserDto)
    // }

    remove(id: number) {
        return this.userRepo.delete(id)
    }

    async buyCard(buyCardDto: BuyCardDto, tgId: string) {
        const card = await this.cardService.getCardById(buyCardDto.cardId)
        if (!card) return new HttpException("Нет card с таким id", HttpStatus.BAD_REQUEST)
        const user = await this.userRepo.findOne({where: {tgId}, relations: ["cards"]})
        if (user.cookie < card.price) return new HttpException("Не хватает денег", HttpStatus.FORBIDDEN)
        else {
            user.cookie = user.cookie - card.price
        }
        user.cards.push(card)
        user.cookiePerHour += card.cookiePerHour

        return this.userRepo.save(user)
    }

    async setCookie(setCookieDTO: SetCookieDto, tgId: string) {
        const user = await this.userRepo.findOne({where: {tgId}})
        if(setCookieDTO.currentEnergy > user.maxEnergy || setCookieDTO.currentEnergy < setCookieDTO.cookie || user.currentEnergy < setCookieDTO.cookie) {
            return new HttpException("в prod версии проекта акк будет забанен", HttpStatus.CONFLICT)
        }
        user.cookie += setCookieDTO.cookie
        user.currentEnergy -= setCookieDTO.cookie
        return this.userRepo.save(user)
    }

    async updateLastVisit(tgId: string) {
        return this.userRepo.update({tgId}, {lastVisit: Date.now()})
    }

    async save(user: UserEntity) {
        return this.userRepo.save(user)
    }

    async incrementMaxEnergyLimit(tgId: string) {
        const user = await this.findOneByTgId(tgId)

        if(user.cookie < 500 * user.maxEnergyLevel) return new HttpException("не хватает денег", HttpStatus.FORBIDDEN)

        user.cookie -= 500 * user.maxEnergyLevel
        user.maxEnergy += 500

        return this.save(user)
    }

    async incrementTap(tgId: string) {
        const user = await this.findOneByTgId(tgId)

        if(user.cookie < 500 * user.tap) return new HttpException("не хватает денег", HttpStatus.FORBIDDEN)
        
        user.cookie -= 500 * user.tap
        user.tap += 1

        return this.save(user)
    }
}

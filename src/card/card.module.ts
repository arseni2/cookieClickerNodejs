import {Module} from '@nestjs/common';
import {CardService} from './card.service';
import {CardController} from './card.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardEntity} from "./entites/card.entity";
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/entities/user.entity";

@Module({
	controllers: [CardController],
	providers: [CardService, UserService],
	imports: [TypeOrmModule.forFeature([CardEntity, UserEntity])],
	exports: [CardService]
})
export class CardModule {
}

import {Module} from '@nestjs/common';
import {CardService} from './card.service';
import {CardController} from './card.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardEntity} from "./entites/card.entity";

@Module({
	controllers: [CardController],
	providers: [CardService],
	imports: [TypeOrmModule.forFeature([CardEntity])],
	exports: [CardService]
})
export class CardModule {
}

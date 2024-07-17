import {Controller, Get} from '@nestjs/common';
import {CardService} from './card.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Карточки")
@Controller('card')
export class CardController {
	constructor(private readonly cardService: CardService) {
	}

	@Get("all")
	public getAllCards() {
		return this.cardService.getAllCards()
	}
}

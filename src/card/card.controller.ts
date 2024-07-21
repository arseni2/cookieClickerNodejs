import {Controller, Get, UseInterceptors} from '@nestjs/common';
import {CardService} from './card.service';
import {ApiTags} from "@nestjs/swagger";
import {UpdateLastVisitInterceptor} from "../user/interceptors/user-update-last-visit-interceptor/user-update-last-visit-interceptor.interceptor";

@ApiTags("Карточки")
@Controller('card')
export class CardController {
	constructor(private readonly cardService: CardService) {
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Get("all")
	public getAllCards() {
		return this.cardService.getAllCards()
	}
}

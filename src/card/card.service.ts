import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {CardEntity} from "./entites/card.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CardService {
	constructor(
		@InjectRepository(CardEntity)
		private repo: Repository<CardEntity>
	) {
	}

	public getAllCards()  {
		return this.repo.find()
	}

	public async getCardById(id: number)  {
		const card = await this.repo.findOne({where: {id}})
		return card || null
	}
}

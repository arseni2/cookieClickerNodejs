import { ApiProperty } from '@nestjs/swagger';

export class BuyCardDto {
	@ApiProperty()
	cardId: number

	@ApiProperty()
	tgId: string;
}
import {ApiProperty} from "@nestjs/swagger";

export class SetCookieDto {
	@ApiProperty()
	cookie: number

	@ApiProperty()
	userTgId: number
}
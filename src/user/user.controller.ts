import {Body, Controller, Delete, Get, Param, Patch, Post, Req} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiTags} from "@nestjs/swagger";
import {BuyCardDto} from "./dto/buy-card.dto";
import {RequestWithUserTgId} from "../types";

@Controller('user')
@ApiTags("Пользователи")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findOneById(@Param('id') id: string, @Req() req: RequestWithUserTgId) {
        return this.userService.findOneById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Post('buyCard')
    buyCard(@Body() buyCardDto: BuyCardDto) {
        return this.userService.buyCard(buyCardDto);
    }
}

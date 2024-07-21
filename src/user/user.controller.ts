import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseInterceptors} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiTags} from "@nestjs/swagger";
import {BuyCardDto} from "./dto/buy-card.dto";
import {RequestWithUserTgId} from "../types";
import {UpdateLastVisitInterceptor} from "./interceptors/user-update-last-visit-interceptor/user-update-last-visit-interceptor.interceptor";
import {SetCookieDto} from "./dto/set-cookie.dto";

@Controller('user')
@ApiTags("Пользователи")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('create')
    create(@Body() createUserDto: CreateUserDto, @Req() req: RequestWithUserTgId) {
        return this.userService.create(createUserDto, req.userTgId);
    }

    @Get('profile')
    findOneById(@Req() req: RequestWithUserTgId) {
        return this.userService.findOneByTgId(req.userTgId);
    }

    @Post("setCookie")
    setCookie(@Req() req: RequestWithUserTgId, @Body() setCookieDto: SetCookieDto) {
        return this.userService.setCookie(setCookieDto, req.userTgId);
    }
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.userService.remove(+id);
    // }
    @UseInterceptors(UpdateLastVisitInterceptor)
    @Post('buyCard')
    buyCard(@Body() buyCardDto: BuyCardDto, @Req() req: RequestWithUserTgId) {
        return this.userService.buyCard(buyCardDto, req.userTgId);
    }
}

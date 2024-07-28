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
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Post('create')
    create(@Body() createUserDto: CreateUserDto, @Req() req: RequestWithUserTgId) {
        return this.userService.create(createUserDto, req.userTgId);
    }

    @Get('profile')
    findOneById(@Req() req: RequestWithUserTgId) {
        return this.userService.profile(req.userTgId);
    }

    @Post("setCookie")
    setCookie(@Req() req: RequestWithUserTgId, @Body() setCookieDto: SetCookieDto) {
        return this.userService.setCookie(setCookieDto, req.userTgId);
    }

    @UseInterceptors(UpdateLastVisitInterceptor)
    @Post('buyCard')
    buyCard(@Body() buyCardDto: BuyCardDto, @Req() req: RequestWithUserTgId) {
        return this.userService.buyCard(buyCardDto, req.userTgId);
    }

    @UseInterceptors(UpdateLastVisitInterceptor)
    @Post("updateMaxEnergy")
    updateMaxEnergy(@Req() req: RequestWithUserTgId) {
        return this.userService.incrementMaxEnergyLimit(req.userTgId)
    }

    @UseInterceptors(UpdateLastVisitInterceptor)
    @Post("updateTap")
    updateTap(@Req() req: RequestWithUserTgId) {
        return this.userService.incrementTap(req.userTgId)
    }
}

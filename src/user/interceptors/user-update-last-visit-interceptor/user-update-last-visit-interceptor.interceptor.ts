import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserService} from "../../user.service";
import {RequestWithUserTgId} from "../../../types";

@Injectable()
export class UpdateLastVisitInterceptor implements NestInterceptor {
	constructor(private readonly usersService: UserService) {
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request: RequestWithUserTgId = context.switchToHttp().getRequest();
		const tgId = request.userTgId;

		if (tgId) {
			return next.handle().pipe(
				tap(async () => {
					await this.usersService.updateLastVisit(tgId);
				})
			);
		}

		return next.handle();
	}
}

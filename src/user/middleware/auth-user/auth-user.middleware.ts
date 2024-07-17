import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		const { headers } = req;
		req.userTgId = headers["authorization"];  // Note the use of "authorization" instead of "Authorization" (headers are case-insensitive, but it's a good practice to use lower case)

		if (!req.userTgId) {
			throw new HttpException("Ты не передаешь tgId пользователя в headers['Authorization']", HttpStatus.UNAUTHORIZED);
		}

		next();
	}
}

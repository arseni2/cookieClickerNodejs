import {Controller, Get, Param, Post, Req, UseInterceptors} from '@nestjs/common';
import {TaskService} from './task.service';
import {RequestWithUserTgId} from "../types";
import {UpdateLastVisitInterceptor} from "../user/interceptors/user-update-last-visit-interceptor/user-update-last-visit-interceptor.interceptor";

@Controller('task')
export class TaskController {
	constructor(
		private readonly taskService: TaskService
	) {
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Get("all")
	getAllTasks() {
		return this.taskService.getAllTasks()
	}

	@UseInterceptors(UpdateLastVisitInterceptor)
	@Post("claim/:id")
	claimTask(@Req() req: RequestWithUserTgId, @Param("id") id: string) {
		return this.taskService.claimTaskById(req.userTgId, +id)
	}
}

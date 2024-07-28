import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TaskEntity} from "./entities/task.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(TaskEntity)
		private repo: Repository<TaskEntity>,

		private userService: UserService
	) {
	}

	getAllTasks() {
		return this.repo.find({}) //тут надо вытащить данные из таблицы UserCompletedTask и сравнивать
	}

	async claimTaskById(tgId: string, taskId: number) {
		const user = await this.userService.findOneByTgId(tgId)
		const task = await this.repo.findOne({where: {id: taskId}, relations: ["usersCompletedTaskIds"]})

		if (!task) return new HttpException("неправильный task id", HttpStatus.BAD_REQUEST)
		if(task.usersCompletedTaskIds.includes(user)) return new HttpException("задача уже выполнена", HttpStatus.FORBIDDEN)
		task.usersCompletedTaskIds.push(user)
		user.cookie += task.cookie
		await this.userService.save(user)

		return this.repo.save(task)
	}
}

import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCommunityDto} from './dto/create-community.dto';
import {UpdateCommunityDto} from './dto/update-community.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {CommunityEntity} from "./entities/community.entity";
import {Repository} from "typeorm";
import {JoinCommunityDto} from "./dto/join-community.dto";
import {DeleteCommunityDto} from "./dto/delete-community.dto";
import {UserEntity} from "../user/entities/user.entity";
import {FileService} from "../file/file.service";

@Injectable()
export class CommunityService {
	constructor(
		@InjectRepository(CommunityEntity)
		private communityRepo: Repository<CommunityEntity>,

		@InjectRepository(UserEntity)
		private userRepo: Repository<UserEntity>,

		private fileService: FileService
	) {
	}

	async create(createCommunityDto: CreateCommunityDto) {
		console.log(createCommunityDto)
		if(createCommunityDto.image) {
			var file = await this.fileService.saveFile(createCommunityDto.image)
		}
		try {
			const community = await this.communityRepo.save({
				author: {id: createCommunityDto.authorId},
				title: createCommunityDto.title,
				image: file
			})
			await this.userRepo.update(createCommunityDto.authorId, {
				myCommunity: community
			});

			return community
		} catch (e) {
			if(e.code === '23505') {
				throw new HttpException("Вы являетесь автором сообщества", HttpStatus.BAD_REQUEST)
			}
			return;
		}

	}

	async join(joinCommunityDto: JoinCommunityDto) {
		let community = await this.communityRepo.findOne({
			where: {id: joinCommunityDto.communityId},
			relations: ["members"]
		})

		// @ts-ignore
		community.members.push({id: joinCommunityDto.userId})

		return this.communityRepo.save(community)
	}

	findAll() {
		return this.communityRepo.find()
	}

	findOne(id: number) {
		return `This action returns a #${id} community`;
	}

	async update(id: number, updateCommunityDto: UpdateCommunityDto) {
		const community = await this.communityRepo.findOne({where: {id}, relations: ["author"]})
		const {userTgId, ...otherDataDto} = updateCommunityDto
		if(community.author.tgId !== userTgId) return new HttpException("Вы не являетесь автором community", HttpStatus.FORBIDDEN)

		return this.communityRepo.update(community, otherDataDto)
	}

	async remove(deleteCommunityDto: DeleteCommunityDto) {
        const community = await this.communityRepo.findOne({
		    where: {id: deleteCommunityDto.communityId},
			relations: ["author"]
		})

		if(!community) return new HttpException("Не коректный id community", HttpStatus.BAD_REQUEST)

		if(community.author.tgId !== deleteCommunityDto.userTgId) return new HttpException("Вы не являетесь автором community", HttpStatus.FORBIDDEN)
		
		community.author.myCommunity = null;
		await this.userRepo.save(community.author);

		// Удалить сообщество
		await this.communityRepo.remove(community);
		return {success: true}
	}
}

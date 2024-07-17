import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FileEntity} from "./file.entity";
import {Repository} from "typeorm";
import * as os from "node:os";

@Injectable()
export class FileService {
	constructor(
		@InjectRepository(FileEntity)
		private repo: Repository<FileEntity>
	) {
	}

	public saveFile(file: Express.Multer.File) {
		console.log(os.hostname())
		return this.repo.save({
			filename: file.filename,
			imgUrl: `uploads/${file.filename}`
		});
	}

	public getFileById() {

	}
}

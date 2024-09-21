import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: { email },
		});
	}

	async findById(id: number) {
		return await this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				playlists: {
					select: {
						id: true,
						albums: {
							select: {
								id: true,
								name: true,
								releaseDate: true,
								artists: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				},
			},
		});
	}

	async create(data: CreateUserDto) {
		return await this.prisma.user.create({
			data,
		});
	}

	async updatePlaylists(id: number, data: UpdateUserDto) {
		const user = await this.findById(id);
		await this.prisma.playlist.deleteMany({
			where: {
				id: {
					in: user.playlists.map((playlist) => playlist.id),
				},
			},
		});

		const updateUser = await this.prisma.user.update({
			where: { id },
			data: {
				playlists: {
					upsert: data.playlists.map((playlist) => ({
						where: { id: playlist.id },
						update: {},
						create: {
							albums: {
								create: playlist.albums.map((album) => ({
									name: album.name,
									releaseDate: album.releaseDate,
									artists: {
										create: album.artists.map((artist) => ({
											name: artist.name,
										})),
									},
								})),
							},
						},
					})),
				},
			},
		});
		return updateUser;
	}

	remove(id: number) {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}

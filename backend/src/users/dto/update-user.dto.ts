import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateArtistDto {
	@ApiProperty({
		description: "id",
		example: "id",
	})
	@IsString()
	@IsOptional()
	id: number;

	@ApiProperty({
		description: "name",
		example: "artist name",
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}

export class UpdateAlbumDto {
	@ApiProperty({
		description: "id",
		example: "id",
	})
	@IsString()
	@IsOptional()
	id: number;

	@ApiProperty({
		description: "name",
		example: "album name",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description: "releaseDate",
		example: "2021-01-01",
	})
	@IsString()
	@IsNotEmpty()
	releaseDate: string;

	@ApiProperty({
		description: "artists",
		example: [{ name: "artist name" }],
	})
	@Type(() => UpdateArtistDto)
	@IsArray()
	@IsNotEmpty()
	artists: UpdateArtistDto[];
}

export class UpdatePlayListDto {
	@ApiProperty({
		description: "id",
		example: "id",
	})
	@IsString()
	@IsOptional()
	id: number;

	@ApiProperty({
		description: "albums",
	})
	@Type(() => UpdateAlbumDto)
	@IsArray()
	@IsNotEmpty()
	albums: UpdateAlbumDto[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({
		description: "playlists",
		example: [
			{
				id: 1,
				albums: [
					{
						name: "album name",
						releaseDate: "2021-01-01",
						artists: [{ name: "artist name" }],
					},
				],
			},
		],
	})
	@Type(() => UpdatePlayListDto)
	@IsArray()
	@IsOptional()
	playlists: UpdatePlayListDto[];
}

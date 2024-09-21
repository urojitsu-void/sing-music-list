import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import {
	IsArray,
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateArtistDto {
	@ApiPropertyOptional({
		description: "id",
		example: 1,
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
	@ApiPropertyOptional({
		description: "id",
		example: 1,
	})
	@IsNumber()
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
		example: new Date("2021-01-01"),
	})
	@IsDate()
	@IsNotEmpty()
	releaseDate: Date;

	@ApiProperty({
		description: "artists",
		type: [UpdateArtistDto],
		example: [{ name: "artist name" }],
	})
	@Type(() => UpdateArtistDto)
	@IsArray()
	@IsNotEmpty()
	artists: UpdateArtistDto[];
}

export class UpdatePlayListDto {
	@ApiPropertyOptional({
		description: "id",
		example: 1,
	})
	@IsNumber()
	@IsOptional()
	id: number;

	@ApiProperty({
		description: "albums",
		type: [UpdateAlbumDto],
		example: [
			{
				name: "album name",
				releaseDate: new Date("2021-01-01"),
				artists: [{ name: "artist name" }],
			},
		],
	})
	@Type(() => UpdateAlbumDto)
	@IsArray()
	@IsNotEmpty()
	albums: UpdateAlbumDto[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiPropertyOptional({
		description: "playlists",
		type: [UpdatePlayListDto],
		example: [
			{
				id: 1,
				albums: [
					{
						name: "album name",
						releaseDate: new Date("2021-01-01"),
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

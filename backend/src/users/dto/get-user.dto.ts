import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
	IsArray,
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

class ArtistResponseDto {
	@Expose()
	@ApiProperty({
		description: "id",
		example: 1,
	})
	@IsNotEmpty()
	id: number;

	@Expose()
	@ApiProperty({
		description: "name",
		example: "artist name",
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}

class AlbumResponseDto {
	@Expose()
	@ApiProperty({
		description: "id",
		example: 1,
	})
	@IsNotEmpty()
	id: number;

	@Expose()
	@ApiProperty({
		description: "name",
		example: "album name",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@Expose()
	@ApiProperty({
		description: "releaseDate",
		example: new Date("2021-01-01"),
	})
	@IsDate()
	@IsNotEmpty()
	releaseDate: Date;

	@Expose()
	@ApiProperty({
		description: "artists",
		type: [ArtistResponseDto],
		example: [{ id: 1, name: "artist name" }],
	})
	@Type(() => ArtistResponseDto)
	@IsArray()
	@IsNotEmpty()
	artists: ArtistResponseDto[];
}

class PlayListResponseDto {
	@Expose()
	@ApiProperty({
		description: "id",
		example: 1,
	})
	@IsNotEmpty()
	id: number;

	@Expose()
	@ApiProperty({
		description: "albums",
		type: [AlbumResponseDto],
		example: [
			{
				id: 1,
				name: "album name",
				releaseDate: new Date("2021-01-01"),
				artists: [{ id: 1, name: "artist name" }],
			},
		],
	})
	@Type(() => AlbumResponseDto)
	@IsArray()
	@IsNotEmpty()
	albums: AlbumResponseDto[];
}

export class UserResponseDto {
	@Expose()
	@ApiProperty({
		description: "name",
		example: "nickname",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@Expose()
	@ApiProperty({
		description: "playlists",
		type: [PlayListResponseDto],
		example: [
			{
				id: 1,
				albums: [
					{
						id: 1,
						name: "album name",
						releaseDate: new Date("2021-01-01"),
						artists: [{ id: 1, name: "artist name" }],
					},
				],
			},
		],
	})
	@Type(() => PlayListResponseDto)
	@IsArray()
	@IsOptional()
	playlists: PlayListResponseDto[];
}

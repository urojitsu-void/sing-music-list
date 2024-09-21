import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { PaginationQueryDto, PaginationResponseDto } from "./pagination.dto";
import { Expose, Type } from "class-transformer";

export class FindAlbumsQueryDto extends PaginationQueryDto {
	@ApiProperty({
		description: "query of album name",
		example: "千本桜",
	})
	@IsString()
	@IsNotEmpty()
	albumName: string;
}

class ArtistDto {
	@ApiProperty({
		description: "artist id",
		example: "1",
	})
	@IsString()
	@IsNotEmpty()
	id: string;

	@ApiProperty({
		description: "artist name",
		example: "初音ミク",
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}

class AlbumDto {
	@ApiProperty({
		description: "album id",
		example: "1",
	})
	@IsString()
	@IsNotEmpty()
	id: string;

	@ApiProperty({
		description: "album name",
		example: "千本桜",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description: "album release date",
		example: "2021-01-01",
	})
	@IsString()
	@IsNotEmpty()
	releaseDate: string;

	@ApiProperty({
		description: "album detail url",
		example: "https://example.com",
	})
	detail: string;

	@ApiProperty({
		description: "album artists",
		type: [ArtistDto],
		example: [
			{
				id: "1",
				name: "初音ミク",
			},
		],
	})
	@Type(() => ArtistDto)
	@IsArray()
	@IsNotEmpty()
	artists: ArtistDto[];
}

export class FindAlbumsResponseDto extends PaginationResponseDto {
	@Expose()
	@ApiProperty({
		description: "album list",
		type: [AlbumDto],
		example: [
			{
				id: "1",
				name: "千本桜",
				releaseDate: "2021-01-01",
				detail: "https://example.com",
				artists: [
					{
						id: "1",
						name: "初音ミク",
					},
				],
			},
		],
	})
	@Type(() => AlbumDto)
	@IsArray()
	albums: AlbumDto[];
}

export class FindArtistsQueryDto extends PaginationQueryDto {
	@ApiProperty({
		description: "query of artist name",
		example: "初音ミク",
	})
	@IsString()
	@IsNotEmpty()
	artistName: string;
}

export class FindArtistsResponseDto extends PaginationResponseDto {
	@Expose()
	@ApiProperty({
		description: "artist list",
		type: [ArtistDto],
		example: [
			{
				id: "1",
				name: "初音ミク",
			},
		],
	})
	@Type(() => ArtistDto)
	@IsArray()
	artists: ArtistDto[];
}

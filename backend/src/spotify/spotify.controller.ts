import {
	Controller,
	Get,
	Inject,
	Param,
	Query,
	UseInterceptors,
	ValidationPipe,
} from "@nestjs/common";
import { SpotifyService } from "./spotify.service";
import {
	FindAlbumsQueryDto,
	FindAlbumsResponseDto,
	FindArtistsQueryDto,
	FindArtistsResponseDto,
} from "./dto/search.dto";
import { ApiOperation } from "@nestjs/swagger";
import { CommonOkResponseInterceptor } from "../api-common-ok-response.interceptor";
import { ApiCommonOkResponse } from "../api-common-ok-response.decorator";
import { PaginationQueryDto } from "./dto/pagination.dto";

@Controller("spotify")
export class SpotifyController {
	constructor(
		@Inject(SpotifyService)
		private readonly spotifyService: SpotifyService,
	) {}

	@Get("albums")
	@ApiOperation({
		summary: "楽曲検索",
		description: "楽曲名からアルバムを検索する。",
	})
	@ApiCommonOkResponse(FindAlbumsResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	async findAlbums(
		@Query(new ValidationPipe({ whitelist: true })) query: FindAlbumsQueryDto,
	) {
		const { albumName, offset, limit } = query;
		const result = await this.spotifyService.search({
			query: albumName,
			type: "album",
			offset,
			limit,
		});

		const response: FindAlbumsResponseDto = {
			albums: result?.items.map((i) => ({
				id: i.id,
				name: i.name,
				release_date: i.release_date,
				detail: i.href,
				artists: i.artists.map((a) => ({
					id: a.id,
					name: a.name,
				})),
			})),
			total: result?.total,
			limit: result?.limit,
			offset: result?.offset,
		};
		return response;
	}

	@Get("artists")
	@ApiOperation({
		summary: "アーティスト検索",
		description: "アーティスト名からアーティストを検索する。",
	})
	@ApiCommonOkResponse(FindArtistsResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	async findArtists(
		@Query(new ValidationPipe({ whitelist: true })) query: FindArtistsQueryDto,
	) {
		const { artistName, offset, limit } = query;
		const result = await this.spotifyService.search({
			query: artistName,
			type: "artist",
			offset,
			limit,
		});
		const response: FindArtistsResponseDto = {
			artists: result?.items.map((a) => ({
				id: a.id,
				name: a.name,
			})),
			total: result?.total,
			limit: result?.limit,
			offset: result?.offset,
		};
		return response;
	}

	@Get("artists/:id/albums")
	@ApiOperation({
		summary: "アーティストの楽曲検索",
		description: "アーティストからアルバムを検索する。",
	})
	@ApiCommonOkResponse(FindAlbumsResponseDto, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	async findArtistAlbums(
		@Param("id") id: string,
		@Query(new ValidationPipe({ whitelist: true })) query: PaginationQueryDto,
	) {
		const { offset, limit } = query;
		const result = await this.spotifyService.getArtistAlbums({
			id,
			offset,
			limit,
		});
		const response: FindAlbumsResponseDto = {
			albums: result?.items.map((i) => ({
				album: {
					id: i.id,
					name: i.name,
					release_date: i.release_date,
					detail: i.href,
				},
			})),
			total: result?.total,
			limit: result?.limit,
			offset: result?.offset,
		};
		return response;
	}
}

import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";

@Controller("spotify")
export class SpotifyController {
	constructor(
		@Inject(SpotifyService)
		private readonly spotifyService: SpotifyService,
	) {}

	@Get("albums")
	async findAlbums(
		@Query("query") query: string,
		@Query("offset") offset?: number,
		@Query("limit") limit?: number,
	) {
		const result = await this.spotifyService.search({
			query,
			type: "album",
			offset,
			limit,
		});
		return {
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
	}

	@Get("artists")
	async findArtists(
		@Query("query") query: string,
		@Query("offset") offset?: number,
		@Query("limit") limit?: number,
	) {
		const result = await this.spotifyService.search({
			query,
			type: "artist",
			offset,
			limit,
		});
		return {
			artists: result?.items.map((a) => ({
				id: a.id,
				name: a.name,
			})),
			total: result?.total,
			limit: result?.limit,
			offset: result?.offset,
		};
	}

	@Get("artists/:id/albums")
	async findArtistAlbums(
		@Param("id") id: string,
		@Query("offset") offset?: number,
		@Query("limit") limit?: number,
	) {
		const result = await this.spotifyService.getArtistAlbums({
			id,
			offset,
			limit,
		});
		return {
			items: result?.items.map((i) => ({
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
	}
}

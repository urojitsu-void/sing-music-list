import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class SpotifyService {
	constructor(private readonly configService: ConfigService) {}

	// Spotify APIトークンの取得関数
	private async getSpotifyToken() {
		const tokenUrl = "https://accounts.spotify.com/api/token";
		const params = new URLSearchParams();
		params.append("grant_type", "client_credentials");

		const clientId = this.configService.get<string>("SPOTIFY_CLIENT_ID");
		const clientSecret = this.configService.get<string>(
			"SPOTIFY_CLIENT_SECRET",
		);
		const headers = {
			Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
			"Content-Type": "application/x-www-form-urlencoded",
		};

		try {
			const response = await axios.post(tokenUrl, params, { headers });
			return response.data.access_token;
		} catch (error) {
			console.error("Error fetching Spotify token:", error);
		}
	}

	// Spotify APIの検索リクエスト関数
	async search({
		query,
		type,
		offset = 0,
		limit = 20,
	}: {
		query: string;
		type: "album" | "artist";
		offset?: number;
		limit?: number;
	}) {
		const token = await this.getSpotifyToken();
		const searchUrl = `https://api.spotify.com/v1/search?locale=ja&market=JP&q=${encodeURIComponent(query)}&type=${type}&offset=${offset}&limit=${limit}`;

		const headers = {
			Authorization: `Bearer ${token}`,
		};

		try {
			const response = await axios.get(searchUrl, { headers });
			return response.data[`${type}s`];
		} catch (error) {
			console.error("Error fetching Spotify token:", error);
		}
	}

	async getArtistAlbums({
		id,
		offset = 0,
		limit = 20,
	}: {
		id: string;
		offset?: number;
		limit?: number;
	}) {
		const token = await this.getSpotifyToken();
		const searchUrl = `https://api.spotify.com/v1/artists/${id}/albums?locale=ja&market=JP&offset=${offset}&limit=${limit}`;

		const headers = {
			Authorization: `Bearer ${token}`,
		};

		try {
			const response = await axios.get(searchUrl, { headers });
			return response.data;
		} catch (error) {
			console.error("Error fetching Spotify token:", error);
		}
	}
}

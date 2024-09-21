import React, { useEffect } from "react";
import { usersApi } from "../store/api/enhancedApis/userApi";
import {
	AlbumDto,
	enhancedApi as spotifyApi,
} from "../store/api/gen/spotify.gen";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

const UserPage: React.FC = () => {
	const id = useSelector((state: RootState) => state.auth.id);
	const { data: userResponse } = usersApi.useUsersControllerFindOneQuery({
		id,
	});
	const [updateUserPlaylists] =
		usersApi.useUsersControllerUpdatePlaylistMutation();
	const [searchSpotifyAlbums, { data: albumReponse }] =
		spotifyApi.useLazySpotifyControllerFindAlbumsQuery();
	const [searchSpotifyArtists, { data: artistsReponse }] =
		spotifyApi.useLazySpotifyControllerFindArtistsQuery();
	const [searchSpotifyArtistAlbums, { data: artistAlbumsResponse }] =
		spotifyApi.useLazySpotifyControllerFindArtistAlbumsQuery();
	const navigate = useNavigate();

	const queryParameters = useLocation().search;
	const query = new URLSearchParams(queryParameters);
	const search = query.get("q");
	const searchType = query.get("type");
	const offset = query.get("offset");
	const artist = query.get("artist");
	const showType: "album" | "artist" | "artistAlbum" = artist
		? "artistAlbum"
		: searchType === "artist"
			? "artist"
			: "album";

	const methods = useForm({
		defaultValues: {
			search: search || "",
			searchType: searchType || "album",
			offset: offset || 0,
		},
	});
	const { register, control } = methods;
	const searchValue = useWatch({ control, name: "search" });
	const searchTypeValue = useWatch({ control, name: "searchType" });

	const onSearch = () => {
		if (!searchValue) {
			return;
		}
		navigate(`/user?q=${searchValue}&type=${searchTypeValue}&offset=${0}`);
	};

	const onSearchArtistAlbums = (id: number) => {
		navigate(`/user?artist=${id}&offset=${0}`);
	};

	useEffect(() => {
		const offsetIdx = Number(offset);
		const idx = Number.isNaN(offsetIdx) ? offsetIdx : 0;
		if (artist) {
			searchSpotifyArtistAlbums({ id: artist, offset: idx });
		} else if (search && searchType) {
			if (searchType === "album") {
				searchSpotifyAlbums({
					albumName: search,
					offset: idx,
				});
			} else if (searchType === "artist") {
				searchSpotifyArtists({
					artistName: search,
					offset: idx,
				});
			}
		}
	}, [
		search,
		searchType,
		offset,
		artist,
		searchSpotifyAlbums,
		searchSpotifyArtists,
		searchSpotifyArtistAlbums,
	]);

	const addToPlaylist = (album: AlbumDto) => {
		const playlist = userResponse?.data.playlists[0];
		const albums = playlist?.albums || [];

		updateUserPlaylists({
			id,
			updateUserDto: {
				playlists: [
					{
						albums: [
							...albums,
							{
								id: Number(album.id),
								releaseDate: new Date(album.releaseDate),
								...album,
							},
						],
					},
				],
			},
		}).unwrap();
	};
	const removeFromPlaylist = (idx: number) => {
		const playlist = userResponse?.data.playlists[0];
		const albums = playlist?.albums || [];

		updateUserPlaylists({
			id,
			updateUserDto: {
				playlists: [
					{
						albums: [...albums.slice(0, idx), ...albums.slice(idx + 1)],
					},
				],
			},
		}).unwrap();
	};

	return (
		<div>
			<details>
				<summary style={{ paddingTop: 10, cursor: "pointer" }}>
					楽曲＆アーティスト検索
				</summary>
				<dl>
					<dt>
						<div>
							<div>検索種別</div>
							<div style={{ display: "flex" }}>
								<input
									type="radio"
									id="searchTypeAlbum"
									name="searchType"
									value="album"
									defaultChecked
									{...register("searchType")}
								/>
								<label htmlFor="searchTypeAlbum">アルバム名</label>
								<input
									type="radio"
									id="searchTypeArtist"
									name="searchType"
									value="artist"
									{...register("searchType")}
								/>
								<label htmlFor="searchTypeArtist">アーティスト名</label>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: 10,
							}}
						>
							<input type="text" {...register("search")} />
							<button type="button" onClick={onSearch}>
								検索
							</button>
						</div>

						{showType === "artistAlbum" ? (
							<>
								<div style={{ display: "flex" }}>
									<button type="button" onClick={() => navigate(-1)}>
										戻る
									</button>
									<div>{artistAlbumsResponse?.data.artist.name}の楽曲</div>
								</div>
								<table border={1}>
									<thead>
										<tr>
											<th>楽曲名</th>
											<th>リリース日</th>
											<th />
										</tr>
									</thead>
									<tbody>
										{artistAlbumsResponse?.data.albums.map((album) => (
											<tr key={album.id}>
												<td>{album.name}</td>
												<td style={{ minWidth: 100 }}>{album.releaseDate}</td>
												<td>
													<button
														type="button"
														style={{ minWidth: 80, padding: 8 }}
														onClick={() => addToPlaylist(album)}
													>
														追加する
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</>
						) : showType === "artist" ? (
							<table border={1}>
								<thead>
									<tr>
										<th>アーティスト名</th>
									</tr>
								</thead>
								<tbody>
									{artistsReponse?.data.artists.map((artist) => (
										<tr key={artist.id}>
											<td>
												<button
													type="button"
													style={{
														padding: 0,
														border: "none",
														outline: "none",
														background: "none",
														cursor: "pointer",
														color: "blue",
														borderBottom: "thin solid blue",
													}}
													onClick={() => onSearchArtistAlbums(artist.id)}
												>
													{artist.name}
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<table border={1}>
								<thead>
									<tr>
										<th>楽曲名</th>
										<th>アーティスト名</th>
										<th>リリース日</th>
										<th />
									</tr>
								</thead>
								<tbody>
									{albumReponse?.data.albums.map((album) => (
										<tr key={album.id}>
											<td>{album.name}</td>
											<td>
												{album.artists.map((artist) => artist.name).join(",")}
											</td>
											<td style={{ minWidth: 100 }}>{album.releaseDate}</td>
											<td>
												<button
													type="button"
													style={{ minWidth: 80, padding: 8 }}
													onClick={() => addToPlaylist(album)}
												>
													追加する
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</dt>
				</dl>
			</details>

			<div style={{ marginTop: 10, paddingTop: 10, borderTop: "thin solid" }}>
				{userResponse?.data.name}の歌える楽曲リスト
			</div>
			<table border={1} style={{ marginBottom: 10 }}>
				<thead>
					<tr>
						<th>楽曲名</th>
						<th>アーティスト名</th>
						<th>リリース日</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{userResponse?.data.playlists[0].albums.map((album, idx) => (
						<tr key={album.id}>
							<td>{album.name}</td>
							<td>{album.artists.map((artist) => artist.name).join(",")}</td>
							<td style={{ minWidth: 100 }}>{album.releaseDate}</td>
							<td>
								<button
									type="button"
									style={{ minWidth: 80, padding: 8 }}
									onClick={() => removeFromPlaylist(idx)}
								>
									削除する
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserPage;

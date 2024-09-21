import React, { useEffect } from "react";
import { usersApi } from "../store/api/enhancedApis/userApi";
import { enhancedApi as spotifyApi } from "../store/api/gen/spotify.gen";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

const UserPage: React.FC = () => {
	const id = useSelector((state: RootState) => state.auth.id);
	const { data: userResponse } = usersApi.useUsersControllerFindOneQuery({
		id,
	});
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
		navigate(
			`/user?q=${searchValue}&type=${searchTypeValue}&offset=${offset || 0}`,
		);
	};

	const onSearchArtistAlbums = (id: string) => {
		navigate(`/user?artist=${id}&offset=${offset || 0}`);
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

	return (
		<div>
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
			<div style={{ display: "flex", alignItems: "center" }}>
				<input type="text" {...register("search")} />
				<button type="button" onClick={onSearch}>
					検索
				</button>
			</div>

			{albumReponse?.data.albums.map((album) => (
				<div key={album.id}>
					<div>{album.name}</div>
					<div>{album.releaseDate}</div>
					{album.artists.map((artist) => (
						<div key={artist.id}>
							<p>{artist.name}</p>
						</div>
					))}
				</div>
			))}
			{artistAlbumsResponse?.data.albums.map((album) => (
				<div key={album.id}>
					<div>{album.name}</div>
					<div>{album.releaseDate}</div>
				</div>
			))}
			{artistsReponse?.data.artists.map((artist) => (
				<div key={artist.id}>
					<button
						type="button"
						style={{ padding: 0, border: "none", outline: "none" }}
						onClick={() => onSearchArtistAlbums(artist.id)}
					>
						{artist.name}
					</button>
				</div>
			))}
			{userResponse?.data.playlists.map((playlist) => (
				<div key={playlist.id}>
					{playlist.albums.map((album) => (
						<div key={album.id}>
							<p>{album.name}</p>
							<p>{album.releaseDate}</p>
							{album.artists.map((artist) => (
								<div key={artist.id}>
									<p>{artist.name}</p>
								</div>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default UserPage;

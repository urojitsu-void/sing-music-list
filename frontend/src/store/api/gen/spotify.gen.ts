import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    spotifyControllerFindAlbums: build.query<
      SpotifyControllerFindAlbumsResponse,
      SpotifyControllerFindAlbumsArgs
    >({
      query: (queryArg) => ({
        url: `/api/spotify/albums`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          albumName: queryArg.albumName,
        },
      }),
    }),
    spotifyControllerFindArtists: build.query<
      SpotifyControllerFindArtistsResponse,
      SpotifyControllerFindArtistsArgs
    >({
      query: (queryArg) => ({
        url: `/api/spotify/artists`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          artistName: queryArg.artistName,
        },
      }),
    }),
    spotifyControllerFindArtistAlbums: build.query<
      SpotifyControllerFindArtistAlbumsResponse,
      SpotifyControllerFindArtistAlbumsArgs
    >({
      query: (queryArg) => ({
        url: `/api/spotify/artists/${queryArg.id}/albums`,
        params: { limit: queryArg.limit, offset: queryArg.offset },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type SpotifyControllerFindAlbumsResponse =
  /** status 200  */ CommonResponseDto & {
    data?: FindAlbumsResponseDto;
  };
export type SpotifyControllerFindAlbumsArgs = {
  /** pagination size */
  limit?: number;
  /** pagination offset */
  offset?: number;
  /** query of album name */
  albumName: string;
};
export type SpotifyControllerFindArtistsResponse =
  /** status 200  */ CommonResponseDto & {
    data?: FindArtistsResponseDto;
  };
export type SpotifyControllerFindArtistsArgs = {
  /** pagination size */
  limit?: number;
  /** pagination offset */
  offset?: number;
  /** query of artist name */
  artistName: string;
};
export type SpotifyControllerFindArtistAlbumsResponse =
  /** status 200  */ CommonResponseDto & {
    data?: FindArtistAlbumsResponseDto;
  };
export type SpotifyControllerFindArtistAlbumsArgs = {
  id: string;
  /** pagination size */
  limit?: number;
  /** pagination offset */
  offset?: number;
};
export type CommonResponseDto = {
  /** 実行結果 */
  success: boolean;
  /** レスポンス送信日時 */
  date: string;
  /** データ */
  data: object;
  /** エラー内容 */
  error: string;
};
export type ArtistDto = {
  /** artist id */
  id: string;
  /** artist name */
  name: string;
};
export type AlbumDto = {
  /** album id */
  id: string;
  /** album name */
  name: string;
  /** album release date */
  releaseDate: string;
  /** album detail url */
  detail: string;
  /** album artists */
  artists: ArtistDto[];
};
export type FindAlbumsResponseDto = {
  /** pagination size */
  total: number;
  /** pagination size */
  limit: number;
  /** pagination offset */
  offset: number;
  /** album list */
  albums: AlbumDto[];
};
export type FindArtistsResponseDto = {
  /** pagination size */
  total: number;
  /** pagination size */
  limit: number;
  /** pagination offset */
  offset: number;
  /** artist list */
  artists: ArtistDto[];
};
export type FindArtistAlbumsResponseDto = {
  /** pagination size */
  total: number;
  /** pagination size */
  limit: number;
  /** pagination offset */
  offset: number;
  /** album list */
  artist: ArtistDto;
  /** album list */
  albums: AlbumDto[];
};
export const {
  useSpotifyControllerFindAlbumsQuery,
  useSpotifyControllerFindArtistsQuery,
  useSpotifyControllerFindArtistAlbumsQuery,
} = injectedRtkApi;

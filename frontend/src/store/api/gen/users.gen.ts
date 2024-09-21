import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerFindOne: build.query<
      UsersControllerFindOneResponse,
      UsersControllerFindOneArgs
    >({
      query: (queryArg) => ({ url: `/api/users/${queryArg.id}` }),
    }),
    usersControllerRemove: build.mutation<
      UsersControllerRemoveResponse,
      UsersControllerRemoveArgs
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    usersControllerUpdatePlaylist: build.mutation<
      UsersControllerUpdatePlaylistResponse,
      UsersControllerUpdatePlaylistArgs
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}/playlists`,
        method: "PATCH",
        body: queryArg.updateUserDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type UsersControllerFindOneResponse =
  /** status 200  */ CommonResponseDto & {
    data?: UserResponseDto;
  };
export type UsersControllerFindOneArgs = {
  id: string;
};
export type UsersControllerRemoveResponse =
  /** status 200  */ CommonResponseDto & {
    data?: UserResponseDto;
  };
export type UsersControllerRemoveArgs = {
  id: string;
};
export type UsersControllerUpdatePlaylistResponse =
  /** status 200  */ CommonResponseDto & {
    data?: UserResponseDto;
  };
export type UsersControllerUpdatePlaylistArgs = {
  id: string;
  updateUserDto: UpdateUserDto;
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
export type ArtistResponseDto = {
  /** id */
  id: number;
  /** name */
  name: string;
};
export type AlbumResponseDto = {
  /** id */
  id: number;
  /** name */
  name: string;
  /** releaseDate */
  releaseDate: string;
  /** artists */
  artists: ArtistResponseDto[];
};
export type PlayListResponseDto = {
  /** id */
  id: number;
  /** albums */
  albums: AlbumResponseDto[];
};
export type UserResponseDto = {
  /** name */
  name: string;
  /** playlists */
  playlists: PlayListResponseDto[];
};
export type UpdateUserDto = {
  /** Email */
  email?: string;
  /** password */
  password?: string;
  /** name */
  name?: string;
  /** playlists */
  playlists: string[];
};
export const {
  useUsersControllerFindOneQuery,
  useUsersControllerRemoveMutation,
  useUsersControllerUpdatePlaylistMutation,
} = injectedRtkApi;

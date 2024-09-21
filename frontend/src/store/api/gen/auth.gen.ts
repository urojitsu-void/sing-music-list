import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerSignup: build.mutation<
      AuthControllerSignupResponse,
      AuthControllerSignupArgs
    >({
      query: (queryArg) => ({
        url: `/api/auth/signup`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginResponse,
      AuthControllerLoginArgs
    >({
      query: (queryArg) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: queryArg.loginRequestDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AuthControllerSignupResponse =
  /** status 200  */ CommonResponseDto & {
    data?: UserResponseDto;
  };
export type AuthControllerSignupArgs = {
  createUserDto: CreateUserDto;
};
export type AuthControllerLoginResponse =
  /** status 200  */ CommonResponseDto & {
    data?: LoginResponseDto;
  };
export type AuthControllerLoginArgs = {
  loginRequestDto: LoginRequestDto;
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
export type CreateUserDto = {
  /** Email */
  email: string;
  /** password */
  password: string;
  /** name */
  name: string;
};
export type LoginResponseDto = {
  /** user id */
  id: string;
  /** user name */
  name: string;
  /** jwt token */
  access_token: string;
};
export type LoginRequestDto = {
  /** Email */
  email: string;
  /** password */
  password: string;
};
export const {
  useAuthControllerSignupMutation,
  useAuthControllerLoginMutation,
} = injectedRtkApi;

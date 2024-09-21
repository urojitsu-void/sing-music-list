import { enhancedApi } from "../gen/users.gen";

export const usersApi = enhancedApi.enhanceEndpoints({
	addTagTypes: ["user"],
	endpoints: {
		usersControllerFindOne: {
			providesTags: ["user"], // define cache tag
		},
		usersControllerUpdatePlaylist: {
			invalidatesTags: ["user"], // invalidate tag when update
		},
		usersControllerRemove: {
			invalidatesTags: ["user"], // invalidate tag when remove
		},
	},
});

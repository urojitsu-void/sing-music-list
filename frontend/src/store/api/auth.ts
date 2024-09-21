import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	id: string;
	name: string;
	access_token: string;
}
const notLoggedInState: AuthState = {
	id: null,
	name: null,
	access_token: null,
};

const storageKey = "auth";
const getUser = () => {
	const str = localStorage.getItem(storageKey);
	try {
		if (str) return JSON.parse(str);
	} catch (e) {}
	return notLoggedInState;
};
const setUser = (user: AuthState) => {
	localStorage.setItem(storageKey, JSON.stringify(user));
};
const removeUser = () => {
	localStorage.removeItem(storageKey);
};

const authSlice = createSlice({
	name: "auth",
	initialState: getUser(),
	reducers: {
		// set access token to redux store
		login: (state: AuthState, action: PayloadAction<AuthState>) => {
			state.id = action.payload.id;
			state.access_token = action.payload.access_token;
			setUser(action.payload);
		},
		logout: (state: AuthState) => {
			state.id = null;
			state.name = null;
			state.access_token = null;
			removeUser();
			window.location.href = "/login";
		},
	},
});

export const LOGOUT_EVENT = "logout";
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

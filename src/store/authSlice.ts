import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store";

interface AuthState {
	email: string;
	password: string;
}

const initialState: AuthState = {
	email: "",
	password: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn(state, action: PayloadAction<AuthState>) {
			const { email, password } = action.payload;
			state.email = email;
			state.password = password;
		},
		userLoggedOut() {},
	},
	selectors: {
		selectUserEmail: (state: AuthState) => state.email,
	},
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const { selectUserEmail } = authSlice.selectors;

export default authSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Login {
	email: string;
	password: string;
}

interface ResetPassword {
	email: string;
	newPassword: string;
}

interface ForgotPassword {
	email: string;
}

interface VerifyOtp {
	email: string;
	otp: string;
}

interface Register {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	phoneNumber: string;
}

interface User {
	_id: string;
	name: string;
	nickName: string;
	email: string;
	type: "NORMAL" | "ARTISAN";
}

interface AuthState {
	user: User;
	token: string;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		userLoggedIn(state, action: PayloadAction<Login>) {
			const { email, password } = action.payload;
			//TODO: Login functionality

			//NOTE: Dummy login functionality
			const JOHN_DOE: User = {
				_id: "1",
				name: "John Doe",
				nickName: "John",
				email: "johndoe@gmail.com",
				type: "ARTISAN",
			};
			const JANET_STONES: User = {
				_id: "2",
				name: "Janet Stones",
				nickName: "Janet",
				email: "janetstones@gmail.com",
				type: "NORMAL",
			};
			const NONSO_ALI: User = {
				_id: "3",
				name: "Nonso Ali",
				nickName: "Nonso",
				email: "nonsoali@gmail.com",
				type: "NORMAL",
			};
			const DREW_BERRY: User = {
				_id: "4",
				name: "Drew Berry",
				nickName: "Drew",
				email: "drewberry@gmail.com",
				type: "ARTISAN",
			};
			const DEFAULT: User = {
				_id: "-1",
				name: "Unknown",
				nickName: "Unknown",
				email: "unknown",
				type: "NORMAL",
			};

			switch (email) {
				case "johndoe@gmail.com":
					state.user = JOHN_DOE;
					break;
				case "janetstones@gmail.com":
					state.user = JANET_STONES;
					break;
				case "nonsoali@gmail.com":
					state.user = NONSO_ALI;
					break;
				case "drewberry@gmail.com":
					state.user = DREW_BERRY;
					break;
				default:
					state.user = DEFAULT;
			}
			state.isAuthenticated = true;
			state.token = "user_token";
		},
		userLoggedOut(state) {
			//TODO: Logout functionality, add logic to clear information from other slices and states
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;
		},
		userRegistered(state, action: PayloadAction<Register>) {},
		userForgotPassword(state, action: PayloadAction<ForgotPassword>) {
			//TODO: Logic for forgot password
		},
		userResetPassword(state, action: PayloadAction<ResetPassword>) {
			const { email, newPassword } = action.payload;
			//TODO: Logic to change password
		},
		userVerifiedOtp(state, action: PayloadAction<VerifyOtp>) {
			//TODO: Logic to verify otp
		},
	},
	selectors: {
		selectCurrentUser: (state: AuthState) => state.user,
	},
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const { selectCurrentUser } = authSlice.selectors;

export default authSlice.reducer;

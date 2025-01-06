import { getData, postData } from "@helpers/APIFunction";
import { createAppAsyncThunk } from "@hooks/createAppAsyncThunk";
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
	error: Record<string, string>;
	status: "idle" | "loading" | "succeeded" | "failed";
	user: User;
	token: string;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	error: null,
	status: "idle",
	user: null,
	token: null,
	isAuthenticated: false,
};

export const loginUser = createAppAsyncThunk("auth/login", async ({ email, password }: Login, { getState, dispatch }) => {
	type UserLoginResult = { token: string } | string; //NOTE: All these won't be necessary when the api is fixed and starts returning json objects for invalid credentials
	try {
		const loggedInUser: UserLoginResult = await postData("/auth/signin", { email, password });
		console.log(loggedInUser);
		if (typeof loggedInUser === "object" && loggedInUser.token) {
			console.log("User log in successful!");
			dispatch(addRandomUser());
		} else if (typeof loggedInUser === "string" && loggedInUser.includes("Invalid credentials")) {
			//NOTE: This won't be necessary when the api is fixed and starts returning json objects for invalid credentials
			console.log("Email or password invalid!");
			dispatch(addInvalidCredentialsPlaceholder());
		} else {
			console.log("Unknown result from login...");
			dispatch(addUnknownUser());
		}

		// return loggedInUser;
	} catch (error) {
		console.log("Error while fetching: " + JSON.stringify(error));
		dispatch(addInvalidCredentialsPlaceholder());
	}

	console.log("Completed!");
});

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		addUnknownUser(state) {
			const DEFAULT: User = {
				_id: "-1",
				name: "Unknown",
				nickName: "Unknown",
				email: "unknown",
				type: "NORMAL",
			};
			state.user = DEFAULT;
		},
		addInvalidCredentialsPlaceholder(state) {
			const INVALID_CREDENTIALS: User = {
				_id: "-1",
				name: "Invalid Credentials",
				nickName: "Invalid",
				email: "invalidcredentials@gmail.com",
				type: "NORMAL",
			};
			state.user = INVALID_CREDENTIALS;
		},
		addRandomUser(state) {
			const NONSO_ALI: User = {
				_id: "3",
				name: "Nonso Ali",
				nickName: "Nonso",
				email: "nonsoali@gmail.com",
				type: "NORMAL",
			};
			state.user = NONSO_ALI;
		},
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

export const { addUnknownUser, addInvalidCredentialsPlaceholder, addRandomUser, userLoggedIn, userLoggedOut } = authSlice.actions;

export const { selectCurrentUser } = authSlice.selectors;

export default authSlice.reducer;

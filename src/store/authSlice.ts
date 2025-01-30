import { getData, postData } from "@helpers/APIFunction";
import { createAppAsyncThunk } from "@hooks/createAppAsyncThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { fetchUsers } from "./usersSlice";

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
	email: string;
	firstname: string;
	lastname: string;
	dateofbirth: string;
	gender: string;
	address: string;
	phonenumber: string;
	password: string;
	isVerified: boolean;
	otp: string;
	otpExpires: string;
	type: "NORMAL" | "ARTISAN";
}

type authUser = Pick<User, "_id" | "email" | "firstname" | "lastname">;

export interface AuthState {
	error: Record<string, string>;
	status: "idle" | "loading" | "succeeded" | "failed";
	user: authUser;
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

export const loginUser = createAppAsyncThunk("auth/login", async ({ email, password }: Login, { getState, dispatch, rejectWithValue }) => {
	// // type UserLoginResult = { token: string } | string; //NOTE: All these won't be necessary when the api is fixed and starts returning json objects for invalid credentials
	type UserLoginResult = { token: string } | string;
	// try {
	// 	const loggedInUser: UserLoginResult = await postData("/auth/signin", { email, password });
	// 	console.log("Logged In User: ", loggedInUser);
	// 	if (typeof loggedInUser === "object" && loggedInUser.token) {
	// 		const decodedUser = jwtDecode<authUser>(loggedInUser.token);
	// 		console.log(decodedUser);
	// 		console.log("User log in successful!");
	// 		dispatch(addUser({ ...decodedUser, token: loggedInUser.token }));
	// 		return { ...decodedUser, token: loggedInUser.token };
	// 	} else if (typeof loggedInUser === "string" && loggedInUser.includes("Invalid credentials")) {
	// 		console.log("Email or password invalid!");
	// 		dispatch(addInvalidCredentialsPlaceholder());
	// 	} else {
	// 		console.log("Unknown result from login...");
	// 		dispatch(addUnknownUser());
	// 	}
	// 	// return loggedInUser;
	// } catch (error) {
	// 	// console.log("Error while fetching: " + JSON.stringify(error));
	// 	dispatch(addInvalidCredentialsPlaceholder());
	// }
	try {
		dispatch(setStatus("loading"));
		const response: UserLoginResult = await postData("/auth/signin", { email, password });

		if (typeof response === "object" && response.token) {
			const decoderUser = jwtDecode<authUser>(response.token);
			dispatch(addUser({ ...decoderUser, token: response.token }));
			dispatch(setStatus("succeeded"));
		} else if (typeof response === "string" && response.includes("Invalid")) {
			dispatch(setStatus("failed"));
			return rejectWithValue("Invalid Credentials");
		}
	} catch (error) {
		dispatch(setStatus("failed"));
		return rejectWithValue("Login Failed");
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setStatus(state, action: PayloadAction<AuthState["status"]>) {
			state.status = action.payload;
		},
		addUnknownUser(state) {
			const DEFAULT: User = {
				_id: "-1",
				firstname: "Unknown",
				email: "unknown",
				type: "NORMAL",
				lastname: "",
				dateofbirth: "",
				gender: "",
				address: "",
				phonenumber: "",
				password: "",
				isVerified: false,
				otp: "",
				otpExpires: "",
			};
			state.user = DEFAULT;
		},
		addInvalidCredentialsPlaceholder(state) {
			const INVALID_CREDENTIALS: User = {
				_id: "-1",
				firstname: "Invalid",
				email: "invalidcredentials@gmail.com",
				type: "ARTISAN",
				lastname: "",
				dateofbirth: "",
				gender: "",
				address: "",
				phonenumber: "",
				password: "",
				isVerified: false,
				otp: "",
				otpExpires: "",
			};
			state.user = INVALID_CREDENTIALS;
		},
		addRandomUser(state, action: PayloadAction<User>) {
			const NONSO_ALI: User = {
				_id: action.payload._id,
				firstname: action.payload.firstname,
				lastname: action.payload.lastname,
				gender: action.payload.gender,
				dateofbirth: action.payload.dateofbirth,
				otp: action.payload.otp,
				otpExpires: action.payload.otpExpires,
				phonenumber: action.payload.phonenumber,
				address: action.payload.address,
				isVerified: action.payload.isVerified,
				password: action.payload.password,
				email: action.payload.email,
				type: "NORMAL",
			};
			state.user = NONSO_ALI;
		},
		addUser(state, action: PayloadAction<authUser & { token: string }>) {
			const { _id, email, firstname, lastname, token } = action.payload;
			state.user = {
				_id,
				email,
				firstname,
				lastname,
				token,
			} as authUser;

			state.token = token;
			state.isAuthenticated = true;
			state.status = "succeeded";
			console.log("Token is : ", token);
		},
		userLoggedIn(state, action: PayloadAction<Login>) {
			const { email, password } = action.payload;
			//TODO: Login functionality

			// //NOTE: Dummy login functionality
			// const JOHN_DOE: User = {
			// 	_id: "1",
			// 	firstname: "John",
			// 	email: "johndoe@gmail.com",
			// 	type: "ARTISAN",
			// 	lastname: "",
			// 	dateofbirth: "",
			// 	gender: "",
			// 	address: "",
			// 	phonenumber: "",
			// 	password: "",
			// 	isVerified: false,
			// 	otp: "",
			// 	otpExpires: ""
			// };
			// const JANET_STONES: User = {
			// 	_id: "2",
			// 	name: "Janet Stones",
			// 	nickName: "Janet",
			// 	email: "janetstones@gmail.com",
			// 	type: "NORMAL",
			// };
			// const NONSO_ALI: User = {
			// 	_id: "3",
			// 	name: "Nonso Ali",
			// 	nickName: "Nonso",
			// 	email: "nonsoali@gmail.com",
			// 	type: "NORMAL",
			// };
			// const DREW_BERRY: User = {
			// 	_id: "4",
			// 	name: "Drew Berry",
			// 	nickName: "Drew",
			// 	email: "drewberry@gmail.com",
			// 	type: "ARTISAN",
			// };
			// const DEFAULT: User = {
			// 	_id: "-1",
			// 	name: "Unknown",
			// 	nickName: "Unknown",
			// 	email: "unknown",
			// 	type: "NORMAL",
			// };

			// switch (email) {
			// 	case "johndoe@gmail.com":
			// 		state.user = JOHN_DOE;
			// 		break;
			// 	case "janetstones@gmail.com":
			// 		state.user = JANET_STONES;
			// 		break;
			// 	case "nonsoali@gmail.com":
			// 		state.user = NONSO_ALI;
			// 		break;
			// 	case "drewberry@gmail.com":
			// 		state.user = DREW_BERRY;
			// 		break;
			// 	default:
			// 		state.user = DEFAULT;
			// }
			state.isAuthenticated = true;
			state.token = "user.token";
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
		selectLoginStatus: (state: AuthState) => state.status,
	},
});

export const { addUnknownUser, setStatus, addUser, addInvalidCredentialsPlaceholder, addRandomUser, userLoggedIn, userLoggedOut } = authSlice.actions;

export const { selectCurrentUser, selectLoginStatus } = authSlice.selectors;

export default authSlice.reducer;

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

export type Role = "user" | "artisan" | "admin";

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
	roles: Role[];
	// type: "NORMAL" | "ARTISAN";
}

type JwtDecodedUser = Pick<User, "_id" | "email" | "firstname" | "lastname" | "roles"> & { iat: number; exp: number };

type AuthUser = Pick<User, "_id" | "email" | "firstname" | "lastname" | "roles">;

export interface AuthState {
	error: { message: string };
	status: "idle" | "loading" | "succeeded" | "failed";
	user: AuthUser;
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

type ValidationError = {
	location?: string;
	msg?: string;
	path?: string;
	type?: string;
	value?: string;
};

type ApiUser = {
	token: string;
	user: {
		_id: string;
		email: string;
		roles: string[];
	};
};

type UserLoginResult = ApiUser | { error: string } | { errors: ValidationError[] };

export const loginUser = createAppAsyncThunk<{ user: AuthUser; token: string }, Login>(
	"auth/login",
	async ({ email, password }: Login, { getState, dispatch, rejectWithValue }) => {
		try {
			const response = await postData<UserLoginResult>("/auth/signin", {
				email,
				password,
			});

			if (typeof response === "string") {
				return rejectWithValue(response);
			}

			if ("token" in response) {
				const decodedUser = jwtDecode<JwtDecodedUser>(response.token);
				const user: AuthUser = { ...decodedUser };
				return {
					user,
					token: response.token,
				};
			}

			if ("error" in response) {
				return rejectWithValue(response.error);
			}

			if ("errors" in response) {
				const errorFields = response.errors.map((specificError) => specificError.path).join(", ");
				return rejectWithValue(`Errors on ${errorFields} fields`);
			}

			// if (typeof response === "object") {
			// 	if (response.token) {
			// 		const decodedUser = jwtDecode<ApiAuthUser>(response.token);
			// 		console.log("Decoded User information: ", decodedUser);
			// 		// dispatch(addUser({ ...decodedUser, token: response.token }));
			// 		const user: AuthUser = { ...decodedUser };
			// 		return {
			// 			user,
			// 			token: response.token,
			// 		};
			// 	} else if (response.errors) {
			// 		let errorFields = ""; //TODO: Get the error fields and add them to the error message using a comma separating format. Eg error message: "Errors on email, firstname, gender fields".
			// 		const moreThanOneError = response.errors.length > 1;
			// 		response.errors.forEach((error, index) => {
			// 			errorFields += error.path;
			// 			if (index < response.errors.length - 1)
			// 				errorFields += ", ";
			// 		});
			// 		const errorMessage = `Error${
			// 			moreThanOneError ? "s" : ""
			// 		} on ${errorFields} field${moreThanOneError ? "s" : ""}`;
			// 		return rejectWithValue(errorMessage);
			// 	}

			return rejectWithValue("An unexpected error occured");
		} catch (error) {
			console.error("Login Error:", error);
			return rejectWithValue(error.message || "Login Failed");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		resetAuthError(state) {
			state.error = null;
		},
		resetAuthStatus(state) {
			state.status = "idle";
		},
		addUnknownUser(state) {
			const DEFAULT: User = {
				_id: "-1",
				firstname: "Unknown",
				email: "unknown",
				roles: ["user"],
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
				roles: ["user", "artisan"],
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
				roles: ["user"],
			};
			state.user = NONSO_ALI;
		},
		// addUser(state, action: PayloadAction<AuthUser & { token: string }>) {
		// 	const { _id, token} = action.payload;
		// 	console.log("ID: " + _id);
		//     state.user = action.payload;
		// 	state.token = token;
		// 	state.isAuthenticated = true;
		// 	state.status = "succeeded";
		// 	console.log("Token is : ", token);
		// },
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
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = { message: action.payload as string };
			});
	},
	selectors: {
		selectCurrentUser: (state: AuthState) => state.user,
		selectAuthStatus: (state: AuthState) => state.status,
		selectAuthError: (state: AuthState) => state.error,
	},
});

export const { addUnknownUser, resetAuthError, resetAuthStatus, addInvalidCredentialsPlaceholder, addRandomUser, userLoggedOut } = authSlice.actions;

export const { selectCurrentUser, selectAuthStatus, selectAuthError } = authSlice.selectors;

export default authSlice.reducer;

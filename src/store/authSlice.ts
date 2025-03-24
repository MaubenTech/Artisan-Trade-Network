import { getData, postData } from "@helpers/APIFunction";
import { createAppAsyncThunk } from "@hooks/createAppAsyncThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { fetchUsers } from "./usersSlice";
import { generatePostAsyncThunk } from "@helpers/utils";

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

interface CheckEmail {
	exists: boolean;
	message: string;
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
	isNewAccount: boolean;
	otpEmail: string;
	signupEmail: string;
	forgotPasswordEmail: string;
	resetValidationCode: string;
}

const initialState: AuthState = {
	error: null,
	status: "idle",
	user: null,
	token: null,
	isAuthenticated: false,
	isNewAccount: false,
	otpEmail: null,
	signupEmail: null,
	forgotPasswordEmail: null,
	resetValidationCode: null,
};

export type ValidationError = {
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

type UserLoginResult = ApiUser | { error: string } | { errors: ValidationError[] }; //ApiUser = SuccessfulUserLoginResult

type LoginParams = { email: string; password: string };
type LoginResult = ApiUser;
type LoginThunkResult = { user: AuthUser; token: string };

export const loginUser = generatePostAsyncThunk<LoginResult, LoginThunkResult, LoginParams>("auth/login", "/auth/signin", "token", (result) => {
	const decodedUser = jwtDecode<JwtDecodedUser>(result.token);
	const user: AuthUser = { ...decodedUser };
	return {
		user,
		token: result.token,
	};
});

// export const loginUser2 = createAppAsyncThunk<{ user: AuthUser; token: string }, Login>(
// 	"auth/login",
// 	async ({ email, password }: Login, { getState, dispatch, rejectWithValue }) => {
// 		try {
// 			const response = await postData<UserLoginResult>("/auth/signin", {
// 				email,
// 				password,
// 			});

// 			if (typeof response === "string") {
// 				return rejectWithValue(response);
// 			}

// 			if ("token" in response) {
// 				const decodedUser = jwtDecode<JwtDecodedUser>(response.token);
// 				const user: AuthUser = { ...decodedUser };
// 				return {
// 					user,
// 					token: response.token,
// 				};
// 			}

// 			if ("error" in response) {
// 				return rejectWithValue(response.error);
// 			}

// 			if ("errors" in response) {
// 				const errorFields = response.errors.map((specificError) => specificError.path).join(", ");
// 				return rejectWithValue(`Errors on ${errorFields} fields`);
// 			}

// 			// if (typeof response === "object") {
// 			// 	if (response.token) {
// 			// 		const decodedUser = jwtDecode<ApiAuthUser>(response.token);
// 			// 		console.log("Decoded User information: ", decodedUser);
// 			// 		// dispatch(addUser({ ...decodedUser, token: response.token }));
// 			// 		const user: AuthUser = { ...decodedUser };
// 			// 		return {
// 			// 			user,
// 			// 			token: response.token,
// 			// 		};
// 			// 	} else if (response.errors) {
// 			// 		let errorFields = ""; //TODO: Get the error fields and add them to the error message using a comma separating format. Eg error message: "Errors on email, firstname, gender fields".
// 			// 		const moreThanOneError = response.errors.length > 1;
// 			// 		response.errors.forEach((error, index) => {
// 			// 			errorFields += error.path;
// 			// 			if (index < response.errors.length - 1)
// 			// 				errorFields += ", ";
// 			// 		});
// 			// 		const errorMessage = `Error${
// 			// 			moreThanOneError ? "s" : ""
// 			// 		} on ${errorFields} field${moreThanOneError ? "s" : ""}`;
// 			// 		return rejectWithValue(errorMessage);
// 			// 	}

// 			return rejectWithValue("An unexpected error occured");
// 		} catch (error) {
// 			console.error("Login Error:", error);
// 			return rejectWithValue(error.message || "Login Failed");
// 		}
// 	}
// );

type RegisterParams = {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	dateofbirth: string;
	gender: string;
	address: string;
	phonenumber: string;
};
type RegisterResult = { message: string };

export const registerUser = generatePostAsyncThunk<RegisterResult, RegisterResult, RegisterParams>(
	"auth/register",
	"/auth/signup",
	"message",
	(result, params) => result
);

type CompleteForgotPasswordResult = { message: string } | { error: string } | { errors: ValidationError[] };

type ForgotPasswordParams = { email: string };
type ForgotPasswordResult = { message: string };

export const forgotPassword = generatePostAsyncThunk<ForgotPasswordResult, ForgotPasswordParams, ForgotPasswordParams>(
	"auth/forgotPassword",
	"/auth/forgot-password",
	"message",
	(result, params) => {
		return params;
	}
);

// export const forgotPassword2 = createAppAsyncThunk<{ email: string }, { email: string }>(
// 	"auth/forgotPassword",
// 	async ({ email }, { getState, dispatch, rejectWithValue }) => {
// 		try {
// 			const result = await postData<ForgotPasswordResult>("/auth/forgot-password", { email });

// 			if (typeof result === "string") {
// 				return rejectWithValue(result);
// 			}

// 			if ("message" in result) {
// 				return { email };
// 			}

// 			if ("error" in result) {
// 				return rejectWithValue(result.error);
// 			}

// 			if ("errors" in result) {
// 				const errorFields = result.errors.map((specificError) => specificError.path).join(", ");
// 				return rejectWithValue(`Errors on ${errorFields} fields`);
// 			}
// 		} catch (error) {
// 			console.error("Forgot Password Error:", error);
// 			return rejectWithValue(error.message || "Forgot password failed");
// 		}
// 	}
// );

// export const verifyOtpSignup = generatePostAsyncThunk("auth/verifyOtpSignup");

type VerifyOtpType = "signup" | "forgotpassword";

type VerifyOtpParams = { email: string; otp: string };
type VerifyOtpResult = { resetValidationCode?: string; message: string };

export const verifyOtp = (type: VerifyOtpType) =>
	generatePostAsyncThunk<VerifyOtpResult, VerifyOtpResult, VerifyOtpParams>(
		"auth/verifyOtp",
		`/auth/verify-otp${type === "signup" ? "" : "-reset"}`,
		type === "forgotpassword" ? "resetValidationCode" : "message",
		(result, params) => {
			return result;
		}
	);

type ResetPasswordParams = { email: string; resetValidationCode: string; newPassword: string };
type ResetPasswordResult = { message: string };

export const resetPassword = generatePostAsyncThunk<ResetPasswordResult, ResetPasswordResult, ResetPasswordParams>(
	"auth/resetPassword",
	"/auth/reset-password",
	"message",
	(result, params) => {
		return result;
	}
);

type CheckEmailParams = { email: string };
type CheckEmailResult = { exists: boolean; message: string };

export const checkEmail = generatePostAsyncThunk<CheckEmailResult, CheckEmailResult, CheckEmailParams>(
	"auth/checkEmail",
	"/auth/check-email",
	"message",
	(result, params) => {
		return result;
	}
);

type ResendOtpParams = { email: string };
type ResendOtpResult = { message: string };
export const resendOtp = generatePostAsyncThunk<ResendOtpResult, ResendOtpResult, ResendOtpParams>(
	"auth/resendOtp",
	"/auth/resend-otp",
	"message",
	(result, params) => result
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAllAuth(state) {
			state.error = null;
			state.status = "idle";
			state.forgotPasswordEmail = null;
			state.signupEmail = null;
			state.otpEmail = null;
			state.resetValidationCode = null;
		},
		resetAuth(state) {
			state.error = null;
			state.status = "idle";
		},
		resetAuthError(state) {
			state.error = null;
		},
		resetAuthStatus(state) {
			state.status = "idle";
		},
		resetForgotPasswordFlow(state) {
			state.forgotPasswordEmail = null;
			state.resetValidationCode = null;
			state.error = null;
			state.status = "idle";
		},
		setSignupEmail(state, action) {
			state.signupEmail = action.payload;
		},
		// addUnknownUser(state) {
		// 	const DEFAULT: User = {
		// 		_id: "-1",
		// 		firstname: "Unknown",
		// 		email: "unknown",
		// 		roles: ["user"],
		// 		lastname: "",
		// 		dateofbirth: "",
		// 		gender: "",
		// 		address: "",
		// 		phonenumber: "",
		// 		password: "",
		// 		isVerified: false,
		// 		otp: "",
		// 		otpExpires: "",
		// 	};
		// 	state.user = DEFAULT;
		// },
		// addInvalidCredentialsPlaceholder(state) {
		// 	const INVALID_CREDENTIALS: User = {
		// 		_id: "-1",
		// 		firstname: "Invalid",
		// 		email: "invalidcredentials@gmail.com",
		// 		roles: ["user", "artisan"],
		// 		lastname: "",
		// 		dateofbirth: "",
		// 		gender: "",
		// 		address: "",
		// 		phonenumber: "",
		// 		password: "",
		// 		isVerified: false,
		// 		otp: "",
		// 		otpExpires: "",
		// 	};
		// 	state.user = INVALID_CREDENTIALS;
		// },
		// addRandomUser(state, action: PayloadAction<User>) {
		// 	const NONSO_ALI: User = {
		// 		_id: action.payload._id,
		// 		firstname: action.payload.firstname,
		// 		lastname: action.payload.lastname,
		// 		gender: action.payload.gender,
		// 		dateofbirth: action.payload.dateofbirth,
		// 		otp: action.payload.otp,
		// 		otpExpires: action.payload.otpExpires,
		// 		phonenumber: action.payload.phonenumber,
		// 		address: action.payload.address,
		// 		isVerified: action.payload.isVerified,
		// 		password: action.payload.password,
		// 		email: action.payload.email,
		// 		roles: ["user"],
		// 	};
		// 	state.user = NONSO_ALI;
		// },
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
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
				state.error = { message: action.payload as string };
			})
			.addCase(registerUser.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = { message: action.payload as string };
			})
			.addCase(forgotPassword.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.forgotPasswordEmail = action.payload.email;
				state.error = null;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.status = "failed";
				state.error = { message: action.payload as string };
			})
			.addCase(verifyOtp("signup").pending, (state) => {
				//NOTE: The verifyOtp("signup") will work for both signup and forgotpassword because they have the same action type/signature. The only difference is how they're generated.
				state.status = "loading";
				state.error = null;
			})
			.addCase(verifyOtp("signup").fulfilled, (state, action) => {
				//NOTE: The verifyOtp("signup") will work for both signup and forgotpassword because they have the same action type/signature. The only difference is how they're generated.
				state.status = "succeeded";
				const validationCode = action.payload.resetValidationCode;
				if (validationCode) state.resetValidationCode = validationCode;
				state.error = null;
			})
			.addCase(verifyOtp("signup").rejected, (state, action) => {
				//NOTE: The verifyOtp("signup") will work for both signup and forgotpassword because they have the same action type/signature. The only difference is how they're generated.
				state.status = "failed";
				state.error = { message: action.payload as string };
			})
			.addCase(resetPassword.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.status = "failed";
				state.error = { message: action.payload as string };
			})
			.addCase(checkEmail.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(checkEmail.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(checkEmail.rejected, (state, action) => {
				state.status = "failed";
				state.error = { message: action.payload as string };
			})
			.addCase(resendOtp.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(resendOtp.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(resendOtp.rejected, (state, action) => {
				state.status = "failed";
				state.error = { message: action.payload as string };
			});
	},
	selectors: {
		selectCurrentUser: (state: AuthState) => state.user,
		selectAuthStatus: (state: AuthState) => state.status,
		selectAuthError: (state: AuthState) => state.error,
		selectSignupEmail: (state: AuthState) => state.signupEmail,
		selectForgotPasswordEmail: (state: AuthState) => state.forgotPasswordEmail,
		selectResetValidationCode: (state: AuthState) => state.resetValidationCode,
		selectIsNewAccount: (state: AuthState) => state.isNewAccount,
	},
});

export const { resetAllAuth, resetAuthError, resetAuthStatus, resetForgotPasswordFlow, setSignupEmail, userLoggedOut } = authSlice.actions;

export const {
	selectCurrentUser,
	selectAuthStatus,
	selectAuthError,
	selectSignupEmail,
	selectForgotPasswordEmail,
	selectResetValidationCode,
	selectIsNewAccount,
} = authSlice.selectors;

export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OtpVerification from "@components/signupComponents/OtpVerification";

interface RegistrationState {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	email: string;
	phoneNumber: string;
	otpVerification: string;
	password: string;
	comfirmPassword: string;
}
const initialState: RegistrationState = {
	firstName: "",
	lastName: "",
	dateOfBirth: "",
	gender: "",
	address: "",
	email: "",
	phoneNumber: "",
	otpVerification: "",
	password: "",
	comfirmPassword: "",
};
const registrationSlice = createSlice({
	name: "registration",
	initialState,
	reducers: {
		userRegistered: (state, action: PayloadAction<RegistrationState>) => {
			const { payload } = action;
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
			state.dateOfBirth = payload.dateOfBirth;
			state.gender = payload.gender;
			state.address = payload.address;
			state.email = payload.email;
			state.phoneNumber = payload.phoneNumber;
			state.otpVerification = payload.otpVerification;
			state.password = payload.password;
			state.comfirmPassword = payload.comfirmPassword;
		},
	},
});
export default registrationSlice.reducer;

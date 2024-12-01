import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import JobHistory from "app/(customerPages)/(customerProfile)/JobHistory";
import OtpVerification from "app/(registration)/OtpVerification";

interface ProfileState {
	jobsDone: number;
	amountEarned: number;
	rating: number;
	bio: string;
	jobHistory: string;
	myRating: string;
}
const initialState: ProfileState = {
	jobsDone: 0,
	amountEarned: 0,
	rating: 0,
	bio: "",
	jobHistory: "",
	myRating: "",
};
const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		userRegistered: (state, action: PayloadAction<ProfileState>) => {
			const { payload } = action;
			state.jobsDone = payload.jobsDone;
			state.amountEarned = payload.amountEarned;
			state.rating = payload.rating;
			state.bio = payload.bio;
			state.jobHistory = payload.jobHistory;
			state.myRating = payload.myRating;
		},
	},
});
export default profileSlice.reducer;

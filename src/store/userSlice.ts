import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	id: number;
	email: string;
	type: "NORMAL" | "SERVICE_PROVIDER";
}

const initialState: UserState = {
	id: 1,
	email: "johndoe@gmail.com",
	type: "NORMAL",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	selectors: {
		selectUserType: (state: UserState) => state.type,
	},
});

export const {} = userSlice.actions;

export const { selectUserType } = userSlice.selectors;

export default userSlice.reducer;

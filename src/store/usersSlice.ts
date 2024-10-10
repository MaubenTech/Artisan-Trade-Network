import { createSlice } from "@reduxjs/toolkit";
import { selectUserEmail } from "./authSlice";
import { RootState } from "@store";

interface UserState {
	id: number;
	name: string;
	nickName: string;
	email: string;
	type: "NORMAL" | "SERVICE_PROVIDER";
}

const initialState: UserState[] = [
	{
		id: 1,
		name: "John Doe",
		nickName: "John",
		email: "johndoe@gmail.com",
		type: "SERVICE_PROVIDER",
	},
	{
		id: 2,
		name: "Janet Stones",
		nickName: "Janet",
		email: "janetstones@gmail.com",
		type: "NORMAL",
	},
	{
		id: 3,
		name: "Nonso Ali",
		nickName: "Nonso",
		email: "nonsoali@gmail.com",
		type: "NORMAL",
	},
];

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	selectors: {
		selectUserById: (state: UserState[], userId: number) => state.find((user) => user.id === userId),
		selectUserByEmail: (state: UserState[], userEmail: string) => state.find((user) => user.email === userEmail),
	},
});

export const {} = userSlice.actions;

export const { selectUserById, selectUserByEmail } = userSlice.selectors;

// export const selectUserByEmail = (state: RootState, userEmail: string) => state.users.find((user) => user.email === userEmail);

export const selectCurrentUser = (state: RootState): Partial<UserState> => {
	const email = selectUserEmail(state);
	// const password = selectUserPassword(state);

	return (
		selectUserByEmail(state, email) ?? {
			type: "NORMAL",
		}
	);
};

export default userSlice.reducer;

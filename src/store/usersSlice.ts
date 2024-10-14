import { createSlice } from "@reduxjs/toolkit";
import { selectUserEmail } from "./authSlice";
import { RootState } from "@store";
import createAppSelector from "@hooks/createAppSelector";

interface UserState {
	id: number;
	name: string;
	nickName: string;
	email: string;
	type: "NORMAL" | "ARTISAN";
}

const initialState: UserState[] = [
	{
		id: 1,
		name: "John Doe",
		nickName: "John",
		email: "johndoe@gmail.com",
		type: "ARTISAN",
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
		selectUserById: (users: UserState[], userId: number) => users.find((user) => user.id === userId),
		selectUserByEmail: (users: UserState[], userEmail: string) => users.find((user) => user.email === userEmail),
	},
});

export const {} = userSlice.actions;

export const { selectUserById, selectUserByEmail } = userSlice.selectors;

export const selectAllUsers = (state: RootState) => state.users;

// export const selectUserByEmail = (state: RootState, userEmail: string) => state.users.find((user) => user.email === userEmail);

// export const selectCurrentUser = (state: RootState): Partial<UserState> => {
// 	const email = selectUserEmail(state);
// 	// const password = selectUserPassword(state);

// 	return (
// 		selectUserByEmail(state, email) ?? {
// 			type: "NORMAL",
// 		}
// 	);
// };\

export const selectCurrentUser = createAppSelector([(state: RootState) => state, selectUserEmail], (state, email) => selectUserByEmail(state, email) ?? { type: "NORMAL" });
//TODO: When you actually start getting the current user, the selector should no longer be memoized as it will return a consistent reference. I'm memoizing just because of the new object returned if selectUserByEmail returns null or undefined

export default userSlice.reducer;

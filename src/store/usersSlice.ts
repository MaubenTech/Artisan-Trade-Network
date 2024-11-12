import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";

export interface UserState {
	_id: string;
	name: string;
	nickName: string;
	email: string;
	type: "NORMAL" | "ARTISAN";
}

const initialState: UserState[] = [
	{
		_id: "1",
		name: "John Doe",
		nickName: "John",
		email: "johndoe@gmail.com",
		type: "ARTISAN",
	},
	{
		_id: "2",
		name: "Janet Stones",
		nickName: "Janet",
		email: "janetstones@gmail.com",
		type: "NORMAL",
	},
	{
		_id: "3",
		name: "Nonso Ali",
		nickName: "Nonso",
		email: "nonsoali@gmail.com",
		type: "NORMAL",
	},
	{
		_id: "4",
		name: "Drew Berry",
		nickName: "Drew",
		email: "drewberry@gmail.com",
		type: "ARTISAN",
	},
];

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	selectors: {
		selectUsers: (users: UserState[]) => users,
		selectUserById: (users: UserState[], userId: string) => users.find((user) => user._id === userId),
		selectUserByEmail: (users: UserState[], email: string) => users.find((user) => user.email === email),
	},
});

export const {} = userSlice.actions;

export const { selectUsers, selectUserById, selectUserByEmail } = userSlice.selectors;

// export const selectUserByEmail = (users: UserState[], userEmail: string) => users.find((user) => user.email === userEmail);

// export const selectUserByEmail = createAppSelector([selectUsers, (_, userEmail: string) => userEmail], (users, userEmail) => users.find((user) => user.email === userEmail));

// export const selectUserByEmail = (stateOrUsers: RootState | UserState[], email: string): UserState | null => {
// 	// Check if the first argument is the full RootState
// 	if ("users" in stateOrUsers) {
// 		return stateOrUsers.users.find((user) => user.email === email) || null;
// 	} else {
// 		// If it's just the users slice (UserState[])
// 		return stateOrUsers.find((user) => user.email === email) || null;
// 	}
// };

export default userSlice.reducer;

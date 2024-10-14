import { createSlice } from "@reduxjs/toolkit";
import { selectCurrentUserEmail } from "./authSlice";
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
		selectUsers: (users: UserState[]) => users,
		selectUserById: (users: UserState[], userId: number) => users.find((user) => user.id === userId),
	},
});

export const {} = userSlice.actions;

export const { selectUsers, selectUserById } = userSlice.selectors;

// export const selectUserByEmail = (users: UserState[], userEmail: string) => users.find((user) => user.email === userEmail);

// export const selectUserByEmail = createAppSelector([selectUsers, (_, userEmail: string) => userEmail], (users, userEmail) => users.find((user) => user.email === userEmail));

export const selectUserByEmail = (stateOrUsers: RootState | UserState[], email: string): UserState | null => {
	// Check if the first argument is the full RootState
	if ("users" in stateOrUsers) {
		return stateOrUsers.users.find((user) => user.email === email) || null;
	} else {
		// If it's just the users slice (UserState[])
		return stateOrUsers.find((user) => user.email === email) || null;
	}
};

export const selectCurrentUser = createAppSelector([selectUsers, selectCurrentUserEmail], (users, userEmail) => selectUserByEmail(users, userEmail) || { nickName: "Unknown", type: "NORMAL" });
//FIXME: Input selectors should never use state => state as said by redux! https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization:~:text=Similarly%2C%20a%20memoized%20selector%20should%20never%20use%20state%20%3D%3E%20state%20as%20an%20input!%20That%20will%20force%20the%20selector%20to%20always%20recalculate.

//TODO: When you actually start getting the current user, the selector should no longer be memoized as it will return a consistent reference. I'm memoizing just because of the new object returned if selectUserByEmail returns null or undefined

export default userSlice.reducer;

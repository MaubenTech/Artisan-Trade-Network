import { getData } from "@helpers/APIFunction";
import { createAppAsyncThunk } from "@hooks/createAppAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

export interface User {
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
	nickName: string;
	type: "NORMAL" | "ARTISAN";
}

export const fetchUsers = createAppAsyncThunk<User[], void>("users/fetchUsers", async () => {
	const users = await getData<User[]>("/auth/users");
	const user = users.forEach((user) => {
		console.log(JSON.stringify(user, null, 2));
	});
	return users;
});

const initialState = [
	{
		_id: "1",
		email: "johndoe@gmail.com",
		firstname: "John Doe",
		nickName: "John",
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
] as Partial<User>[];

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	selectors: {
		selectUsers: (users: User[]) => users,
		selectUserById: (users: User[], userId: string) => users.find((user) => user._id === userId),
		selectUserByEmail: (users: User[], email: string) => users.find((user) => user.email === email),
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

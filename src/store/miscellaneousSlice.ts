import { createSlice } from "@reduxjs/toolkit";

interface Miscellaneous {
	isTabBarVisible: boolean;
}

const initialState: Miscellaneous = {
	isTabBarVisible: true,
};

const miscellaneousSlice = createSlice({
	name: "miscellaneous",
	initialState,
	reducers: {
		hideTabBar: (state) => {
			state.isTabBarVisible = false;
		},
		showTabBar: (state) => {
			state.isTabBarVisible = true;
		},
	},
});

export const { hideTabBar, showTabBar } = miscellaneousSlice.actions;

export default miscellaneousSlice.reducer;

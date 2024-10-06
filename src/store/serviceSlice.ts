import { createSlice } from "@reduxjs/toolkit";

interface Service {
	id: string;
	name: string;
	description: string;
	visible: boolean;
	image: string;
}

const initialState: Service[] = [
	{
		id: "60d5f9e8e979b20d5c8c8b2b",
		name: "Web Development",
		description: "Professional web development services",
		visible: true,
		image: "uploads/1624609234123.png",
	},
];

const serviceSlice = createSlice({
	name: "service",
	initialState,
	reducers: {},
});

export const {} = serviceSlice.actions;

export default serviceSlice.reducer;

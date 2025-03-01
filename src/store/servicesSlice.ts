import { getData } from "@helpers/APIFunction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Service {
	_id: string;
	name: string;
	description: string;
	visible: boolean;
	image: string;
	__v: number;
}

interface ServiceState {
	services: Service[];
}

export const fetchServices = createAsyncThunk("get/services", async ({}, { getState, dispatch, rejectWithValue }) => {
	try {
		console.log("Starting services..!");
		const services = await getData<Service[]>("/services");
		console.log("2. Services response:", services);

		if (!services) {
			console.log("No response from fetching services");
			return rejectWithValue("Error Fetching Services because there are no services");
		}

		console.log(
			"Service gotten",
			JSON.stringify(
				services.forEach((service) => service),
				null,
				2
			)
		);
		return services;
	} catch (error) {
		console.error("Error fetching services: ", error);
		return rejectWithValue(error.message || "Failed to get services");
	}
});

const initialState: ServiceState = {
	services: [
		{
			_id: "60d5f9e8e979b20d5c8c8b2b",
			name: "Web Development",
			description: "Professional web development services",
			visible: true,
			image: "uploads/1624609234123.png",
			__v: 0,
		},
	],
};

const serviceSlice = createSlice({
	name: "services",
	initialState,
	reducers: {},
	selectors: {
		selectServices: (services: ServiceState) => services.services,
	},
});

export const {} = serviceSlice.actions;

export const { selectServices } = serviceSlice.selectors;

export default serviceSlice.reducer;

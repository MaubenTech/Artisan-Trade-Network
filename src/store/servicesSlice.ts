import { getData } from "@helpers/APIFunction";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Service {
	_id: string;
	name: string;
	description: string;
	visible: boolean;
	image: string;
	__v: number;
}

interface ServiceState {
	services: Service[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

export const fetchServices = createAsyncThunk<Service[], void>("services/fetchServices", async (_, { rejectWithValue }) => {
	try {
		console.log("Starting services..!");
		const services = await getData<Service[]>("/services");

		if (!services || !Array.isArray(services)) {
			console.log("No valid response from fetching services");
			return rejectWithValue("Error fetching services: Invalid response format");
		}

		return services;
	} catch (error) {
		console.error("Error fetching services: ", error);
		return rejectWithValue(error.message || "Failed to get services");
	}
});

const initialState: ServiceState = {
	services: [
		// {
		// 	_id: "60d5f9e8e979b20d5c8c8b2b",
		// 	name: "Web Development",
		// 	description: "Professional web development services",
		// 	visible: true,
		// 	image: "uploads/1624609234123.png",
		// 	__v: 0,
		// },
	],
	status: "idle",
	error: null,
};

const serviceSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		// addToServiceList: (state, action: PayloadAction<Service>) => {
		// 	state.services.push(action.payload);
		// 	state.services.forEach((service) => console.log(service.name));
		// },
	},
	selectors: {
		selectServices: (services: ServiceState) => services.services,
		selectServicesStatus: (state: ServiceState) => state.status,
		selectServicesError: (state: ServiceState) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchServices.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchServices.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.services = action.payload;
				console.info("Services fetched successfully:", action.payload);
			})
			.addCase(fetchServices.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Unknown error occurred";
				console.error("Error fetching services:", action.error.message);
			});
	},
});

export const {} = serviceSlice.actions;

export const { selectServices, selectServicesStatus, selectServicesError } = serviceSlice.selectors;

export default serviceSlice.reducer;

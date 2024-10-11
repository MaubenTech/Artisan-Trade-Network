import { getData } from "@helpers/APIFunction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JobStatus } from "app/(home)/Jobs";

export interface Job {
	_id: string;
	title: string;
	type: string;
	description: string;
	budget: string;
	address: string;
	service: string;
	media: [
		{
			url: string;
			type: "image" | "video";
		}
	];
	userId: string;
	status: JobStatus;
	createdAt: string; //TODO: Check if this property can use the Date type instead of string, to keep formatting, etc.
	updatedAt: string; //TODO: Check if this property can use the Date type instead of string, to keep formatting, etc.
}

// export const fetchJobs = createAsyncThunk<Job[], void>("jobs/FetchJobs", async () => {
// 	const jobs = await getData<Job[]>("/jobs");
// 	return jobs;
// });

// const jobs = getData("/jobs");
// console.log("Jobs:", jobs);

interface JobState {
	jobs: Job[];
	loading: boolean;
	error: string | null;
}

const dummyJob: Job[] = [
	{
		_id: "1",
		title: "IDK",
		type: "Mechanic",
		description: "Well well well",
		budget: "50000",
		address: "No 1 Two Street, Three City, Four State",
		service: "A very good service",
		media: [
			{
				url: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
	},
];

const initialState: JobState = {
	jobs: [...dummyJob],
	loading: false,
	error: null,
};

const jobSlice = createSlice({
	name: "jobs",
	initialState,
	reducers: {},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchJobs.pending, (state) => {
	// 			state.loading = true;
	// 			state.error = null;
	// 		})
	// 		.addCase(fetchJobs.fulfilled, (state, action) => {
	// 			state.loading = false;
	// 			state.error = null;
	// 			// state.jobs = action.payload;
	// 		})
	// 		.addCase(fetchJobs.rejected, (state, action) => {
	// 			state.loading = false;
	// 			state.error = action.error.message || "Failed to fetch Jobs";
	// 			console.error("Failed to fetch Jobs");
	// 		});
	// },
	// TODO: When we start connecting to the api, this becomes useful
});

export const {} = jobSlice.actions;

export default jobSlice.reducer;

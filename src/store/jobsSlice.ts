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
	createdAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
	updatedAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
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
		title: "Need to repair my toilet",
		type: "Maintenance",
		description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				url: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "2",
		title: "Need to repair my toilet again",
		type: "Maintenance",
		description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				url: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "3",
		title: "A new job for anyone",
		type: "Maintenance",
		description: "My car is refusing to start. Can someone help me please?",
		budget: "100,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Mechanic",
		media: [
			{
				url: "nothing_yet",
				type: "image",
			},
		],
		userId: "2",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
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
	selectors: {
		selectJobById: (state, jobId) => state.jobs.find((job) => job._id === jobId),
	},
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

export const { selectJobById } = jobSlice.selectors;

export default jobSlice.reducer;

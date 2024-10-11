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

const fetchJobs = createAsyncThunk('jobs/FetchJobs', async () => {
	const jobs = await getData('/jobs');
	return jobs;
})

const initialState: Job[] = [{
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
}];

const jobSlice = createSlice({
	name: "job",
	initialState,
	reducers: {},
});

export const {} = jobSlice.actions;

export default jobSlice.reducer;

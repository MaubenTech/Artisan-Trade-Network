import { createSlice } from "@reduxjs/toolkit";
import { JobStatus } from "app/(home)/Jobs";

interface Job {
	_id: string;
	jobtitle: string;
	jobtype: string;
	jobdescription: string;
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
	createdAt: Date;
	updatedAt: Date;
}

const initialState: Job = {
	_id: "1",
	jobtitle: "IDK",
	jobtype: "Mechanic",
	jobdescription: "Well well well",
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
	createdAt: new Date(),
	updatedAt: new Date(),
};

const jobSlice = createSlice({
	name: "job",
	initialState,
	reducers: {},
});

export const {} = jobSlice.actions;

export default jobSlice.reducer;
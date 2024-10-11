import { createSlice } from "@reduxjs/toolkit";
import { BidStatus } from "app/(home)/Bids";

interface Bid {
	_id: string;
	artisanId: string;
	jobId: string;
	bidPrice: number;
	description: string;
	status: BidStatus;
	createdAt: string; //TODO: Check if this property can use the Date type instead of string, to keep formatting, etc.
}

const initialState: Bid[] = [
	{
		_id: "1",
		artisanId: "1",
		jobId: "1",
		bidPrice: 50000,
		description: "A bid for a job",
		status: "Pending",
		createdAt: new Date().toString(),
	},
	{
		_id: "2",
		artisanId: "2",
		jobId: "2",
		bidPrice: 50000,
		description: "A bid for a second job",
		status: "Pending",
		createdAt: new Date().toString(),
	},
];

const bidSlice = createSlice({
	name: "bid",
	initialState,
	reducers: {},
});

export const {} = bidSlice.actions;

export default bidSlice.reducer;

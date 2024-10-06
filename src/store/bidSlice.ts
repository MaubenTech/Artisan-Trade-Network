import { createSlice } from "@reduxjs/toolkit";
import { BidStatus } from "app/(home)/Bids";

interface Bid {
	_id: string;
	artisanId: string;
	jobId: string;
	bidPrice: number;
	description: string;
	status: BidStatus;
	createdAt: Date;
}

const initialState: Bid[] = [
	{
		_id: "1",
		artisanId: "1",
		jobId: "1",
		bidPrice: 50000,
		description: "A bid for a job",
		status: "Pending",
		createdAt: new Date(),
	},
	{
		_id: "2",
		artisanId: "2",
		jobId: "2",
		bidPrice: 50000,
		description: "A bid for a second job",
		status: "Pending",
		createdAt: new Date(),
	},
];

const bidSlice = createSlice({
	name: "bid",
	initialState,
	reducers: {},
});

export const {} = bidSlice.actions;

export default bidSlice.reducer;

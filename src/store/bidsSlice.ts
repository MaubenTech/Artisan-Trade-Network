import createAppSelector from "@hooks/createAppSelector";
import { createSlice } from "@reduxjs/toolkit";
import { BidStatus } from "app/(home)/Bids";
import { selectJobById } from "./jobsSlice";

export interface BidState {
	_id: string;
	artisanId: string;
	jobId: string;
	bidPrice: string;
	description?: string;
	status: BidStatus;
	createdAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
}

const initialState: BidState[] = [
	{
		_id: "1",
		artisanId: "1",
		jobId: "1",
		bidPrice: "50,000",
		// description: "A bid for a job", // Commented out so the bid uses the job's description
		status: "Pending",
		createdAt: new Date(2024, 9, 14, 4, 28, 52).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "2",
		artisanId: "1",
		jobId: "2",
		bidPrice: "60,000",
		// description: "A bid for a second job", // Commented out so the bid uses the job's description
		status: "Pending",
		createdAt: new Date(2024, 9, 14, 4, 28, 52).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
];

const bidSlice = createSlice({
	name: "bid",
	initialState,
	reducers: {},
	selectors: {},
});

export const {} = bidSlice.actions;

export default bidSlice.reducer;

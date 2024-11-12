import createAppSelector from "@hooks/createAppSelector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BidJob, BidStatus } from "app/(tabs)/Bids";
import { selectAllJobs, selectJobById, selectJobsState } from "./jobsSlice";
import { RootState } from "@store";

export interface Bid {
	_id: string;
	artisanId: string;
	jobId: string;
	bidPrice: number;
	description?: string;
	status: BidStatus;
	createdAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
}

const initialState: Bid[] = [
	{
		_id: "1",
		artisanId: "1",
		jobId: "5",
		bidPrice: 50000,
		description: "I'm only available on weekends", // Commented out so the bid uses the job's description
		status: "Bid",
		createdAt: new Date(2024, 9, 14, 4, 28, 52).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "2",
		artisanId: "4",
		jobId: "5",
		bidPrice: 60000,
		description: "When will you be available for the job?", // Commented out so the bid uses the job's description
		status: "Bid",
		createdAt: new Date(2024, 9, 14, 4, 28, 52).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "3",
		artisanId: "1",
		jobId: "6",
		bidPrice: 100000,
		description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
		status: "Bid",
		createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "4",
		artisanId: "4",
		jobId: "6",
		bidPrice: 100000,
		description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
		status: "Bid",
		createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "5",
		artisanId: "1",
		jobId: "8",
		bidPrice: 100000,
		description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
		status: "Bid",
		createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "6",
		artisanId: "4",
		jobId: "8",
		bidPrice: 100000,
		description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
		status: "Bid",
		createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "7",
		artisanId: "1",
		jobId: "9",
		bidPrice: 100000,
		description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
		status: "Pending",
		createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "8",
		artisanId: "4",
		jobId: "10",
		bidPrice: 100000,
		description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
		status: "Pending",
		createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
];

const bidSlice = createSlice({
	name: "bids",
	initialState,
	reducers: {
		placeBid: (state, action: PayloadAction<{ bidPrice: number; jobId: string; artisanId: string; description: string }>) => {
			const { bidPrice, jobId, artisanId, description } = action.payload;
			const bid: Pick<Bid, "jobId" | "bidPrice" | "description"> = {
				//FIXME: Artisan ID should also be passed when creating the bid for identification purposes, but for now, the swagger docs doesn't support that
				jobId,
				bidPrice,
				description,
			};

			//TODO: Logic to place bid in the backend

			const createdBid: Bid = {
				...bid,
				_id: state.length + "", //Normally, it's meant to be state.length-1, but since the length will be increased after pushing the createdBid, I left it this way
				artisanId: artisanId,
				status: "Bid",
				createdAt: new Date().toLocaleDateString(),
			};

			state.push(createdBid);
		},
		approveBid: (state, action: PayloadAction<{ bidId: String; jobId: string }>) => {
			const { bidId, jobId } = action.payload;
			//TODO: Logic to approve bid in the backend
			state.find((bid) => bid._id === bidId).status = "Pending";
		},
		approveAcceptedBid: (state, action: PayloadAction<{ bidId: string }>) => {
			// To approve bid after it has been confirmed by the creator
			//Logic to make sure only the first approval makes it through
			const { bidId } = action.payload;

			//TODO: Logic to approve accepted bid in the backend
			state.find((bid) => bid._id === bidId).status = "Approved";
		},
		rejectAcceptedBid: (state, action: PayloadAction<{ bidId: string }>) => {
			// To reject bid after it has been confirmed by the creator
			const { bidId } = action.payload;

			//TODO: Logic to reject accepted bid in the backend
			state.find((bid) => bid._id === bidId).status = "Rejected";
		},
	},
	selectors: {
		selectBids: (state: Bid[]) => state,
		selectBidById: (state: Bid[], bidId: string) => state.find((bid) => bid._id === bidId),
		selectFirstBidByJobId: (state: Bid[], jobId: string) => state.find((bid) => bid.jobId === jobId),
		selectBidByJobIdAndArtisanId: (state, jobId: string, artisanId: string) => state.find((bid) => bid.jobId === jobId && bid.artisanId === artisanId), //NOTE: This should accurately select just one bid as only an artisan can have only one bid per job, effectively making jobId+artisanId a composite primary key for bids
		// selectBidJob: (state: BidState[], bidId: string) => state
	},
});

export const { placeBid, approveBid, approveAcceptedBid, rejectAcceptedBid } = bidSlice.actions;

export const { selectBids, selectBidById, selectFirstBidByJobId, selectBidByJobIdAndArtisanId } = bidSlice.selectors;

export const selectBidsByJobId = createAppSelector([selectBids, (state, jobId: string) => jobId], (bids, jobId) => {
	return bids.filter((bid) => bid.jobId === jobId);
});

export const selectBidJobByBidId = createAppSelector([selectAllJobs, selectBidById], (jobList, bid) => {
	const job = selectJobById(jobList, bid.jobId);
	const bidJob: BidJob = { ...job, ...bid };
	return bidJob;
});

export const selectBidJobs = createAppSelector([selectJobsState, selectBids], (jobsState, bids) =>
	bids.map((bid) => {
		const job = selectJobById(jobsState, bid.jobId);
		const bidJob: BidJob = { ...job, ...bid };
		return bidJob;
	})
);

export const selectRecommendedBids = createAppSelector([selectBids], (bids) => bids.slice(0, 3));

export const selectRecommendedBidJobs = createAppSelector([selectJobsState, selectRecommendedBids], (jobsState, recommendedBids) =>
	recommendedBids.map((recommendedBid) => {
		const job = selectJobById(jobsState, recommendedBid.jobId);
		const bidJob: BidJob = { ...job, ...recommendedBid };
		return bidJob;
	})
);

export default bidSlice.reducer;

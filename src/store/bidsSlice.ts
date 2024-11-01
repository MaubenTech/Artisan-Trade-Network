import createAppSelector from "@hooks/createAppSelector";
import { createSlice } from "@reduxjs/toolkit";
import { BidJob, BidStatus } from "app/(home)/Bids";
import { selectJobById, selectJobsState } from "./jobsSlice";
import { RootState } from "@store";

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
        description: "I'm only available on weekends", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 4, 28, 52).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "2",
        artisanId: "1",
        jobId: "2",
        bidPrice: "60,000",
        description: "When will you be available for the job?", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 4, 28, 52).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "3",
        artisanId: "1",
        jobId: "3",
        bidPrice: "100,000",
        description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "3",
        artisanId: "1",
        jobId: "3",
        bidPrice: "100,000",
        description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "3",
        artisanId: "1",
        jobId: "3",
        bidPrice: "100,000",
        description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "3",
        artisanId: "1",
        jobId: "3",
        bidPrice: "100,000",
        description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "3",
        artisanId: "1",
        jobId: "3",
        bidPrice: "100,000",
        description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "3",
        artisanId: "1",
        jobId: "3",
        bidPrice: "100,000",
        description: "I'll help you fix it in no time!", // Commented out so the bid uses the job's description
        status: "Pending",
        createdAt: new Date(2024, 9, 14, 17, 50, 18).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
];

const bidSlice = createSlice({
    name: "bids",
    initialState,
    reducers: {},
    selectors: {
        selectBids: (state: BidState[]) => state,
        selectBidById: (state: BidState[], bidId: string) => state.find((bid) => bid._id === bidId),
        // selectBidJob: (state: BidState[], bidId: string) => state
    },
});

export const {} = bidSlice.actions;

export const { selectBids, selectBidById } = bidSlice.selectors;

export const selectBidJobByBidId = createAppSelector([(state: RootState) => state, selectBidById], (state, bid) => {
    //FIXME: Input selectors should never use state => state as said by redux! https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization:~:text=Similarly%2C%20a%20memoized%20selector%20should%20never%20use%20state%20%3D%3E%20state%20as%20an%20input!%20That%20will%20force%20the%20selector%20to%20always%20recalculate.
    const job = selectJobById(state, bid.jobId);
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

export const selectRecommendedBidJobs = createAppSelector(
    [selectJobsState, selectRecommendedBids],
    (jobsState, recommendedBids) =>
        recommendedBids.map((recommendedBid) => {
            const job = selectJobById(jobsState, recommendedBid.jobId);
            const bidJob: BidJob = { ...job, ...recommendedBid };
            return bidJob;
        })
);

export default bidSlice.reducer;

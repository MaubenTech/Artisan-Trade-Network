import { approveAcceptedBid, selectBidById } from "@store/bidsSlice";
import { selectJobById, updateJobStatus } from "@store/jobsSlice";

const approveAcceptedBidMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	//TODO: Make sure approval for accepted bid is the first for the job, ie. Job is not yet active already! - Done!

	//TODO: Normally this middleware is meant to be called after the approveAcceptedBid reducer function is ran, but it intercepts the action before it gets to the reducer, hence resulting in the job being changed to active before the being is completely accepted.
	//Two ways to solve this:
	//      1. Make sure the middleware runs AFTER the reducer function (Idk how possible that one is) - Done!.
	//      2. Listen for the fulfilled and rejected states of the async function and reverse the job status if the call didn't make it through (NOTE: This will mean double requests to the backend)
	if (action.type === approveAcceptedBid.type) {
		console.log("Getting there...");
		const { bidId } = action.payload;
		const state = store.getState();
		const { jobId, status: bidStatus } = selectBidById(state, bidId);
		if (bidStatus === "Approved") {
			const job = selectJobById(state, jobId);
			if (job.status !== "Active") {
				console.log("Job is not active!");
				//TODO: Logic to approveAcceptedBid in the backend
				//TODO: Logic to update job status to active in the backend
				// Dispatch an action to update job status
				store.dispatch(updateJobStatus({ jobId, jobStatus: "Active" }));
			}
		}
	}

	// return next(action); // Pass the action along the middleware chain
	return result; // Pass the action along the middleware chain
};

export default approveAcceptedBidMiddleware;

import { getData } from "@helpers/APIFunction";
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { JobStatus } from "app/(tabs)/Jobs";
import * as ImagePicker from "expo-image-picker";
import { approveAcceptedBid } from "./bidsSlice";
import createAppSelector from "@hooks/createAppSelector";
import { selectCurrentUser } from "./authSlice";

export type PartialPickerAsset = Partial<ImagePicker.ImagePickerAsset>;

export interface Job {
	_id: string;
	title: string;
	type: string;
	description: string;
	budget: string;
	address: string;
	service: string;
	media: PartialPickerAsset[];
	userId: string;
	status: JobStatus;
	createdAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
	updatedAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
}

export type JobType = "Installation" | "Maintainence";

export const fetchJobs = createAsyncThunk<Job[], void>("jobs/FetchJobs", async () => {
	const jobs = await getData<Job[]>("/jobs");
	return jobs;
}, {
	condition(arg, api) {
		const jobsStatus = selectJobStatus(api.getState() as RootState)
		if(jobsStatus !== 'idle') return false
	},
}
);

const jobs = getData("/jobs");
console.log("Jobs:", jobs);

interface JobState {
	jobList: Job[];
	currentJob: Partial<Job>;
	// loading: boolean;
	error: string | null;
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
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
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Active",
		createdAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "2",
		title: "Need to repair my toilet again",
		type: "Maintenance",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Active",
		createdAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "3",
		title: "A new job for anyone! My car is acting up!",
		type: "Maintenance",
		description: "My car is refusing to start. Can someone help me please?",
		budget: "100,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Mechanic",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "2",
		status: "Active",
		createdAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "4",
		title: "Need to repair my toilet",
		type: "Maintenance",
		description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Completed",
		createdAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "5",
		title: "Need to repair my toilet again",
		type: "Maintenance",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "6",
		title: "A new job for anyone! My car is acting up!",
		type: "Maintenance",
		description: "My car is refusing to start. Can someone help me please?",
		budget: "100,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Mechanic",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "2",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "7",
		title: "Need to repair my toilet",
		type: "Maintenance",
		description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "8",
		title: "I need to make my hair!",
		type: "Maintenance",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "9",
		title: "A new job for anyone! My car is acting up!",
		type: "Maintenance",
		description: "My car is refusing to start. Can someone help me please?",
		budget: "100,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Mechanic",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "2",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "10",
		title: "My Rolls Royce is looking pretty mashed up!",
		type: "Maintenance",
		description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "500,000 - 700,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Mechanic",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 7, 31).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "11",
		title: "Need to repair my toilet again",
		type: "Maintenance",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
		budget: "50,000 - 70,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Plumbering",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "1",
		status: "Posted",
		createdAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 8, 20).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
	{
		_id: "12",
		title: "A new job for anyone! My car is acting up!",
		type: "Maintenance",
		description: "My car is refusing to start. Can someone help me please?",
		budget: "100,000",
		address: "No 1 Two Street, Three City, Four State",
		service: "Mechanic",
		media: [
			{
				uri: "nothing_yet",
				type: "image",
			},
		],
		userId: "2",
		status: "Completed",
		createdAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
		updatedAt: new Date(2024, 9, 14, 4, 9, 44).toLocaleDateString(), //NOTE: The month param uses index, so January is 0, not 1.
	},
];

const initialState: JobState = {
	jobList: [],
	// jobList: [],
	currentJob: {
		media: [],
	},
	status: 'idle',
	error: null,
};

const jobSlice = createSlice({
	name: "jobs",
	initialState,
	reducers: {
		addNewJob: (state, action: PayloadAction<Job>) => {
			state.jobList.push(action.payload);
			state.jobList.forEach((job) => console.log("Update Job List : " + JSON.stringify(job)));
		},
		updateJobStatus: (state, action: PayloadAction<{ jobId: string; jobStatus: JobStatus }>) => {
			const job = state.jobList.find((job) => job._id === action.payload.jobId);
			if (job) job.status = action.payload.jobStatus;
		},
		markJobCompleted: (state, action: PayloadAction<string>) => {
			const jobId = action.payload;
			const job = state.jobList.find((job) => job._id === jobId);
			if (job) job.status = "Completed";
			console.info(job.status);
			// state.jobList[0].status = "Completed";
		},
		cancelJob: (state, action: PayloadAction<string>) => {
			const jobId = action.payload;
			const job = state.jobList.find((job) => job._id === jobId);
			job.status = "Cancelled";
			console.info(job.status);
		},
		setJobTitle: (state, action: PayloadAction<string>) => {
			state.currentJob.title = action.payload;
		},
		setJobType: (state, action: PayloadAction<string>) => {
			state.currentJob.type = action.payload;
		},
		setJobDescription: (state, action: PayloadAction<string>) => {
			state.currentJob.description = action.payload;
		},
		setJobBudget: (state, action: PayloadAction<string>) => {
			state.currentJob.budget = action.payload;
		},
		setJobAddress: (state, action: PayloadAction<string>) => {
			state.currentJob.address = action.payload;
		},
		setJobService: (state, action: PayloadAction<string>) => {
			state.currentJob.service = action.payload;
		},
		setJobMedia: (state, action: PayloadAction<PartialPickerAsset[]>) => {
			state.currentJob.media = action.payload;
		},
		submitJob: (state) => {
			if (state.currentJob.title) {
				const newJob = {
					...state.currentJob,
					_id: String(state.jobList.length + 1),
					userId: "current_user_id",
					status: "Posted",
					createdAt: new Date().toLocaleDateString(),
					updatedAt: new Date().toLocaleDateString(),
				} as Job;
				state.jobList.push(newJob);
				state.currentJob = {
					media: [],
				};
			}
		},
		resetCurrentJob: (state) => {
			state.currentJob = {
				media: [],
			};
		},
	},
	selectors: {
		selectJobsState: (jobs: JobState) => jobs, //TODO: When making the fetch calls to the api, this selector should use dynamic filtering fetch calls for the jobList to fetch jobs based on the user type. Regular users = Get jobs they create, Artisans = Get jobs other users create and the ones they create.
		selectAllJobs: (jobs: JobState) => jobs.jobList, //TODO: When making the fetch calls to the api, this selector should use dynamic filtering fetch calls to fetch jobs based on the user type. Regular users = Get jobs they create, Artisans = Get jobs other users create and the ones they create.
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchJobs.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(fetchJobs.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// state.error = null;
				console.info('Jobs From API',...action.payload)
				state.jobList.push(...action.payload);
			})
			.addCase(fetchJobs.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || "Failed to fetch Jobs";
				console.error("Failed to fetch Jobs");
			});
	},
	// extraReducers: (builder) => {
	// 	builder.addCase((state) => {});
	// },
	// NOTE: When we start connecting to the api, this becomes useful
});

export const selectJobTitles = createSelector(
	(state: RootState) => state.jobs.jobList,
	(jobList) => jobList.map((job) => job.title)
);

export const {
	markJobCompleted,
	cancelJob,
	addNewJob,
	updateJobStatus,
	setJobTitle,
	setJobType,
	setJobDescription,
	setJobBudget,
	setJobAddress,
	setJobService,
	setJobMedia,
	submitJob,
	resetCurrentJob,
} = jobSlice.actions;

export const { selectJobsState, selectAllJobs } = jobSlice.selectors;

export const selectJobById = (stateOrJobsOrJobList: RootState | JobState | Job[], jobId: string): Job => {
	if ("jobs" in stateOrJobsOrJobList) {
		return stateOrJobsOrJobList.jobs.jobList.find((job) => job._id === jobId);
	} else if ("jobList" in stateOrJobsOrJobList) {
		return stateOrJobsOrJobList.jobList.find((job) => job._id === jobId);
	} else if (Array.isArray(stateOrJobsOrJobList)) {
		console.log("Job list is array");
		return stateOrJobsOrJobList.find((job) => job._id === jobId);
	}
};

export const selectJobStatus = (state: RootState) => state.jobs.status;

export const selectJobError = (state: RootState) => state.jobs.error;

export const selectJobsPageJobs = createAppSelector([selectJobsState, selectCurrentUser], (jobs, currentUser) => {
	//If user is a regular user, return their jobs
	return currentUser.type === "NORMAL"
		? jobs
		: {
				...jobs,
				jobList: jobs.jobList.filter((job) => job.userId === currentUser._id || (job.userId !== currentUser._id && job.status !== "Posted")), //Basically getting their jobs and jobs posted from other users, THAT aren't active yet.
		  };
});

export const selectBidsPageJobs = createAppSelector([selectJobsState, selectCurrentUser], (jobs, user) => {
	return {
		...jobs,
		jobList: jobs.jobList.filter((job) => job.userId !== user._id && job.status === "Posted"), //Returning jobs from other users that aren't active yet, so the artisan can bid for them
	};
});

export default jobSlice.reducer;

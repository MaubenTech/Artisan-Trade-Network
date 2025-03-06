import React, { useEffect, useState } from "react";
import SearchBar from "@components/SearchBar";
import MenuHeader from "@components/MenuHeader";
import { compactStyles } from "@helpers/styles";
import FilterComponent from "@components/FilterComponent";
import PostedJob from "@components/jobComponents/PostedJob";
import { View, StyleSheet, Dimensions, Platform, ScrollView, ActivityIndicator } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
// import { fetchJobs } from "@store/jobsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store";
import { Text } from "@components/Text";
import { fetchJobs, selectAllJobs, selectJobsState, selectAllJobsStatus } from "@store/jobsSlice";
import EmptyJobs from "@components/jobComponents/EmptyJobs";

const { width, height } = Dimensions.get("window");

export type JobStatus = "Posted" | "Active" | "Completed" | "Cancelled" | "Pending"; //TODO: Jobs should have a pending status for regular users where the job has been posted and artisans have bid for the job, but it's yet to be approved by the user. For Artisans, there should only be Pending for bids as Pending jobs don't mean anything to them (they can still bid for the jobs)

export type Job = {
	jobTitle: string;
	jobServiceCategory: string;
	jobDetail: string;
	jobStatus: JobStatus;
	jobPrice: string;
	jobDate: string;
};

const Jobs = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	// const { jobList: jobs, error } = useAppSelector(selectJobsState);

	const dispatch = useAppDispatch();
	const jobs = useAppSelector(selectAllJobs);
	const jobsStatus = useAppSelector(selectAllJobsStatus);

	const bottomTabBarHeight = useBottomTabBarHeight();

	useEffect(() => {
		console.log("Use effect on fetch...");
		if (jobsStatus === "idle") {
			const result = dispatch(fetchJobs());
			console.log("Result: " + JSON.stringify(result));
		}
		// dispatch(fetchJobs());
		console.log("End of fetch...");
	}, [jobsStatus, dispatch]);

	const [filterOption, setFilterOption] = useState<string | number>("All");

	const filterOptions = [
		{
			optionTitle: "All",
		},
		{
			optionTitle: "Posted",
		},
		{
			optionTitle: "Active",
		},
		{
			optionTitle: "Completed",
		},
	];

	return (
		<>
			<View style={styles.headerContainer}>
				<MenuHeader />
			</View>
			<View style={styles.container}>
				<View style={styles.componentContainer}>
					<SearchBar />
				</View>
				<View style={[styles.componentContainer, styles.filterContainer]}>
					<FilterComponent filterOptions={filterOptions} selectedOption={filterOption} onOptionChanged={setFilterOption} />
				</View>
				{/* {jobs.length > 0 ? (
					<ScrollView style={styles.jobContainer} contentContainerStyle={{ ...styles.jobContentContainer, paddingBottom: bottomTabBarHeight }}>
						<PostedJobs />
						loading && <Text>Loading...</Text>
                    {error && <Text> Error Fetching Jobs: {error}</Text>}
						{jobs.map((job, index) => (
							<PostedJob job={job} key={job._id} isLastIndex={index === jobs.length - 1} />
						))}
					</ScrollView>
				) : (
					<EmptyJobs />
				)} */}
				{jobsStatus === "pending" && (
					<View style={styles.jobsLoadingContainer}>
						<ActivityIndicator style={styles.jobsLoading} size={"large"} />
					</View>
				)}
				{jobsStatus === "succeeded" && jobs.length > 0 ? (
					<ScrollView style={styles.jobContainer} contentContainerStyle={{ ...styles.jobContentContainer, paddingBottom: bottomTabBarHeight }}>
						{jobs.map((job, index) => (
							<PostedJob job={job} key={job._id} isLastIndex={index === jobs.length - 1} />
						))}
					</ScrollView>
				) : jobsStatus === "succeeded" && jobs.length == 0 ? (
					<EmptyJobs />
				) : (
					jobsStatus === "failed" && <Text>Error Loading Jobs</Text>
				)}
			</View>
		</>
	);
};

const generalStyles = StyleSheet.create({
	headerContainer: {
		paddingHorizontal: 20,
		backgroundColor: "#fff",
	},

	container: {
		paddingTop: 40,
		flex: 1,
		backgroundColor: "#fff",
		// paddingHorizontal: 20,
	},

	componentContainer: {
		paddingHorizontal: 20,
	},

	filterContainer: {
		marginTop: 20,
	},

	jobContainer: {
		marginTop: 20,
	},

	jobContentContainer: {
		marginTop: -20,
	},

	jobsLoadingContainer: {
		flex: 0.5,
		justifyContent: "center",
	},

	jobsLoading: {},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

export default Jobs;

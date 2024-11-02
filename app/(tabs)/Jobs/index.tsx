import React, { useEffect, useState } from "react";
import SearchBar from "../../../src/components/SearchBar";
import MenuHeader from "../../../src/components/MenuHeader";
import { compactStyles } from "../../../src/helpers/styles";
import FilterComponent from "../../../src/components/FilterComponent";
import PostedJob from "../../../src/components/jobComponents/PostedJob";
import { View, StyleSheet, Dimensions, Platform, ScrollView } from "react-native";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
// import { fetchJobs } from "@store/jobsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store";
import { Text } from "@components/Text";
import { selectJobsState } from "@store/jobsSlice";

const { width, height } = Dimensions.get("window");

export type JobStatus = "Posted" | "Active" | "Completed";

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

	const { jobList: jobs, loading, error } = useAppSelector(selectJobsState);

	const dispatch = useDispatch<AppDispatch>();

	// useEffect(() => {
	// 	dispatch(fetchJobs());
	// }, [dispatch]);

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
				<ScrollView style={styles.jobContainer} contentContainerStyle={styles.jobContentContainer}>
					{/* <PostedJobs /> */}
					{/* {loading && <Text>Loading...</Text>}
                    {error && <Text> Error Fetching Jobs: {error}</Text>} */}
					{jobs.map((job) => (
						<PostedJob job={job} key={job._id} />
					))}
				</ScrollView>
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
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

export default Jobs;

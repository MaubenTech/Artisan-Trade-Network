import React from "react";
import colors from "@helpers/colors";
import { View, StyleSheet, Dimensions } from "react-native";
import PageHeader from "@components/PageHeader";
import JobApplication from "@components/jobComponents/JobApplication";
import { hideTabBar, showTabBar } from "@store/miscellaneousSlice";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { selectBidsByJobId } from "@store/bidsSlice";
import EmptyNotifications from "@components/notificationComponents/EmptyNotifications";

const { width } = Dimensions.get("window");

export interface ApplicationPreview {
	applier: string;
	applicationServiceCategory: string;
	applicationBid: string;
	applierDistance: string;
}

const applications: ApplicationPreview[] = [
	{
		applier: "Drew Berry",
		applicationServiceCategory: "Maintenance",
		applicationBid: "5,000",
		applierDistance: "20km",
	},
	{
		applier: "Drew Again",
		applicationServiceCategory: "Maintenance",
		applicationBid: "50,000",
		applierDistance: "20km",
	},
];

const PostedJobApplicants = () => {
	const { jobId }: { jobId: string } = useLocalSearchParams();
	const bids = useAppSelector((state) => selectBidsByJobId(state, jobId));
	const dispatch = useAppDispatch();

	useFocusEffect(() => {
		dispatch(hideTabBar());

		return () => {
			dispatch(showTabBar());
		};
	});

	return (
		<>
			<PageHeader pageName="Applicants" />
			<View style={[styles.container]}>
				<View style={{ flexDirection: "column" }}>
					<View>
						{bids.map((bid, index) => {
							return <JobApplication key={index} bid={bid} />;
						})}
					</View>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});

export default PostedJobApplicants;

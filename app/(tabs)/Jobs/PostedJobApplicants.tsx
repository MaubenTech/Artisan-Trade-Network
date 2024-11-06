import React from "react";
import colors from "@helpers/colors";
import { View, StyleSheet, Dimensions } from "react-native";
import PageHeader from "@components/PageHeader";
import JobApplication from "@components/jobComponents/JobApplication";
import { hideTabBar, showTabBar } from "@store/miscellaneousSlice";
import { useFocusEffect } from "expo-router";
import useAppDispatch from "@hooks/useAppDispatch";

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
					<View style={{ gap: 20 }}>
						{applications.map((application, index) => {
							return <JobApplication key={index} application={application} />;
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
		paddingTop: 40,
	},
});

export default PostedJobApplicants;

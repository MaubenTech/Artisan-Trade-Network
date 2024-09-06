import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import PageHeader from "../../src/components/PageHeader";
import JobApplications from "../../src/components/JobComponents/JobApplications";
import colors from "../../src/helpers/colors";

const { width } = Dimensions.get("window");

const PostedJobApplicants = () => {
	return (
		<>
			<PageHeader pageName="Applicants" />
			<View style={[styles.container]}>
				<View style={{ flexDirection: "column", }}>
					<JobApplications />
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

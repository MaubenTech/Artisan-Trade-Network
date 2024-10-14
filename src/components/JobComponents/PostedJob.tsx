import React, { useState } from "react";
import { Text } from "../Text";
import { Link } from "expo-router";
import colors from "@helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Clock from "@assets/icons/Clock.svg";
import JobPicture from "@assets/images/JobPicture.svg";
import MoreIcon from "@assets/icons/services/moreIcon.svg";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { JobStatus } from "app/(home)/Jobs";
import { Job } from "@store/jobsSlice";
import { compactStyles } from "@helpers/styles";
import { BidStatus } from "app/(home)/Bids";

const { width, height } = Dimensions.get("window");

const setStatusBackgroundColor = (status: JobStatus) => {
	switch (status) {
		case "Posted":
			return { backgroundColor: colors.yellow };

		case "Active":
			return {
				backgroundColor: colors.greenShade,
			};
	}
};

const PostedJob = ({ job }: { job: Job }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [jobStage, setJobStage] = useState<JobStatus>("Completed");
	const [bidStage, setBidStage] = useState<BidStatus>("Completed"); //change Bid status value to see different pages
	return (
		<Link style={styles.job} asChild href={{ pathname: "/PostedJobDetails", params: { jobStage, bidStage } }} key={job.title}>
			<TouchableOpacity key={job.title}>
				<View style={styles.jobPicture}>
					<JobPicture />
				</View>
				<View style={styles.jobDetailContainer}>
					<View style={[styles.jobDetailHeader]}>
						<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<Text style={styles.jobDetailText} numberOfLines={1}>
								{job.title}
							</Text>
							<MoreIcon color={"#94A3B1"} />
						</View>
						<Text style={styles.jobServiceCategory}>{job.type}</Text>
					</View>
					<View style={{ flexWrap: "nowrap" }}>
						<Text style={styles.jobDetailContent} numberOfLines={2}>
							{job.description}
						</Text>
					</View>
					<View style={[styles.jobDetailFooter]}>
						<View style={styles.jobStatus}>
							<View style={[styles.jobStatusIcon, setStatusBackgroundColor(job.status)]}></View>
							<Text style={styles.jobStatusText}>{job.status}</Text>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={{ fontWeight: "500" }}>₦</Text>
							<Text style={styles.jobPriceDetail}> {job.budget}</Text>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
							<Clock style={styles.clock} />
							<Text style={styles.jobDate}>11/04/2023</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

const generalStyles = StyleSheet.create({
	job: {
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.greyBorder,
		// backgroundColor: "#f0f",
		gap: 10,
	},

	jobPicture: {
		backgroundColor: "green",
		borderRadius: 10,
	},

	jobDetailContainer: {
		flex: 1,
	},

	jobServiceCategory: {
		fontWeight: "300",
		fontSize: 12,
	},

	jobDetailHeader: {},

	jobDetailText: {
		fontWeight: "500",
	},

	jobDetailContent: {
		fontWeight: "200",
		fontSize: 10,
	},

	jobDetailFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		color: colors.greySecondaryShade,
		fontWeight: "200",
	},

	jobStatus: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},

	jobStatusIcon: {
		height: 13,
		width: 13,
		borderRadius: 50,
	},

	jobStatusText: {
		fontWeight: "200",
		fontSize: 12,
	},

	jobPriceDetail: {
		fontWeight: "200",
		fontSize: 12,
	},

	jobDate: {
		fontWeight: "200",
		fontSize: 12,
	},
});

const androidStyles = StyleSheet.create({
	jobPicture: {
		alignSelf: "center",
	},

	jobServiceCategory: {
		marginTop: -5,
	},

	jobStatusIcon: {
		marginTop: -3,
	},

	clock: {
		marginTop: -3,
	},
});

const iosStyles = StyleSheet.create({
	jobDetailContainer: {
		gap: 4,
	},
});

export default PostedJob;

import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import colors from "../../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import JobRating from "../../../assets/images/JobRating.svg";
import MoreIcon from "../../../assets/icons/services/moreIcon.svg";
import ProfilePicture from "../../../assets/components/chatList/images/profilePicture.svg";

const { width, height } = Dimensions.get("window");

const applications = [
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

const JobApplications = () => {
	return (
		<View style={{ gap: 20 }}>
			{applications.map((application) => {
				return (
					<Link
						style={styles.application}
						asChild
						href={"/(jobs)/PostedJobDetails"}
					>
						<TouchableOpacity
							style={styles.applicationDetails}
							key={application.applier}
						>
							<View style={styles.jobPicture}>
								<ProfilePicture />
							</View>
							<View style={styles.applicationDetailContainer}>
								<View style={styles.applicationDetailHeader}>
									<Text style={styles.applicationDetailText}>
										{application.applier}
									</Text>
									<MoreIcon />
								</View>
								<View style={{ flexDirection: "row", gap: 10 }}>
									<Text
										style={styles.jobDetailContent}
										lineBreakMode="middle"
										numberOfLines={2}
									>
										₦ {application.applicationBid}
									</Text>
									<Text style={styles.jobServiceCategory}>
										{application.applicationServiceCategory}
									</Text>
								</View>
								<View style={styles.jobDetailFooter}>
									<View
										style={{
											flexDirection: "row",
											gap: 5,
											alignItems: "center",
										}}
									>
										<Text>Rating</Text>
										<JobRating width={70} />
									</View>
									<Text style={styles.jobDate}>
										<Ionicons name="pin-outline" color={colors.mainColor} />
										{application.applierDistance}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Link>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	application: {
		flexDirection: "row",
		gap: 8,
		width: "90%",
	},
	applicationDetails: {
		padding: 10,
	},
	jobBorderBottom: {
		height: height,
		width: width,
		borderTopWidth: 1,
		borderStyle: "solid",
		borderColor: "black",
	},
	jobPicture: {},
	applicationDetailContainer: {
		width: "80%",
		gap: 5,
	},
	jobServiceCategory: {
		color: colors.greySecondaryShade,
	},
	applicationDetailHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	applicationDetailText: {
		fontWeight: "600",
	},
	jobDetailContent: {},
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
		height: 15,
		width: 15,
		borderRadius: 50,
	},
	jobPriceDetail: {
		color: colors.greySecondaryShade,
		fontWeight: "400",
	},
	jobDate: {
		color: colors.greySecondaryShade,
		fontWeight: "400",
	},
});

export default JobApplications;

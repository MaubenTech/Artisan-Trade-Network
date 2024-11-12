import React from "react";
import { Text } from "@components/Text";
import { Link } from "expo-router";
import colors from "@helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import JobRating from "@assets/images/JobRating.svg";
import MoreIcon from "@assets/icons/services/moreIcon.svg";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import ProfilePicture from "@assets/components/chatList/images/profilePicture.svg";
import { ApplicationPreview } from "app/(tabs)/Jobs/PostedJobApplicants";
import { Bid } from "@store/bidsSlice";
import useAppSelector from "@hooks/useAppSelector";
import { selectUserById } from "@store/usersSlice";
import { selectJobById } from "@store/jobsSlice";

const { width, height } = Dimensions.get("window");

const JobApplication = ({ bid }: { bid?: Bid }) => {
	const user = useAppSelector((state) => selectUserById(state, bid.artisanId));
	const job = useAppSelector((state) => selectJobById(state, bid.jobId));
	return (
		<Link style={styles.application} asChild href={{ pathname: "/Jobs/ApplicantsPage", params: { bidId: bid._id } }}>
			<TouchableOpacity>
				<View style={styles.jobPicture}>
					<ProfilePicture />
				</View>
				<View style={styles.applicationDetailContainer}>
					<View style={styles.applicationDetailHeader}>
						<Text style={styles.applicationDetailText}>{user.name}</Text>
						<MoreIcon color={"black"} />
					</View>
					<View style={{ flexDirection: "row", gap: 10 }}>
						<Text style={styles.jobDetailContent} lineBreakMode="middle" numberOfLines={2}>
							₦ {bid.bidPrice}
						</Text>
						<Text style={styles.jobServiceCategory}>{job.type}</Text>
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
							{"20km"}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

const styles = StyleSheet.create({
	application: {
		flexDirection: "row",
		gap: 8,
		borderBottomWidth: 1,
		borderBottomColor: colors.greyBorder,
		padding: 20,
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

export default JobApplication;

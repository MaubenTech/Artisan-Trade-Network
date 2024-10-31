import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import colors from "@helpers/colors";
import { Text } from "@components/Text";
import PageHeader from "@components/PageHeader";
import { View, StyleSheet, Dimensions, ScrollView, Platform } from "react-native";
import { JobStatus } from "app/(home)/Jobs";
import { BidStatus } from "app/(home)/Bids";
import BottomModal from "@components/JobComponents/PostedJobBottomModal";
import PostedJobProgressStatus from "@components/JobComponents/PostedJobProgressStatus";
import LocationIcon from "@assets/icons/services/locationIcon.svg";
import { compactStyles } from "@helpers/styles";
import useAppSelector from "@hooks/useAppSelector";
import { selectCurrentUser } from "@store/authSlice";
import { Job, selectJobById } from "@store/jobsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { selectBidById } from "@store/bidsSlice";

const { width, height } = Dimensions.get("window");

const PostedJobDetails = ({ job }: { job: Job }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const { jobId, bidStage }: { jobId?: string; bidStage?: BidStatus } = useLocalSearchParams();

	const selectedJob = useAppSelector((state: RootState) => selectJobById(state, jobId));

	console.log("Posted Job Id:" + jobId);
	console.log("User's Job Stage in the Posted Job Details is: " + selectedJob.status);

	const { type: userType } = useAppSelector(selectCurrentUser);
	return (
		<>
			<PageHeader pageName="Job" />
			<PostedJobProgressStatus jobStage={selectedJob.status} bidStage={bidStage} />
			<View style={[styles.container]}>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View style={[styles.summaryTitleContainer, userType === "ARTISAN" && bidStage !== "Initial" && { paddingTop: 0 }]}>
						<View style={styles.summaryTitleSubContainer}>
							<Text style={styles.summaryTitle}>Job Title</Text>
							<Text style={styles.summarySubTitle}>Need to Repair my toilet</Text>
						</View>
					</View>
					<View style={[styles.summaryTitleContainer, styles.twoInOneTitleContainer]}>
						<View style={styles.summaryTitleSubContainer}>
							<Text style={styles.summaryTitle}>Job Type</Text>
							<Text style={styles.summarySubTitle}>Maintenance</Text>
						</View>
						<View style={styles.summaryTitleSubContainer}>
							<Text style={styles.summaryTitle}>Distance</Text>
							<View style={styles.distanceContent}>
								<LocationIcon style={styles.locationIcon} />
								<Text style={styles.summarySubTitle}>20km</Text>
							</View>
						</View>
					</View>
					<View style={styles.summaryTitleContainer}>
						<View style={styles.summaryTitleSubContainer}>
							<Text style={styles.summaryTitle}>Job Description</Text>
							<Text style={styles.summarySubTitle}>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate aspernatur facere at minus nobis! Nisi, cumque eveniet facere repellat suscipit, voluptatum modi tempore laboriosam
								possimus harum molestiae perspiciatis ipsam accusantium.
							</Text>
						</View>
					</View>
					<View style={styles.summaryTitleContainer}>
						<View style={styles.summaryTitleSubContainer}>
							<Text style={styles.summaryTitle}>Media</Text>
							{/* <Image
						source={selectedImage.uri}
						key={selectedImage.assetId}
						style={styles.uploadedImage}
						/> */}
						</View>
					</View>

					<View>
						{userType === "NORMAL" ? (
							<View style={styles.summaryTitleContainer}>
								<View style={styles.summaryTitleSubContainer}>
									<Text style={styles.summaryTitle}>Address</Text>
									<Text style={styles.summarySubTitle}>Address</Text>
								</View>
							</View>
						) : (
							<View style={[styles.summaryTitleContainer, styles.twoInOneTitleContainer, styles.lastSummaryTitleContainer]}>
								<View style={styles.summaryTitleSubContainer}>
									<Text style={styles.summaryTitle}>Budget</Text>
									<Text style={styles.summarySubTitle}>
										<Text style={styles.nairaSymbol}>₦</Text> 50,000 - 70,000
									</Text>
								</View>
								{bidStage && bidStage !== "Initial" && bidStage !== "Bid" && (
									<View style={styles.summaryTitleSubContainer}>
										<Text style={styles.summaryTitle}>Bid</Text>
										<Text style={styles.summarySubTitle}>
											<Text style={styles.nairaSymbol}>₦</Text> 50,000
										</Text>
									</View>
								)}
							</View>
						)}
					</View>
				</ScrollView>
				{Platform.OS === "ios" ? (
					<BottomModal jobStage={selectedJob.status} bidStage={bidStage} jobId={jobId} />
				) : (
					<Shadow startColor="#00000030" distance={2} style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
						<BottomModal jobStage={selectedJob.status} bidStage={bidStage} jobId={jobId} />
					</Shadow>
				)}
			</View>
		</>
	);
};

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 0,
	},
	spContainer: {},
	contentContainer: {
		// flex: 1,
	},

	summaryTitleContainer: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: colors.greyBorder,
		alignItems: "flex-start",
		paddingVertical: 20,
		paddingHorizontal: 20,
	},

	lastSummaryTitleContainer: {
		borderBottomWidth: 0,
	},

	summaryTitleSubContainer: {},

	twoInOneTitleContainer: {},

	summaryTitle: {
		fontSize: 18,
		fontWeight: "600",
	},

	summarySubTitle: {
		fontSize: 13,
		color: colors.greySecondaryShade,
		paddingRight: "20%",
	},

	distanceContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},

	editText: {
		textDecorationLine: "underline",
	},

	uploadedMediaContainer: {
		// width: "100%",
		gap: 15,
		marginTop: 20,
		flexDirection: "row",
	},

	uploadedImage: {
		width: "30%",
		padding: "7%",
		alignItems: "center",
		height: 100,
		borderRadius: 10,
	},

	nairaSymbol: {
		fontWeight: "600",
		color: colors.brownShade,
	},

	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	applicantContainer: {
		// backgroundColor: "#fff",
		padding: 20,
		// borderColor: "#94A3B1",
		// borderWidth: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: "center",
		// marginTop: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		width: width,
	},
	spApplicantContainer: {
		alignItems: "flex-start",
		paddingTop: 30,
	},
	spPendingStageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subText: {
		fontSize: 14,
		color: "#888",
		marginBottom: 20,
		textAlign: "center",
	},
	spSubText: {
		marginBottom: 10,
		color: colors.brownShade,
	},
	bidInput: {
		borderWidth: 1,
		width: "100%",
		padding: 15,
		paddingLeft: 30,
		borderColor: colors.inputBorderColor,
		borderRadius: 15,
		backgroundColor: "#FBFCFD",
		marginBottom: 40,
	},
	bidInputFocused: {
		backgroundColor: "#fff",
		// color: "#000",
	},
	button: {
		backgroundColor: "#3498db",
		padding: 15,
		borderRadius: 10,
		width: width * 0.9,
		marginBottom: 20,
	},
	spPendingButton: {
		alignItems: "center",
		justifyContent: "center",
		width: "45%",
		marginTop: "4%",
	},
	rejectButton: {
		backgroundColor: "#EA4435",
	},
	approveButton: {
		backgroundColor: "#33A852",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
	},
	spPendingButtonText: {
		fontSize: undefined,
	},
});

const androidStyles = StyleSheet.create({
	locationIcon: {
		marginTop: -3,
	},
});

const iosStyles = StyleSheet.create({
	summaryTitleSubContainer: {
		gap: 5,
	},
});

export default PostedJobDetails;

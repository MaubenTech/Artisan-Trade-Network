import React from "react";
import colors from "@helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@components/Text";
import { View, StyleSheet, Dimensions } from "react-native";
import PageHeader from "@components/PageHeader";
import ButtonGroup from "@components/ButtonGroup";
import JobRating from "@assets/images/JobRating.svg";
import WorkRating from "@assets/images/WorkRating.svg";
import ProfilePicture from "@assets/components/chatList/images/profilePicture.svg";

const JobDetails = [
	{
		jobTitle: "Need to Repair my toilet",
		jobType: "Maintenance",
		jobDescription:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit neque temporibus ducimus culpa ea vero deserunt placeat quod tempora minima architecto illo quaerat voluptate, voluptatibus aperiam tempore dolores excepturi. Minima.",
		media: [],
		budget: "50,000 - 70,000",
		address: "",
	},
];

const { width, height } = Dimensions.get("window");

const JobHistoryDetails = () => {
	return (
		<View style={styles.container}>
			<PageHeader pageName="Summary" />
			<View style={styles.contentContainer}>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Title</Text>
						<Text style={styles.summarySubTitle}>Need to Repair my toilet</Text>
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={{ width: width * 0.4 }}>
						<Text style={styles.summaryTitle}>Job Type</Text>
						<Text style={styles.summarySubTitle}>Maintenance</Text>
					</View>
					<View style={{ width: width * 0.5 }}>
						<Text style={styles.summaryTitle}>Distance</Text>
						<Text style={styles.summarySubTitle}>
							<Ionicons name="pin" color={"blue"} />
							20km
						</Text>
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Description</Text>
						<Text style={styles.summarySubTitle}>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate aspernatur facere at minus nobis!
							Nisi, cumque eveniet facere repellat suscipit, voluptatum modi tempore laboriosam possimus harum molestiae
							perspiciatis ipsam accusantium.
						</Text>
					</View>
				</View>
				<View style={styles.uploadedMediaContainer}>
					{/* <Image
						source={selectedImage.uri}
						key={selectedImage.assetId}
						style={styles.uploadedImage}
					/> */}
				</View>
				<View
					style={{
						borderBottomWidth: 1,
						borderBottomColor: colors.greyBorder,
						...styles.summaryTitleContainer,
					}}
				>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Bid</Text>
						<Text style={styles.summarySubTitle}>₦50,000</Text>
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Rating</Text>
						<JobRating />
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Review</Text>
						<Text style={styles.summarySubTitle}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis deserunt a nihil sapiente est quas
							voluptatum aliquam culpa voluptas assumenda vero architecto corrupti sequi aut ipsam, quam labore quasi
							repudiandae?
						</Text>
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.ratingContainer}>
						<ProfilePicture width={40} />
						<View>
							<Text>Drew Berry</Text>
							<WorkRating />
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 10,
	},

	contentContainer: {
		paddingTop: 20,
	},

	summaryTitleContainer: {
		flexDirection: "row",
		paddingBottom: 10,
		paddingHorizontal: 30,
		justifyContent: "space-between",
		alignItems: "flex-start",
		padding: 20,
	},

	summaryTitleSubContainer: {
		width: width * 0.8,
	},

	summaryTitle: {
		fontSize: 20,
		fontWeight: "600",
	},

	summarySubTitle: {
		color: colors.greySecondaryShade,
	},

	editText: {
		textDecorationLine: "underline",
	},

	uploadedMediaContainer: {
		width: "100%",
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

	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
});

export default JobHistoryDetails;

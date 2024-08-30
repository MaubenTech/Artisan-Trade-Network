import React from "react";
import colors from "../helpers/colors";
import PageHeader from "../components/PageHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";
import ButtonGroup from "../components/ButtonGroup";

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

const JobSummary = () => {
	return (
		<View style={styles.container}>
			<PageHeader pageName="Summary" />
			<View style={styles.contentContainer}>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Title</Text>
						<Text style={styles.summarySubTitle}>Need to Repair my toilet</Text>
					</View>
					<View style={styles.summaryEditContainer}>
						<Text style={styles.editText}>Edit</Text>
						<Ionicons name="pencil" />
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Type</Text>
						<Text style={styles.summarySubTitle}>Maintenance</Text>
					</View>
					<View style={styles.summaryEditContainer}>
						<Text style={styles.editText}>Edit</Text>
						<Ionicons name="pencil" />
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Description</Text>
						<Text style={styles.summarySubTitle}>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Voluptate aspernatur facere at minus nobis! Nisi, cumque eveniet
							facere repellat suscipit, voluptatum modi tempore laboriosam
							possimus harum molestiae perspiciatis ipsam accusantium.
						</Text>
					</View>
					<View style={styles.summaryEditContainer}>
						<Text style={styles.editText}>Edit</Text>
						<Ionicons name="pencil" />
					</View>
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Budget</Text>
						<Text style={styles.summarySubTitle}>50-000 - 70,000</Text>
					</View>
					<View style={styles.summaryEditContainer}>
						<Text style={styles.editText}>Edit</Text>
						<Ionicons name="pencil" />
					</View>
				</View>
				<View style={styles.uploadedMediaContainer}>
					{/* <Image
						source={selectedImage.uri}
						key={selectedImage.assetId}
						style={styles.uploadedImage}
					/> */}
				</View>
				<View style={styles.summaryTitleContainer}>
					<View style={styles.summaryTitleSubContainer}>
						<Text style={styles.summaryTitle}>Job Description</Text>
						<Text style={styles.summarySubTitle}>
							No 1 Ovunwo Street, Rumuagholu, Port Harcourt, Rivers State
						</Text>
					</View>
					<View style={styles.summaryEditContainer}>
						<Text style={styles.editText}>Edit</Text>
						<Ionicons name="pencil" />
					</View>
				</View>
				<ButtonGroup
					paddingHorizontal={30}
					positiveOption="Post Job"
					positiveOptionBg={colors.greenShade}
					isNop={false}
					href={"/(customerPages)/JobPosted"}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 10,
		paddingTop: 70,
	},

	contentContainer: {
		paddingTop: 20,
	},

	summaryTitleContainer: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: colors.greyBorder,
		paddingBottom: 10,
		paddingHorizontal: 30,
		justifyContent: "space-between",
		alignItems: "flex-start",
		padding: 20,
	},

	summaryTitleSubContainer: {
		width: "80%",
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

	summaryEditContainer: {
		flexDirection: "row",
		gap: 5,
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
});

export default JobSummary;

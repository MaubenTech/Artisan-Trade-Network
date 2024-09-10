import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import ProfilePicture from "../assets/components/chatList/images/profilePicture.svg";
import colors from "../src/helpers/colors";
import PageHeader from "../src/components/PageHeader";
import { Text } from "../src/components/Text";
import { compactStyles } from "@helpers/styles";

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
const Notifications = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	return (
		<>
			<PageHeader pageName="Notifications" />
			<View style={styles.container}>
				<View style={styles.notificationContainer}>
					<TouchableOpacity style={styles.notification}>
						<View style={styles.jobPicture}>
							<ProfilePicture />
						</View>
						<View style={styles.applicationDetailContainer}>
							<View style={styles.top}>
								<View style={styles.notificationDetailHeader}>
									<Text style={styles.fromName}>Drew Berry</Text>
									<Text style={styles.time}>12:30 pm</Text>
								</View>
								<View style={styles.subTextContainer}>
									<Text style={styles.jobDetailContent}>Bid: 50,000</Text>
									<Text style={styles.jobServiceCategory}>Carpenter</Text>
								</View>
							</View>
							<View style={styles.bottom}>
								<View style={styles.buttonContainer}>
									<TouchableOpacity
										style={[styles.button, styles.declineButton]}
									>
										<Text style={styles.buttonText}>Decline</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.button, styles.acceptButton]}
									>
										<Text style={styles.buttonText}>Accept</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.notification}>
						<View style={styles.jobPicture}>
							<ProfilePicture />
						</View>
						<View style={styles.applicationDetailContainer}>
							<View style={styles.top}>
								<View style={styles.notificationDetailHeader}>
									<Text style={styles.fromName}>Drew Berry</Text>
									<Text style={styles.time}>12:30 pm</Text>
								</View>
								<View style={styles.subTextContainer}>
									<Text style={styles.jobDetailContent}>Messaged you</Text>
									{/* <Text style={styles.jobServiceCategory}>Carpenter</Text> */}
								</View>
							</View>
							{/* <View style={styles.bottom}>
								<View style={styles.buttonContainer}>
									<TouchableOpacity
										style={[styles.button, styles.declineButton]}
									>
										<Text style={styles.buttonText}>Decline</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.button, styles.acceptButton]}
									>
										<Text style={styles.buttonText}>Accept</Text>
									</TouchableOpacity>
								</View>
							</View> */}
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default Notifications;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	notificationContainer: {
		flexDirection: "column",
	},
	notification: {
		flexDirection: "row",
		gap: 15,
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderColor: "#E5E5E5",
	},
	jobPicture: {
		// backgroundColor: "#ff0",
	},
	applicationDetailContainer: {
		// backgroundColor: "#0ff",
		// gap: 5,
		flex: 1,
	},
	top: {
		// backgroundColor: "#00f",
		//
	},
	notificationDetailHeader: {
		// backgroundColor: "#f0f",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	fromName: {
		fontWeight: "500",
		fontSize: 20,
		marginTop: 2.5,
		// backgroundColor: "#f00",
	},
	time: {
		color: "#4C4C4C",
		fontSize: 12,
	},
	subTextContainer: {
		marginTop: -5,
		// backgroundColor: "#0f0",
		color: "#4C4C4C",
		flexDirection: "row",
		gap: 30,
	},
	jobDetailContent: {
		color: "#4C4C4C",
	},
	jobServiceCategory: {
		color: "#4C4C4C",
	},
	bottom: {
		// backgroundColor: "#ff0",
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	button: {
		alignItems: "center",
		borderRadius: 5,
		justifyContent: "center",
		paddingVertical: 8,
		width: "45%",
		marginTop: "4%",
		borderWidth: 1,
		borderColor: "#94A3B1",
	},
	declineButton: {
		backgroundColor: "#EA4435",
	},
	acceptButton: {
		backgroundColor: "#33A852",
	},
	buttonText: {
		color: "#fff",
	},
});
const iosStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	notificationContainer: {
		flexDirection: "column",
	},
	notification: {
		flexDirection: "row",
		gap: 15,
		paddingHorizontal: 30,
		paddingVertical: 30,
		borderBottomWidth: 1,
		borderColor: "#E5E5E5",
	},
	jobPicture: {
		// backgroundColor: "#ff0",
	},
	applicationDetailContainer: {
		// backgroundColor: "#0ff",
		// gap: 5,
		flex: 1,
	},
	top: {
		// backgroundColor: "#00f",
		//
	},
	notificationDetailHeader: {
		// backgroundColor: "#f0f",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	fromName: {
		fontWeight: "500",
		fontSize: 20,
		marginTop: 2.5,
		// backgroundColor: "#f00",
	},
	time: {
		color: "#4C4C4C",
		fontSize: 12,
	},
	subTextContainer: {
		marginTop: -5,
		// backgroundColor: "#0f0",
		color: "#4C4C4C",
		flexDirection: "row",
		gap: 30,
	},
	jobDetailContent: {
		color: "#4C4C4C",
	},
	jobServiceCategory: {
		color: "#4C4C4C",
	},
	bottom: {
		//
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	button: {
		alignItems: "center",
		borderRadius: 5,
		justifyContent: "center",
		paddingVertical: 10,
		width: "45%",
		marginTop: "8%",
		borderWidth: 1,
		borderColor: "#94A3B1",
	},
	declineButton: {
		backgroundColor: "#EA4435",
	},
	acceptButton: {
		backgroundColor: "#33A852",
	},
	buttonText: {
		color: "#fff",
	},
});

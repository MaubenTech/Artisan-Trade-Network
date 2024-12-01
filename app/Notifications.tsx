import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import ProfilePicture from "@assets/components/chatList/images/profilePicture.svg";
import colors from "@helpers/colors";
import PageHeader from "@components/PageHeader";
import { Text } from "@components/Text";
import { compactStyles } from "@helpers/styles";
import { BidNotificationState, MessageNotificationState } from "@store/notificationsSlice";
import useAppSelector from "@hooks/useAppSelector";
import EmptyNotifications from "@components/notificationComponents/EmptyNotifications";

const { width, height } = Dimensions.get("window");

const BidNotification = ({ fromName, bid, serviceCategory, time, isRead }: BidNotificationState) => {
	return (
		<TouchableOpacity style={styles.notification}>
			<View style={styles.jobPicture}>
				<ProfilePicture />
			</View>
			<View style={styles.applicationDetailContainer}>
				<View style={styles.top}>
					<View style={styles.notificationDetailHeader}>
						<Text style={styles.fromName}>{fromName}</Text>
						<Text style={styles.time}>{time}</Text>
					</View>
					<View style={styles.subTextContainer}>
						<Text style={styles.jobDetailContent}>Bid: {bid}</Text>
						<Text style={styles.jobServiceCategory}>{serviceCategory}</Text>
					</View>
				</View>
				<View style={styles.bottom}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={[styles.button, styles.declineButton]}>
							<Text style={styles.buttonText}>Decline</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, styles.acceptButton]}>
							<Text style={styles.buttonText}>Accept</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const MessageNotification = ({ fromName, time, isRead }: MessageNotificationState) => {
	return (
		<TouchableOpacity style={styles.notification}>
			<View style={styles.jobPicture}>
				<ProfilePicture />
			</View>
			<View style={styles.applicationDetailContainer}>
				<View style={styles.top}>
					<View style={styles.notificationDetailHeader}>
						<Text style={styles.fromName}>{fromName}</Text>
						<Text style={styles.time}>{time}</Text>
					</View>
					<View style={styles.subTextContainer}>
						<Text style={styles.jobDetailContent}>Messaged you</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const Notifications = () => {
	const notifications = useAppSelector((state) => state.notifications);
	return (
		<>
			<PageHeader pageName="Notifications" />
			<View style={styles.container}>
				<View style={styles.notificationContainer}></View>
				{notifications.length > 0 ? (
					notifications.map(
						(notification, index) =>
							(notification.type === "BID" && <BidNotification {...notification} key={index} />) || //
							(notification.type === "MESSAGE" && <MessageNotification {...notification} key={index} />)
					)
				) : (
					<EmptyNotifications />
				)}
			</View>
		</>
	);
};

export default Notifications;

const generalStyles = StyleSheet.create({
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
		borderColor: colors.whiteShade,
	},

	jobPicture: {},

	applicationDetailContainer: {
		flex: 1,
	},

	top: {},

	notificationDetailHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	fromName: {
		fontWeight: "500",
		fontSize: 20,
		marginTop: 2.5,
	},

	time: {
		color: colors.subTitlesColor,
		fontSize: 12,
	},

	subTextContainer: {
		color: colors.subTitlesColor,
		flexDirection: "row",
		gap: 30,
	},

	jobDetailContent: {
		color: colors.subTitlesColor,
	},

	jobServiceCategory: {
		color: colors.subTitlesColor,
	},

	bottom: {},

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
		borderColor: colors.listItemBorderColor,
	},

	declineButton: {
		backgroundColor: colors.redShade,
	},

	acceptButton: {
		backgroundColor: colors.greenShade,
	},

	buttonText: {
		color: colors.white,
	},
});

const androidStyles = StyleSheet.create({
	subTextContainer: {
		marginTop: -5,
	},
});

const iosStyles = StyleSheet.create({});

const styles = compactStyles(generalStyles, androidStyles, iosStyles);

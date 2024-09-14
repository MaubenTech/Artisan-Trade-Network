import React from "react";
import { Text } from "./Text";
import { Image } from "expo-image";
import colors from "@helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { compactStyles } from "@helpers/styles";
import { StatusBar } from "expo-status-bar";

const ProfilePic = require("@assets/images/profilePic.png");

const ChatHeader = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const router = useRouter();
	// return (
	// 	<Stack.Screen
	// 		options={{
	// 			title: "",
	// 			headerShown: true,
	// 			headerShadowVisible: false,
	// 			headerLeft: () => (
	// 				<View style={styles.container}>
	// 					<Pressable style={styles.backButton} onPress={() => router.back()}>
	// 						<Ionicons name="chevron-back" size={20} />
	// 					</Pressable>
	// 					<View style={styles.recipientDetailContainer}>
	// 						<View style={styles.recipientProfilePicture}>
	// 							<Image
	// 								source={ProfilePic}
	// 								style={styles.profilePic}
	// 								contentFit="contain"
	// 							/>
	// 						</View>
	// 						<View style={styles.recipientDetail}>
	// 							<Text style={styles.recipientName}>Daniel Victor</Text>
	// 							<Text style={styles.recipientActiveStatus}>
	// 								Last Seen today 10:23pm
	// 							</Text>
	// 						</View>
	// 					</View>
	// 				</View>
	// 			),

	// 			headerRight: () => (
	// 				<View style={styles.contactRecipient}>
	// 					<View style={styles.contactIcon}>
	// 						<Ionicons name="videocam-outline" size={20} />
	// 					</View>
	// 					<View style={styles.contactIcon}>
	// 						<Ionicons name="call-outline" size={20} />
	// 					</View>
	// 				</View>
	// 			),
	// 		}}
	// 	/>
	// );

	return (
		<>
			<StatusBar translucent />
			<SafeAreaView
				// style={{ backgroundColor: "#f00" }}
				edges={{ top: "additive" }}
			>
				<View style={styles.parentContainer}>
					<View style={styles.container}>
						<Pressable
							style={styles.backButton}
							onPress={() => {
								if (router.canGoBack()) router.back();
								console.log("?: " + router.canGoBack());
							}}
						>
							<Ionicons name="chevron-back" size={20} />
						</Pressable>
						<View style={styles.recipientDetailContainer}>
							<View style={styles.recipientProfilePicture}>
								<Image source={ProfilePic} style={styles.profilePic} contentFit="contain" />
							</View>
							<View style={styles.recipientDetail}>
								<Text style={styles.recipientName}>Daniel Victor</Text>
								<Text style={styles.recipientActiveStatus}>Last Seen today 10:23pm</Text>
							</View>
						</View>
					</View>
					<View style={styles.contactRecipient}>
						<View style={styles.contactIcon}>
							<Ionicons name="videocam-outline" size={20} />
						</View>
						<View style={styles.contactIcon}>
							<Ionicons name="call-outline" size={20} />
						</View>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({
	parentContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 20,
		// backgroundColor: "#0f0",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},

	backButton: {},

	recipientDetailContainer: {
		flexDirection: "row",
		marginRight: 15,
		alignItems: "center",
		gap: 5,
	},

	recipientProfilePicture: {
		height: 40,
	},

	profilePic: {
		width: 50,
		height: "100%",
		objectFit: "contain",
	},

	recipientDetail: {},

	recipientName: {
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 1.2,
	},

	recipientActiveStatus: {
		color: colors.greySecondaryShade,
		fontSize: 12,
		letterSpacing: -1.2,
	},

	contactRecipient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 70,
	},
	contactIcon: {
		// backgroundColor: colors.grey2,
		backgroundColor: colors.greyBorder,
		borderRadius: 20,
		padding: 5,
	},
});

const iosStyles = StyleSheet.create({
	parentContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 20,
		paddingTop: 0,
		// backgroundColor: "#0f0",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},

	backButton: {},

	recipientDetailContainer: {
		flexDirection: "row",
		marginRight: 15,
		alignItems: "center",
		gap: 5,
	},

	recipientProfilePicture: {
		height: 40,
	},

	profilePic: {
		width: 50,
		height: "100%",
		objectFit: "contain",
	},

	recipientDetail: {},

	recipientName: {
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 1.2,
	},

	recipientActiveStatus: {
		color: colors.greySecondaryShade,
		fontSize: 12,
		letterSpacing: -1.2,
	},

	contactRecipient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 70,
	},
	contactIcon: {
		// backgroundColor: colors.grey2,
		backgroundColor: colors.greyBorder,
		borderRadius: 20,
		padding: 5,
	},
});

export default ChatHeader;

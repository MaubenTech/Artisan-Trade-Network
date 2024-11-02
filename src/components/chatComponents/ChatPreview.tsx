import React from "react";
import colors from "@helpers/colors";
import { router, useNavigation, useRouter } from "expo-router";
import { Text } from "@components/Text";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import ProfilePicture from "@assets/components/chatList/images/profilePicture.svg";
import { compactStyles } from "@helpers/styles";

const { width, height } = Dimensions.get("window");

const ChatPreview = ({ item }: { item: number }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const openChatRoom = () => {
		// router.navigate({ pathname: "/ChatRoom" });
		router.push("/Chat/ChatRoom");
		// router.push({ pathname: "/ChatRoom" });
	};

	return (
		<TouchableOpacity style={styles.chat} onPress={openChatRoom}>
			<View style={styles.profilePictureContainer}>
				<ProfilePicture />
			</View>
			<View style={styles.chatPreviewContainer}>
				<View style={styles.chatPreviewDetail}>
					<Text style={styles.sender}>Drew Berry</Text>
					<Text style={styles.chatTime}>12:20pm</Text>
				</View>
				<View style={{ width: width * 0.7 }}>
					<Text style={styles.chatPreview} numberOfLines={2} ellipsizeMode="tail">
						Hello Nonso, Please can you still make it today?
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const generalStyles = StyleSheet.create({
	chat: {
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.greyBorder,
	},

	chatPreviewDetail: {
		flexDirection: "row",
		justifyContent: "space-between",
		// backgroundColor: "#f0f",
		alignItems: "center",
	},

	sender: {
		fontWeight: "500",
		fontSize: 18,
	},

	chatTime: {
		color: colors.subTitlesColor,
		fontSize: 10,
	},

	chatPreview: {
		marginTop: -3,
		fontSize: 12,
		color: colors.subTitlesColor,
	},
});

const androidStyles = StyleSheet.create({
	profilePictureContainer: {
		alignSelf: "center",
	},
});

const iosStyles = StyleSheet.create({
	chatPreviewContainer: {
		gap: 6,
	},

	chatPreview: {
		paddingRight: 20,
	},
});

export default ChatPreview;

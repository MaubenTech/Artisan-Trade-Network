import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProfilePicture from "../../assets/components/chatList/images/profilePicture.svg";
import { router, useRouter } from "expo-router";
import colors from "../helpers/colors";

const ChatList = ({ item }: { item: number }) => {
	const openChatRoom = () => {
		router.push({ pathname: "/ChatRoom" });
	};

	return (
		<View>
			<TouchableOpacity style={styles.chat} onPress={() => openChatRoom()}>
				<View style={styles.profilePictureContainer}>
					<ProfilePicture />
				</View>
				<View style={styles.chatPreviewContainer}>
					<View style={styles.chatPreviewDetail}>
						<Text style={styles.sender}>Drew Berry</Text>
						<Text style={styles.chatTime}>12:20pm</Text>
					</View>
					<Text
						style={styles.chatPreview}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						Hello Nonso, Please can you still make it today?
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	chat: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	profilePictureContainer: {},

	chatPreviewContainer: {
		gap: 4,
	},

	sender: {
		fontWeight: "700",
		fontSize: 18,
	},

	chatPreviewDetail: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	chatTime: {
		color: colors.greySecondaryShade,
	},

	chatPreview: {
		flexWrap: "wrap",
		width: "90%",
	},
});

export default ChatList;

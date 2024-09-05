import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ProfilePicture from "../../assets/components/chatList/images/profilePicture.svg";
import { router, useRouter } from "expo-router";
import colors from "../../src/helpers/colors";
import { Text } from "../../src/components/Text";

const ChatList = ({ item }: { item: number }) => {
	const openChatRoom = () => {
		router.navigate({ pathname: "/ChatRoom" });
	};

	return (
		<View>
			<TouchableOpacity style={styles.chat} onPress={openChatRoom}>
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
		// backgroundColor: "#0f0",
		borderBottomWidth: 1,
		borderBottomColor: colors.inputBorderColor,
		paddingHorizontal: 10,
		paddingVertical: 20,
	},

	profilePictureContainer: {},

	chatPreviewContainer: {
		flex: 1,
		// backgroundColor: "#f00",
		justifyContent: "flex-end",
	},

	chatPreviewDetail: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// backgroundColor: "#00f",
	},

	sender: {
		fontWeight: "500",
		fontSize: 18,
	},

	chatTime: {
		fontSize: 10,
		color: colors.greySecondaryShade,
	},

	chatPreview: {
		// lineHeight: 15,
		marginTop: -5,
		// flex: 1,
		flexWrap: "wrap",
		fontSize: 13,
		// backgroundColor: "#0f0",
		// width: "90%",
	},
});

export default ChatList;

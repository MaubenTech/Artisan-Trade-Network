import React, { useEffect, useState } from "react";
import colors from "@helpers/colors";
import ChatHeader from "@components/ChatHeader";
import { View, StyleSheet, Platform, FlatList, ScrollView, KeyboardAvoidingView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomKeyboardView from "@components/CustomKeyboardView";
import { Text, TextInput } from "@components/Text";
import { compactStyles } from "@helpers/styles";
import useAppDispatch from "@hooks/useAppDispatch";
import { hideTabBar, showTabBar } from "@store/miscellaneousSlice";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import useAppSelector from "@hooks/useAppSelector";
import { RootState } from "@store";
import { addChat, selectMessages } from "@store/chatSlice";
import { selectCurrentUser } from "@store/authSlice";
import { v4 as uuidv4 } from "uuid";
import { UserState } from "@store/usersSlice";

interface MessageBubbleProps {
	message: string;
	timestamp: string;
	isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, timestamp, isCurrentUser }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	return (
		<>
			<View style={isCurrentUser ? styles.messageSentBubble : styles.messageReceivedBubble}>
				<Text style={isCurrentUser ? styles.messageSentText : styles.messageReceived}>{message}</Text>
				<Text style={isCurrentUser ? styles.messageTime : styles.receivedMessageTime}>{timestamp}</Text>
			</View>
		</>
	);
};

const ChatRoom = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const [inputStart, setInputStart] = useState(false);

	const [message, setMessage] = useState<string>("");

	const messages = useAppSelector(selectMessages);

	const { chatPartnerID, item } = useLocalSearchParams();

	console.log("Partner ID: " + chatPartnerID);

	const convertedChatPartnerID = Array.isArray(chatPartnerID) ? Number(chatPartnerID[0]) : Number(chatPartnerID);

	const chatPartnerDetails = item && !Array.isArray(item) ? (JSON.parse(item) as UserState) : null;

	const currentUser = useAppSelector(selectCurrentUser);

	const filteredMessages = messages.filter(
		(msg) =>
			(msg.senderId === currentUser.id && msg.chatPartnerID === convertedChatPartnerID) ||
			(msg.senderId === convertedChatPartnerID && msg.chatPartnerID === currentUser.id)
	);

	console.log("Messages : \n", filteredMessages);

	console.log("The logged in user Id: " + currentUser.id);

	const dispatch = useAppDispatch();

	useFocusEffect(() => {
		dispatch(hideTabBar());

		return () => {
			dispatch(showTabBar());
		};
	});

	const sendMessage = () => {
		if (message.trim()) {
			dispatch(
				addChat({
					id: uuidv4(),
					message: message.trim(),
					senderId: currentUser.id,
					timestamp: new Date().toLocaleDateString(),
					chatPartnerID: convertedChatPartnerID,
				})
			);
		}

		setMessage("");
	};

	useEffect(() => {
		// messages.forEach((message) => console.log("UPDATED mESSAGES: " + message.message));
		console.log("Updated Messages: ", filteredMessages);
	}, [messages]);

	return (
		<KeyboardAvoidingView
			style={styles.parentContainer}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={Platform.OS === "ios" ? -10 : 0}
		>
			<View style={styles.parentContainer}>
				<View style={styles.container}>
					<View>
						<ChatHeader chatPartnerName={chatPartnerDetails.name} />
						<View style={styles.pageHeaderContainerBorder}></View>
					</View>
					<View style={styles.chatContainer}>
						<View style={styles.dateContainer}>
							<View style={styles.date}>
								<Text>Today</Text>
							</View>
						</View>
						{/* <FlatList
							contentContainerStyle={styles.chatFlatlist}
							data={filteredMessages}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<MessageBubble
									key={item.id}
									message={item.message}
									timestamp={item.timestamp}
									isCurrentUser={item.senderId === currentUser.id}
								/>
							)}
							// inverted
						/> */}
						{filteredMessages.map((message) => (
							<MessageBubble
								key={message.id}
								message={message.message}
								timestamp={message.timestamp}
								isCurrentUser={message.senderId === currentUser.id}
							/>
						))}
					</View>
				</View>
				<View style={styles.chatActions}>
					<View style={styles.chatActionIcon}>
						<Ionicons name="add" size={20} />
					</View>
					<TextInput
						style={styles.textMessageInput}
						placeholder="Write Something Here"
						numberOfLines={5}
						multiline={true}
						value={message}
						onChangeText={(message) => {
							setMessage(message);
							message.length < 1 ? setInputStart(false) : setInputStart(true);
						}}
						onSubmitEditing={sendMessage}
					/>

					<View style={styles.chatActionIcon}>
						<Ionicons name="camera-outline" size={20} />
					</View>
					<View style={styles.chatActionIcon}>
						{inputStart ? <Ionicons name="send" size={20} onPress={sendMessage} /> : <Ionicons name="mic-outline" size={20} />}
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

const generalStyles = StyleSheet.create({
	parentContainer: {
		flex: 1,
		paddingBottom: 10,
	},

	container: {
		flex: 1,
		backgroundColor: colors.white,
	},

	pageHeaderContainerBorder: {
		borderBottomWidth: 3,
		borderStyle: "solid",
		borderColor: colors.whiteShade,
		shadowOpacity: 3,
		shadowColor: "#E0E0E0",
		shadowOffset: { width: 0, height: -1 },
	},

	chatContainer: {
		paddingHorizontal: 10,
		// position: "relative",
		backgroundColor: "#f0f",
		flex: 1,
	},

	chatFlatlist: {
		height: "100%",
		backgroundColor: "red",
	},

	dateContainer: {
		alignItems: "center",
		marginBottom: 20,
	},

	date: {
		backgroundColor: colors.inputBorderColor,
		paddingVertical: 5,
		borderRadius: 30,
		width: 90,
		textAlign: "center",
		alignItems: "center",
	},

	messageSentBubble: {
		backgroundColor: colors.mainColor,
		padding: 10,
		borderRadius: 10,
		width: "50%",
		marginTop: 30,
		position: "absolute",
		right: 5,
	},

	messageSent: {},

	messageSentText: {
		color: colors.white,
	},

	messageReceivedBubble: {
		backgroundColor: colors.chatBubbleSecondary,
		padding: 10,
		borderRadius: 10,
		width: "50%",
		position: "absolute",
		top: -40,
		left: 5,
	},

	messageReceived: {},

	messageSentReceived: {
		fontWeight: "300",
	},

	messageTime: {
		color: colors.white,
		alignSelf: "flex-end",
		fontSize: 12,
	},

	receivedMessageTime: {
		alignSelf: "flex-end",
		fontWeight: "200",
		fontSize: 12,
	},

	chatActions: {
		backgroundColor: "white",
		flexDirection: "row",
		padding: 20,
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderBottomWidth: 0,
		borderColor: colors.inputBorderColor,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		// height: "15%",
		paddingVertical: 40,
	},

	// textMessage: {
	// 	borderWidth: 1,
	// 	borderRadius: 20,
	// 	borderColor: colors.greyBorder,
	// 	// backgroundColor: colors.grey2,
	// 	backgroundColor: "purple",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	width: "65%",
	// },

	textMessageInput: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: colors.greyBorder,
		// backgroundColor: colors.grey2,
		alignItems: "center",
		justifyContent: "center",
		width: "65%",
		height: 30,
		// paddingLeft: 20,
		// paddingRight: 10,
		backgroundColor: "red",
	},

	chatActionIcon: {
		backgroundColor: colors.grey2,
		padding: 8,
		borderRadius: 20,
		justifyContent: "center",
	},
});

const androidStyles = StyleSheet.create({
	messageReceivedBubble: {
		marginTop: 140,
	},
});

const iosStyles = StyleSheet.create({
	messageReceivedBubble: {
		marginTop: 130,
	},
});

export default ChatRoom;

import React, { useEffect, useRef, useState } from "react";
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
import { User } from "@store/usersSlice";

interface MessageBubbleProps {
	message: string;
	timestamp: string;
	isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, timestamp, isCurrentUser }) => {
	// console.log("Message Received: ", message);
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	return (
		<>
			<View style={[styles.messageBubble, isCurrentUser ? styles.messageSentBubble : styles.messageReceivedBubble]}>
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

	const { chatPartnerID, item }: { chatPartnerID: string; item: string } = useLocalSearchParams();

	// const convertedChatPartnerID = Array.isArray(chatPartnerID) ? Number(chatPartnerID[0]) : Number(chatPartnerID);

	const chatPartnerDetails = item && !Array.isArray(item) ? (JSON.parse(item) as User) : null;

	const currentUser = useAppSelector(selectCurrentUser);

	const filteredMessages = messages.filter(
		(msg) =>
			(msg.senderId === currentUser._id && msg.chatPartnerID === chatPartnerID) ||
			(msg.senderId === chatPartnerID && msg.chatPartnerID === currentUser._id)
	);

	const dispatch = useAppDispatch();

	useFocusEffect(() => {
		dispatch(hideTabBar());

		return () => {
			dispatch(showTabBar());
		};
	});

	const flatListRef = useRef<FlatList>(null);

	const sendMessage = () => {
		if (message.trim()) {
			dispatch(
				addChat({
					id: uuidv4(),
					message: message.trim(),
					senderId: currentUser._id,
					timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
					chatPartnerID: chatPartnerID,
				})
			);
		}

		setMessage("");
	};

	const handleContentSizeChange = () => {
		if (flatListRef.current) {
			console.log("Flatlist's current exists!");
			flatListRef.current.scrollToEnd({ animated: true });
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.parentContainer}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={Platform.OS === "ios" ? -5 : 0}
		>
			<View style={styles.parentContainer}>
				<View style={styles.container}>
					<View>
						<ChatHeader chatPartnerName={chatPartnerDetails.firstname} />
						<View style={styles.pageHeaderContainerBorder}></View>
					</View>
					<View style={styles.chatContainer}>
						<View style={styles.dateContainer}>
							<View style={styles.date}>
								<Text>Today</Text>
							</View>
						</View>
						<FlatList
							ref={flatListRef}
							contentContainerStyle={styles.chatFlatlist}
							data={filteredMessages}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<MessageBubble
									key={item.id}
									message={item.message}
									timestamp={item.timestamp}
									isCurrentUser={item.senderId === currentUser._id}
								/>
							)}
							showsVerticalScrollIndicator={false}
							onContentSizeChange={handleContentSizeChange} // NOTE: Using handleContentSizeChange to scrollToEnd means that Flatlist should accurately calculate the size of its content before changing. If you're using async to fetch data, make sure it loads before rendering the FlatList!
						/>
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
		backgroundColor: colors.white,
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
		flex: 1,
		position: "relative",
	},

	chatFlatlist: {},

	dateContainer: {
		alignItems: "center",
		position: "absolute",
		zIndex: 1,
		width: "100%",
		marginTop: 10,
	},

	date: {
		backgroundColor: colors.inputBorderColor,
		paddingVertical: 5,
		borderRadius: 30,
		width: 90,
		textAlign: "center",
		alignItems: "center",
		opacity: 0.7,
	},

	messageBubble: {
		maxWidth: "75%",
		// minWidth: "25%",
		justifyContent: "space-between",
		paddingHorizontal: 8,
		paddingVertical: 5,
		borderRadius: 10,
		marginVertical: 5,
		flexDirection: "row",
	},

	messageSentBubble: {
		backgroundColor: colors.mainColor,
		alignSelf: "flex-end",
	},

	messageSent: {},

	messageSentText: {
		color: colors.white,
		maxWidth: "60%",
	},

	messageReceivedBubble: {
		backgroundColor: colors.chatBubbleSecondary,
		alignSelf: "flex-start",
	},

	messageReceived: {},

	messageSentReceived: {
		fontWeight: "300",
	},

	messageTime: {
		color: colors.white,
		alignSelf: "flex-end",
		fontSize: 10,
		marginTop: 10,
		marginLeft: 15,
	},

	receivedMessageTime: {
		alignSelf: "flex-end",
		fontWeight: "200",
		fontSize: 10,
		marginTop: 10,
		marginLeft: 15,
	},

	chatActions: {
		backgroundColor: "white",
		flexDirection: "row",
		padding: 5,
		paddingBottom: 0,
		paddingTop: 5,
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderBottomWidth: 0,
		borderColor: colors.inputBorderColor,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		// paddingVertical: 30,
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
		backgroundColor: colors.grey2,
		alignItems: "center",
		justifyContent: "center",
		width: "65%",
		height: 30,
		paddingVertical: 10,
		padding: 10,
	},

	chatActionIcon: {
		backgroundColor: colors.grey2,
		padding: 8,
		borderRadius: 20,
		justifyContent: "center",
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

export default ChatRoom;

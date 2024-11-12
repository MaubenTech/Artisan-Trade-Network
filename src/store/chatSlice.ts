import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { UserState } from "./usersSlice";

interface Message {
	id: string;
	chatPartnerID?: string;
	senderId: string;
	message: string;
	userName?: string;
	timestamp: string;
}

interface ChatState {
	currentUser: UserState;
	receiver: UserState;
	messages: Message[];
}

const initialState: ChatState = {
	currentUser: {
		_id: "2",
		name: "Janet Stones",
		nickName: "Janet",
		email: "janetstones@gmail.com",
		type: "NORMAL",
	},
	receiver: {
		_id: "1",
		name: "John Doe",
		nickName: "John",
		email: "johndoe@gmail.com",
		type: "ARTISAN",
	},
	messages: [
		{ id: uuidv4(), senderId: "1", message: "1's message to 2", timestamp: new Date().toLocaleDateString(), chatPartnerID: "2" },
		{ id: uuidv4(), senderId: "1", message: "1's message to 3", timestamp: new Date().toLocaleDateString(), chatPartnerID: "3" },
		{ id: uuidv4(), senderId: "1", message: "1's message to 4", timestamp: new Date().toLocaleDateString(), chatPartnerID: "4" },
		{ id: uuidv4(), senderId: "2", message: "2's message to 1", timestamp: new Date().toLocaleDateString(), chatPartnerID: "1" },
		{ id: uuidv4(), senderId: "2", message: "2's message to 3", timestamp: new Date().toLocaleDateString(), chatPartnerID: "3" },
		{ id: uuidv4(), senderId: "2", message: "2's message to 4", timestamp: new Date().toLocaleDateString(), chatPartnerID: "4" },
		{ id: uuidv4(), senderId: "3", message: "3's message to 1", timestamp: new Date().toLocaleDateString(), chatPartnerID: "1" },
		{ id: uuidv4(), senderId: "3", message: "3's message to 2", timestamp: new Date().toLocaleDateString(), chatPartnerID: "2" },
		{ id: uuidv4(), senderId: "3", message: "3's message to 4", timestamp: new Date().toLocaleDateString(), chatPartnerID: "4" },
		{ id: uuidv4(), senderId: "4", message: "4's message to 1", timestamp: new Date().toLocaleDateString(), chatPartnerID: "1" },
		{ id: uuidv4(), senderId: "4", message: "4's message to 2", timestamp: new Date().toLocaleDateString(), chatPartnerID: "2" },
		{ id: uuidv4(), senderId: "4", message: "4's message to 3", timestamp: new Date().toLocaleDateString(), chatPartnerID: "3" },
	],
};

const chatSlice = createSlice({
	name: "chatSlice",
	initialState,
	reducers: {
		addChat(state: ChatState, action: PayloadAction<Message>) {
			// state.push(action.payload);
			// const newMessage: Message = {
			// 	...action.payload,
			// 	id: Date.now(),
			// 	chatPartnerID: action.payload.chatPartnerID,
			// 	message: action.payload.message,
			// 	senderId: action.payload.senderId,
			// 	timestamp: new Date().toLocaleDateString(),
			// };

			// state.messages.push({
			// 	...action.payload,
			// 	id: uuidv4(), //TODO: Don't use a randomizer function within the reducer. It makes it impure and defeats the standard practice of reducers!
			// 	chatPartnerID: action.payload.chatPartnerID,
			// 	message: action.payload.message,
			// 	senderId: action.payload.senderId,
			// 	timestamp: new Date().toLocaleDateString(),
			// });

			state.messages.push(action.payload);

			// state.messages.push(newMessage);
		},
	},
});

export const { addChat } = chatSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export default chatSlice.reducer;

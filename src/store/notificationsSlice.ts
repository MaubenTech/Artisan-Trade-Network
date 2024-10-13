import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BaseNotificationState {
	id: number;
	fromName: string;
	time: string;
	isRead: boolean;
}
export type BidNotificationState = BaseNotificationState & {
	type: "BID";
	bid: number;
	serviceCategory: string;
};
export type MessageNotificationState = BaseNotificationState & {
	type: "MESSAGE";
};

type NotificationState = BidNotificationState | MessageNotificationState;

const initialState: NotificationState[] = [
	{
		id: 1,
		fromName: "Drew Berry",
		type: "BID",
		bid: 50000,
		serviceCategory: "Carpenter",
		time: "12:30pm",
		isRead: false,
	},
	{
		id: 2,
		fromName: "Nonso Ali",
		type: "MESSAGE",
		time: "06:20pm",
		isRead: false,
	},
	{
		id: 3,
		fromName: "Janet Stones",
		type: "MESSAGE",
		time: "10:03am",
		isRead: false,
	},
	{
		id: 4,
		fromName: "John Doe",
		type: "BID",
		bid: 100000,
		serviceCategory: "Web Developer",
		time: "05:50pm",
		isRead: false,
	},
	{
		id: 5,
		fromName: "James Bond",
		type: "MESSAGE",
		time: "11:03pm",
		isRead: false,
	},
];

const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		notificationRead: (state, action: PayloadAction<NotificationState>) => {
			state.find((notification) => notification.id === action.payload.id).isRead = true;
		},
		markedAllAsRead: (state) => {
			state.forEach((notification) => (notification.isRead = true));
		},
	},
});

export const { notificationRead, markedAllAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;

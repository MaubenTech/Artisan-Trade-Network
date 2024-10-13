import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./usersSlice";
import jobReducer from "./jobsSlice";
import bidReducer from "./bidsSlice";
import reviewReducer from "./reviewsSlice";
import serviceReducer from "./servicesSlice";
import notificationReducer from "./notificationsSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		users: userReducer,
		jobs: jobReducer,
		bids: bidReducer,
		reviews: reviewReducer,
		services: serviceReducer,
		notifications: notificationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;

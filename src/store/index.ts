import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {},
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;

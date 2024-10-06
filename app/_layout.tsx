// import {
// 	DarkTheme,
// 	DefaultTheme,
// 	ThemeProvider,
// } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import "react-native-reanimated";
import FontsProvider from "@components/FontsProvider";
import UserTypeProvider from "@context/UserTypeProvider";
import { Provider } from "react-redux";
import store from "@store";

// export const unstable_settings = {
// 	initialRouteName: "/(home)/Services",
// };

export default function RootLayout() {
	// const colorScheme = useColorScheme();
	// const [fontsLoaded] = useFonts({
	// 	SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
	// });

	return (
		// <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
		// <UserTypeProvider> no more need for the UserType context as we now have a user type in the redux store
		<Provider store={store}>
			<FontsProvider>
				<Slot />
				{/* <Stack></Stack> */}
			</FontsProvider>
		</Provider>
		// </UserTypeProvider>
		// </ThemeProvider>
	);
}

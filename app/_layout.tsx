// import {
// 	DarkTheme,
// 	DefaultTheme,
// 	ThemeProvider,
// } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import FontsProvider from "../src/components/FontsProvider";
import UserTypeContext from "../src/context/UserTypeProvider";
import UserTypeProvider from "../src/context/UserTypeProvider";

// export const unstable_settings = {
// 	initialRouteName: "/(home)/Services",
// };

export default function RootLayout() {
	// const colorScheme = useColorScheme();
	// const [fontsLoaded] = useFonts({
	// 	SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	// });

	return (
		// <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
		<UserTypeProvider>
			<FontsProvider>
				<Slot />
				{/* <Stack></Stack> */}
			</FontsProvider>
		</UserTypeProvider>
		// </ThemeProvider>
	);
}

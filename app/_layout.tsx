// import {
// 	DarkTheme,
// 	DefaultTheme,
// 	ThemeProvider,
// } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import "react-native-reanimated";
import FontsProvider from "@components/FontsProvider";
import UserTypeProvider from "@context/UserTypeProvider";

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
		<UserTypeProvider>
			<FontsProvider>
				<Slot />
				{/* <Stack></Stack> */}
			</FontsProvider>
		</UserTypeProvider>
		// </ThemeProvider>
	);
}

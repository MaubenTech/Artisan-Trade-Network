import { Tabs } from "expo-router";
import { Stack } from "expo-router/stack";

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
		<FontsProvider>
			<Slot />
		</FontsProvider>
		// </ThemeProvider>
	);
}

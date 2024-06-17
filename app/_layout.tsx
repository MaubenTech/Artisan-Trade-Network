import { Tabs } from "expo-router";
import { Stack } from "expo-router/stack";

// export const unstable_settings = {
// 	initialRouteName: "/(home)/Services",
// };

export default function RootLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(registration)" />
			<Stack.Screen name="(home)" />
		</Stack>
	);
}
// export default Stack;

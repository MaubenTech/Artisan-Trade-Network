import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import { Stack, useNavigation, useRootNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";



export default function Layout() {
	const rootNavigation = useNavigation();
	return (
		<Stack>
			<Stack.Screen
				name="SignUp"
				options={{
					headerBackVisible: true,
					headerLeft: () => (
						<Pressable
							onPress={() => rootNavigation.goBack()}
							style={{ flexDirection: "row", alignItems: "center" }}
						>
							<Ionicons
								name="chevron-back"
								size={32}
								color={"#007AFF"}
								style={{ fontSize: 28 }}
							/>
							<Text style={{ color: "#007AFF", fontSize: 16 }}>Back</Text>
						</Pressable>
					),
					// headerShown: false
				}}
			/>
		</Stack>
	);
}
// export default Stack;

import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleProp,
	ViewStyle,
	StyleSheet,
} from "react-native";
import React from "react";
import colors from "../helpers/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const ios = Platform.OS == "ios";
export default function CustomKeyboardView({
	children,
	style,
}: {
	children?: any;
	style?: StyleProp<ViewStyle>;
}) {
	return (
		<KeyboardAvoidingView
			behavior={ios ? "padding" : "height"}
			// keyboardVerticalOffset={90}
			style={{ flex: 1, backgroundColor: colors.white }}
		>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ flex: 1 }}
				bounces={false}
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

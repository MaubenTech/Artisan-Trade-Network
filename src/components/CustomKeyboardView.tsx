import React from "react";
import { Text } from "@components/Text";
import colors from "@helpers/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle, StyleSheet } from "react-native";

const ios = Platform.OS == "ios";
export default function CustomKeyboardView({ children, style, keyboardVerticalOffset }: { children?: any; style?: StyleProp<ViewStyle>; keyboardVerticalOffset?: number }) {
	return (
		<KeyboardAvoidingView behavior={ios ? "padding" : "height"} keyboardVerticalOffset={keyboardVerticalOffset} style={[{ flex: 1, backgroundColor: colors.white }, style]}>
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

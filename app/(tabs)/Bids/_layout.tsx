import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import React from "react";
import { compactStyles } from "@helpers/styles";
import { Stack } from "expo-router";

const BidsStackLayout = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
		</Stack>
	);
};

export default BidsStackLayout;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import React from "react";
import { compactStyles } from "@helpers/styles";
import { Tabs } from "expo-router";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useAppSelector from "@hooks/useAppSelector";

const CustomTabBar: React.FC<BottomTabBarProps> = (props) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const isTabBarVisible = useAppSelector((state) => state.miscellaneous.isTabBarVisible); // We'll get to this later

	if (!isTabBarVisible) {
		return null;
	}

	return <BottomTabBar {...props} />;
};

export default CustomTabBar;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

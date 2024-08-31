import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Tabs } from "expo-router";
import colors from "../../src/helpers/colors";
import TabBar from "../../src/components/TabBar";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/src/types";

const { width, height } = Dimensions.get("window");

type BottomTabProps = {
	focused: boolean;
	text: string;
	iconName: any;
};

export const CustomTabBar = (
	props: Omit<BottomTabBarButtonProps & BottomTabProps, "focused">
) => {
	const { onPress, accessibilityState, iconName, text } = props;
	const focused = accessibilityState.selected;
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				{
					flex: focused ? 1 : 0.6,
					alignItems: "center",
					justifyContent: "center",
				},
			]}
			activeOpacity={1}
		>
			<View
				style={[
					styles.iconContainer,
					focused ? styles.activeContainer : styles.inactiveIconContainer,
				]}
			>
				<Ionicons name={iconName} color={colors.whiteShade} size={25} />
				{focused ? <Text style={{ ...styles.iconText }}>{text}</Text> : <></>}
			</View>
		</TouchableOpacity>
	);
};

export default function Layout() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: styles.tabBarStyle,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.mainColor,
				tabBarInactiveTintColor: colors.greySecondaryShade,
			}}
			backBehavior="history"
			// tabBar={(props) => <Tab Bar {...props} />}
		>
			<Tabs.Screen
				name="Home"
				options={{
					tabBarButton: (props) => (
						<CustomTabBar {...props} iconName="home" text="Home" />
					),
					headerLeft: () => <></>,
				}}
			/>
			<Tabs.Screen
				name="Jobs"
				options={{
					tabBarButton: (props) => (
						<CustomTabBar {...props} iconName="briefcase" text="Jobs" />
					),
				}}
			/>
			<Tabs.Screen
				name="Chat"
				options={{
					tabBarButton: (props) => (
						<CustomTabBar {...props} iconName="chatbox-ellipses" text="Chat" />
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBarStyle: {
		flexDirection: "column",
		// justifyContent: "space-between",
		borderRadius: 50,
		backgroundColor: colors.brownShade,
		position: "absolute",
		bottom: 30,
		marginRight: 30,
		marginLeft: 30,
		paddingBottom: 0,
		height: 80,
	},
	// tabBarItemStyle: {
	// 	flex: 1,
	// 	borderRadius: 50,
	// 	paddingLeft: 30,
	// 	paddingRight: 30,
	// },
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		padding: 12.5,
	},
	activeContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		padding: 10,
		paddingBottom: 12.5,
		paddingTop: 12.5,
		width: width * 0.3,
		backgroundColor: colors.mainColor,
	},
	inactiveIconContainer: {
		backgroundColor: colors.greySecondaryShade,
	},
	iconText: {
		color: colors.whiteShade,
	},
});

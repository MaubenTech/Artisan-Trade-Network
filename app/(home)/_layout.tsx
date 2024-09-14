import { Tabs, useNavigation, useRouter } from "expo-router";
import colors from "../../src/helpers/colors";
import { Text } from "../../src/components/Text";
import TabBar from "../../src/components/TabBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";
import USER_TYPE from "../../src/constants/UserType";
import { UserTypeContext } from "../../src/context/UserTypeProvider";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/src/types";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { compactStyles } from "@helpers/styles";

const { width, height } = Dimensions.get("window");

type BottomTabProps = {
	focused: boolean;
	text: string;
	iconName: any;
};

//TODO: Add a mechanism on the tabBar, so Scrollable content don't plainly go under it. You can add a blur or break the page from where the tab bar starts, so content don't get to it
export const CustomTabBar = (props: Omit<BottomTabBarButtonProps & BottomTabProps, "focused">) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const { onPress, accessibilityState, iconName, text } = props;
	const focused = accessibilityState.selected;
	const userType = useContext(UserTypeContext);

	const conditionalButtonStyles =
		userType.type === USER_TYPE.NORMAL
			? {
					flex: focused ? 1.1 : 0.6,
			  }
			: {
					flex: focused ? 1.1 : 0.5,
			  };

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				conditionalButtonStyles,
				{
					// width,
					alignItems: "center",
					justifyContent: "center",
					// backgroundColor: "#f0f",
					borderRadius: 50,
				},
			]}
			activeOpacity={1}
		>
			<View style={[styles.iconContainer, focused ? styles.activeContainer : styles.inactiveIconContainer]}>
				<Ionicons name={iconName} color={colors.whiteShade} size={25} />
				{focused ? <Text style={{ ...styles.iconText }}>{text}</Text> : <></>}
			</View>
		</TouchableOpacity>
	);
};

export default function Layout() {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const navigation = useNavigation();
	const router = useRouter();
	// const [activeIndex, setActiveIndex] = useState(0);
	const userType = useContext(UserTypeContext);

	const conditionalTabBarStyles =
		userType.type === USER_TYPE.NORMAL
			? {}
			: {
					paddingHorizontal: 10,
			  };

	const normalOptions = {
		href: null,
	};

	const serviceProviderOptions = {
		tabBarButton: (props) => <CustomTabBar {...props} iconName="calculator" text="Bids" />,
	};

	useEffect(() => {
		const handleTabPress = (e) => {
			// if( === "/ChatRoom")
		};
	});

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: [styles.tabBarStyle, conditionalTabBarStyles],
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
					tabBarButton: (props) => <CustomTabBar {...props} iconName="home" text="Home" />,
					headerLeft: () => <></>,
				}}
			/>
			<Tabs.Screen
				name="Jobs"
				options={{
					tabBarButton: (props) => <CustomTabBar {...props} iconName="briefcase" text="Jobs" />,
				}}
			/>
			<Tabs.Screen name="Bids" options={userType.type === USER_TYPE.NORMAL ? normalOptions : serviceProviderOptions} />
			<Tabs.Screen
				name="Chat"
				options={{
					tabBarButton: (props) => <CustomTabBar {...props} iconName="chatbox-ellipses" text="Chat" />,
				}}
			/>
		</Tabs>
	);
}

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({
	tabBarStyle: {
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
	// 	// flex: 1,
	// 	// borderRadius: 50,
	// 	// paddingLeft: 30,
	// 	// paddingRight: 30,
	// 	backgroundColor: "#0f0",
	// },
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		padding: 12.5,
		paddingVertical: 12.5,
	},
	activeContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		padding: 10,
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

const iosStyles = StyleSheet.create({
	tabBarStyle: {
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
	// 	// flex: 1,
	// 	// borderRadius: 50,
	// 	// paddingLeft: 30,
	// 	// paddingRight: 30,
	// 	backgroundColor: "#0f0",
	// },
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		padding: 12.5,
		paddingVertical: 12.5,
	},
	activeContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		padding: 10,
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

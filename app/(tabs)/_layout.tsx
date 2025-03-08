import { Tabs, useNavigation, useRouter } from "expo-router";
import colors from "@helpers/colors";
import { Text } from "@components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/src/types";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { compactStyles } from "@helpers/styles";
import { moderateScale, verticalScale } from "react-native-size-matters";
import useAppSelector from "@hooks/useAppSelector";
import { selectCurrentUser } from "@store/authSlice";
import { CustomTab } from "@components/CustomTab";
import CustomTabBar from "@components/CustomTabBar";
import { horizontalScale } from "@helpers/metrics";
import useRoles from "@hooks/useRoles";

const { width, height } = Dimensions.get("window");

export default function Layout() {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const navigation = useNavigation();
	const router = useRouter();
	// const [activeIndex, setActiveIndex] = useState(0);
	const { isRegularUser, isArtisan } = useRoles();

	const conditionalTabBarStyles = isRegularUser
		? {}
		: {
				paddingHorizontal: 10,
		  };

	const normalOptions = {
		href: null,
	};

	const serviceProviderOptions = {
		tabBarButton: (props) => <CustomTab {...props} iconName="calculator" text="Bids" />,
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
			// tabBar={() => {}}
			tabBar={(props) => <CustomTabBar {...props} />}
		>
			<Tabs.Screen
				name="Home"
				options={{
					tabBarButton: (props) => <CustomTab {...props} iconName="home" text="Home" />,
					headerLeft: () => <></>,
				}}
			/>
			<Tabs.Screen
				name="Jobs"
				options={{
					tabBarButton: (props) => <CustomTab {...props} iconName="briefcase" text="Jobs" />,
				}}
			/>
			<Tabs.Screen name="Bids" options={isRegularUser ? normalOptions : isArtisan ? serviceProviderOptions : {}} />
			<Tabs.Screen
				name="Chat"
				options={{
					tabBarButton: (props) => <CustomTab {...props} iconName="chatbox-ellipses" text="Chat" />,
				}}
			/>
		</Tabs>
	);
}

const generalStyles = StyleSheet.create({
	tabBarStyle: {
		borderRadius: 50,
		backgroundColor: colors.brownShade,
		position: "absolute",
		bottom: 20,
		left: 20,
		right: 20,
		marginRight: 30,
		marginLeft: 30,
		paddingBottom: 0,
		// height: 60,
		elevation: 0,
		borderTopWidth: 0,
		height: verticalScale(70),
	},

	// tabBarItemStyle: {
	// 	// flex: 1,
	// 	// borderRadius: 50,
	// 	// paddingLeft: 30,
	// 	// paddingRight: 30,
	// 	backgroundColor: "#0f0",
	// },

	customTabBar: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		// backgroundColor: "#f0f",
	},

	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		padding: 10.5,
		// paddingVertical: 12.5,
	},

	activeContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		// padding: 10,
		width: width * 0.3,
		backgroundColor: colors.mainColor,
	},

	inactiveIconContainer: {
		backgroundColor: colors.greySecondaryShade,
	},

	iconText: {
		color: colors.whiteShade,
		// backgroundColor: "#f0f",
	},
});

const androidStyles = StyleSheet.create({
	iconText: {
		top: 2,
	},
});

const iosStyles = StyleSheet.create({
	tabBarStyle: {
		justifyContent: "center",
		alignItems: "center",
		height: verticalScale(60),
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 0,
	},
});

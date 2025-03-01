import colors from "@helpers/colors";
import useAppSelector from "@hooks/useAppSelector";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/src/types";
import { selectCurrentUser } from "@store/authSlice";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Text } from "@components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { compactStyles } from "@helpers/styles";
import CustomTabBar from "./CustomTabBar";

const { width, height } = Dimensions.get("window");

type BottomTabProps = {
	focused: boolean;
	text: string;
	iconName: any;
};

export const CustomTab = (props: Omit<BottomTabBarButtonProps & BottomTabProps, "focused">) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const { onPress, accessibilityState, iconName, text } = props;
	const focused = accessibilityState?.selected;
	const { type: userType } = useAppSelector(selectCurrentUser);

	const conditionalButtonStyles =
		userType === "NORMAL"
			? {
					flex: focused ? 1.1 : 0.6,
			  }
			: {
					flex: focused ? 1.1 : 0.5,
			  };

	return (
		<TouchableOpacity onPress={onPress} style={[conditionalButtonStyles, styles.customTabBar]} activeOpacity={1}>
			<View style={[styles.iconContainer, focused ? styles.activeContainer : styles.inactiveIconContainer]}>
				<Ionicons name={focused ? iconName : iconName + "-outline"} color={focused ? colors.whiteShade : "#808080"} size={moderateScale(20)} />
				{focused ? <Text style={styles.iconText}>{text}</Text> : <></>}
			</View>
		</TouchableOpacity>
	);
};

const generalStyles = StyleSheet.create({
	customTabBar: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},

	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		padding: 12.5,
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
	customTabBar: {
		flex: 1,
		paddingVertical: 8,
		justifyContent: "center",
		alignItems: "center",
	},

	iconContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		// marginHorizontal: 10,
	},

	iconText: {
		color: colors.white,
		fontSize: 14,
		fontWeight: "500",
	},

	activeContainer: {},
});

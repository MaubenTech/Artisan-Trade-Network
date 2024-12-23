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

const { width, height } = Dimensions.get("window");

type BottomTabProps = {
	focused: boolean;
	text: string;
	iconName: any;
};

export const CustomTab = (props: Omit<BottomTabBarButtonProps & BottomTabProps, "focused">) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const { onPress, accessibilityState, iconName, text } = props;
	const focused = accessibilityState.selected;
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
				<Ionicons name={focused ? iconName : iconName + "-outline"} color={colors.whiteShade} size={moderateScale(18, 2)} />
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
		// backgroundColor: "#f0f",
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
	iconText: {
		top: 1,
	},
});

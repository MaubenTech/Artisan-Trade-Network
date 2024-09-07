import {
	View,
	StyleSheet,
	Touchable,
	TouchableOpacity,
	ViewStyle,
	ImageStyle,
	TextStyle,
	ColorValue,
	DimensionValue,
	StyleProp,
} from "react-native";
import React from "react";
import { Text } from "./Text";
import colors from "../helpers/colors";
import { Link } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Text } from "./Text";

type ButtonOptionParams = {
	negative: string;
	positive: string;
};

export default function ButtonGroup({
	containerStyle,
	positiveOption,
	positiveOptionStyle,
	positiveOptionBg,
	negativeOption,
	negativeOptionStyle,
	negativeOptionBg,
	isNop,
	href,
	paddingHorizontal,
	paddingVertical,
}: {
	containerStyle?: StyleProp<ViewStyle>;
	positiveOption: string;
	positiveOptionStyle?: StyleProp<ViewStyle>;
	positiveOptionBg?: ColorValue;
	negativeOption?: string;
	negativeOptionStyle?: StyleProp<ViewStyle>;
	negativeOptionBg?: ColorValue;
	isNop?: boolean;
	href?: ExpoRouter.Href;
	paddingHorizontal?: DimensionValue;
	paddingVertical?: DimensionValue;
}) {
	return (
		<View
			style={
				isNop
					? [
							styles.container,
							{ paddingHorizontal: paddingHorizontal },
							containerStyle,
					  ]
					: [
							{
								paddingHorizontal: paddingHorizontal,
								alignItems: "center",
							},
							containerStyle,
					  ]
			}
		>
			<TouchableOpacity
				style={
					isNop
						? [styles.option, styles.negativeOption, negativeOptionStyle]
						: { width: 0 }
				}
			>
				<Text>{negativeOption}</Text>
			</TouchableOpacity>
			<Link
				href={href || "#"}
				asChild
				style={[
					isNop
						? {
								...styles.option,
								...styles.positiveOption,
						  }
						: {
								...styles.option,
								...styles.positiveOption,
								width: "90%",
								backgroundColor: positiveOptionBg || colors.mainColor,
						  },
					positiveOptionStyle,
				]}
			>
				<TouchableOpacity
					style={[
						{
							justifyContent: "center",
						},
					]}
				>
					<Text style={{ color: "white", textAlign: "center" }}>
						{positiveOption}
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		marginTop: 20,
		flexDirection: "row",
		marginBottom: 30,
		justifyContent: "space-between",
	},

	childContainer: {},

	option: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		width: "40%",
		alignItems: "center",
		textAlign: "center",
	},

	negativeOption: {
		borderColor: colors.buttonBorderColor,
	},

	positiveOption: {
		borderWidth: 0,
		backgroundColor: colors.mainColor,
	},
});

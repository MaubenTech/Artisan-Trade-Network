import {
	View,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
	TextStyle,
	ColorValue,
	DimensionValue,
	StyleProp,
	Dimensions,
	GestureResponderEvent,
} from "react-native";
import React from "react";
import { Text } from "./Text";
import colors from "../helpers/colors";
import { Link } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";

interface ButtonGroupParams {
	containerStyle?: StyleProp<ViewStyle>;
	positiveOption: string;
	positiveOptionStyle?: StyleProp<ViewStyle>;
	positiveOptionTextStyle?: StyleProp<TextStyle>;
	positiveOptionBg?: ColorValue;
	negativeOption?: string;
	negativeOptionStyle?: StyleProp<ViewStyle>;
	negativeOptionTextStyle?: StyleProp<TextStyle>;
	negativeOptionBg?: ColorValue;
	href?: ExpoRouter.Href;
	negativeHref?: ExpoRouter.Href;
	negativeOnPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
	paddingHorizontal?: DimensionValue;
	paddingVertical?: DimensionValue;
	vertical?: boolean;
	reverse?: boolean;
	onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
}
const { width } = Dimensions.get("window");

const ButtonGroup: React.FC<ButtonGroupParams> = ({
	containerStyle,
	positiveOption,
	positiveOptionStyle,
	positiveOptionTextStyle,
	positiveOptionBg,
	negativeOption,
	negativeOptionStyle,
	negativeOptionTextStyle,
	negativeOptionBg,
	href,
	negativeHref,
	paddingHorizontal,
	paddingVertical,
	vertical,
	reverse,
	onPress,
	negativeOnPress,
}) => {
	const isNop = negativeOption ? true : false;

	const negativeStyle = isNop
		? [
				styles.option,
				styles.negativeOption,
				negativeOptionStyle,
				negativeOptionBg && { backgroundColor: negativeOptionBg },
		  ]
		: { width: 0 };

	const NegativeOption = ({ addStyle }: { addStyle?: boolean }) => (
		<TouchableOpacity style={addStyle && [negativeStyle, vertical && { width: "100%" }]} onPress={negativeOnPress}>
			<Text style={negativeOptionTextStyle}>{negativeOption}</Text>
		</TouchableOpacity>
	);

	const CompleteNegativeOption = () => {
		return negativeHref && !negativeOnPress ? (
			<Link href={negativeHref} style={[negativeStyle, vertical && { width: "100%" }]} asChild>
				<TouchableOpacity>
					<Text style={negativeOptionTextStyle}>{negativeOption}</Text>
				</TouchableOpacity>
			</Link>
		) : (
			<NegativeOption addStyle />
		);
	};

	const PositiveOption = ({
		onPress,
	}: {
		onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
	}) => {
		const positiveStyle: StyleProp<ViewStyle> = [
			styles.option,
			styles.positiveOption,
			vertical && { width: "100%" },
			{
				backgroundColor: positiveOptionBg ?? colors.mainColor,
			},
			!isNop && {
				width: width * 0.9,
			},
			positiveOptionStyle,
		];
		return onPress ? (
			// If onPress is provided, render TouchableOpacity without Link
			<TouchableOpacity style={positiveStyle} onPress={onPress}>
				<Text style={[styles.positiveOptionText, positiveOptionTextStyle]}>{positiveOption}</Text>
			</TouchableOpacity>
		) : (
			// If onPress is not provided, render Link with TouchableOpacity inside
			<Link href={href} asChild style={positiveStyle}>
				<TouchableOpacity>
					<Text style={[styles.positiveOptionText, positiveOptionTextStyle]}>{positiveOption}</Text>
				</TouchableOpacity>
			</Link>
		);
	};

	return (
		<View
			style={[
				styles.container,
				vertical && { flexDirection: "column", gap: 20 },
				{ paddingHorizontal },
				containerStyle,
			]}
		>
			{reverse ? (
				<>
					<CompleteNegativeOption />
					<PositiveOption onPress={onPress} />
				</>
			) : (
				<>
					<PositiveOption onPress={onPress} />
					<CompleteNegativeOption />
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginTop: 20,
		flexDirection: "row",
		marginBottom: 30,
		justifyContent: "space-between",
		alignItems: "center",
	},

	childContainer: {},

	option: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		width: width * 0.4,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
	},

	negativeOption: {
		borderColor: colors.buttonBorderColor,
	},

	positiveOption: {
		borderWidth: 0,
	},

	positiveOptionText: {
		color: "#fff",
		textAlign: "center",
	},
});

export default ButtonGroup;

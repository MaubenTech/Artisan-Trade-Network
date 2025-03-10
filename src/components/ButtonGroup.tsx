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
	TextProps,
	TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Text } from "./Text";
import colors from "@helpers/colors";
import { Href, Link, LinkProps } from "expo-router";
import { WebAnchorProps } from "expo-router/build/link/Link";

interface ButtonGroupParams {
	containerStyle?: StyleProp<ViewStyle>;
	positiveOption: string;
	positiveOptionStyle?: StyleProp<ViewStyle>;
	positiveOptionTextStyle?: StyleProp<TextStyle>;
	positiveOptionBg?: ColorValue;
	positiveOptionTOProps?: TouchableOpacityProps;
	positiveOptionDisabled?: boolean;
	negativeOption?: string;
	negativeOptionStyle?: StyleProp<ViewStyle>;
	negativeOptionTextStyle?: StyleProp<TextStyle>;
	negativeOptionBg?: ColorValue;
	negativeOptionTOProps?: TouchableOpacityProps;
	negativeOptionDisabled?: boolean;
	// href?: Href;
	href?: Href;
	negativeHref?: Href;
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
	positiveOptionTOProps,
	positiveOptionDisabled,
	negativeOption,
	negativeOptionStyle,
	negativeOptionTextStyle,
	negativeOptionBg,
	negativeOptionTOProps,
	negativeOptionDisabled,
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
				{ backgroundColor: negativeOptionDisabled ? colors.greyLighterShade : negativeOptionBg },
				negativeOptionDisabled && { borderWidth: 0 },
		  ]
		: { width: 0 };

	const negativeTextStyle = [negativeOptionDisabled && { color: colors.greySecondaryShade }, negativeOptionTextStyle];

	const NegativeOption = ({ addStyle }: { addStyle?: boolean }) => (
		<TouchableOpacity
			style={addStyle && [negativeStyle, vertical && { width: "100%" }]}
			onPress={negativeOnPress}
			disabled={negativeOptionDisabled}
			{...negativeOptionTOProps}
		>
			<Text style={negativeTextStyle}>{negativeOption}</Text>
		</TouchableOpacity>
	);

	const CompleteNegativeOption = () => {
		return negativeHref && !negativeOnPress ? (
			<Link href={negativeHref} asChild>
				<TouchableOpacity style={[negativeStyle, vertical && { width: "100%" }]} disabled={negativeOptionDisabled} {...negativeOptionTOProps}>
					<Text style={negativeTextStyle}>{negativeOption}</Text>
				</TouchableOpacity>
			</Link>
		) : (
			<NegativeOption addStyle />
		);
	};

	const PositiveOption = ({ onPress }: { onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void }) => {
		const positiveStyle: StyleProp<ViewStyle> = [
			styles.option,
			styles.positiveOption,
			!isNop && {
				width: "100%",
			},
			vertical && { width: "100%" },
			positiveOptionStyle,
			{
				backgroundColor: positiveOptionDisabled ? colors.greyLighterShade : positiveOptionBg ?? colors.mainColor,
			},
		];
		const positiveTextStyle = [positiveOptionDisabled && { color: colors.greySecondaryShade }, positiveOptionTextStyle];
		return onPress ? (
			// If onPress is provided, render TouchableOpacity without Link
			<TouchableOpacity style={positiveStyle} onPress={onPress} disabled={positiveOptionDisabled} {...positiveOptionTOProps}>
				<Text style={[styles.positiveOptionText, ...positiveTextStyle]}>{positiveOption}</Text>
			</TouchableOpacity>
		) : (
			// If onPress is not provided, render Link with TouchableOpacity inside
			<Link href={href} asChild>
				<TouchableOpacity style={positiveStyle} disabled={positiveOptionDisabled} {...positiveOptionTOProps}>
					<Text style={[styles.positiveOptionText, ...positiveTextStyle]}>{positiveOption}</Text>
				</TouchableOpacity>
			</Link>
		);
	};

	return (
		<View style={[styles.container, vertical && { flexDirection: "column", gap: 20 }, { paddingHorizontal }, containerStyle]}>
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

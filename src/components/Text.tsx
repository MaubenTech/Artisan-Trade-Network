import React from "react";
import {
	Text as RNText,
	TextInput as RNTextInput,
	StyleProp,
	StyleSheet,
	TextProps as RNTextProps,
	TextInputProps as RNTextInputProps,
	TextStyle,
} from "react-native";

interface TextProps extends RNTextProps {
	style?: StyleProp<TextStyle>;
}
interface TextInputProps extends RNTextInputProps {
	style?: StyleProp<TextStyle>;
}

export const Text: React.FC<TextProps> = ({ children, style, ...props }) => {
	const flattenedStyle = StyleSheet.flatten(style ?? {});

	const { fontWeight, fontStyle, ...remainingStyles } = flattenedStyle;

	let fontFamily;

	fontFamily = (() => {
		if (fontStyle === "normal" || fontStyle === undefined) {
			switch (fontWeight) {
				case "100":
				case "thin":
					return "Poppins_100Thin";
				case "200":
				case "ultralight":
					return "Poppins_200ExtraLight";
				case "300":
				case "light":
					return "Poppins_300Light";
				case "400":
				case "regular":
					return "Poppins_400Regular";
				case "500":
				case "medium":
					return "Poppins_500Medium";
				case "600":
				case "semibold":
					return "Poppins_600SemiBold";
				case "700":
				case "bold":
					return "Poppins_700Bold";
				case "800":
				case "heavy":
					return "Poppins_800ExtraBold";
				case "900":
				case "black":
					return "Poppins_900Black";
				default:
					return "Poppins_400Regular";
			}
		} else if (fontStyle === "italic") {
			switch (fontWeight) {
				case "100":
				case "thin":
					return "Poppins_100Thin_Italic";
				case "200":
				case "ultralight":
					return "Poppins_200ExtraLight_Italic";
				case "300":
				case "light":
					return "Poppins_300Light_Italic";
				case "400":
				case "regular":
					return "Poppins_400Regular_Italic";
				case "500":
				case "medium":
					return "Poppins_500Medium_Italic";
				case "600":
				case "semibold":
					return "Poppins_600SemiBold_Italic";
				case "700":
				case "bold":
					return "Poppins_700Bold_Italic";
				case "800":
				case "heavy":
					return "Poppins_800ExtraBold_Italic";
				case "900":
				case "black":
					return "Poppins_900Black_Italic";
				default:
					return "Poppins_400Regular_Italic";
			}
		}
	})();

	return (
		<RNText style={[{ fontFamily }, remainingStyles]} {...props}>
			{children}
		</RNText>
	);
};

export const TextInput: React.FC<TextInputProps> = ({
	children,
	style,
	...props
}) => {
	const flattenedStyle = StyleSheet.flatten(style ?? {});

	const { fontWeight, fontStyle, ...remainingStyles } = flattenedStyle;

	let fontFamily: string;

	fontFamily = (() => {
		if (fontStyle === "normal" || fontStyle === undefined) {
			switch (fontWeight) {
				case "100":
				case "thin":
					return "Poppins_100Thin";
				case "200":
				case "ultralight":
					return "Poppins_200ExtraLight";
				case "300":
				case "light":
					return "Poppins_300Light";
				case "400":
				case "regular":
					return "Poppins_400Regular";
				case "500":
				case "medium":
					return "Poppins_500Medium";
				case "600":
				case "semibold":
					return "Poppins_600SemiBold";
				case "700":
				case "bold":
					return "Poppins_700Bold";
				case "800":
				case "heavy":
					return "Poppins_800ExtraBold";
				case "900":
				case "black":
					return "Poppins_900Black";
				default:
					return "Poppins_400Regular";
			}
		} else if (fontStyle === "italic") {
			switch (fontWeight) {
				case "100":
				case "thin":
					return "Poppins_100Thin_Italic";
				case "200":
				case "ultralight":
					return "Poppins_200ExtraLight_Italic";
				case "300":
				case "light":
					return "Poppins_300Light_Italic";
				case "400":
				case "regular":
					return "Poppins_400Regular_Italic";
				case "500":
				case "medium":
					return "Poppins_500Medium_Italic";
				case "600":
				case "semibold":
					return "Poppins_600SemiBold_Italic";
				case "700":
				case "bold":
					return "Poppins_700Bold_Italic";
				case "800":
				case "heavy":
					return "Poppins_800ExtraBold_Italic";
				case "900":
				case "black":
					return "Poppins_900Black_Italic";
				default:
					return "Poppins_400Regular_Italic";
			}
		}
	})();

	return (
		<RNTextInput style={[{ fontFamily }, remainingStyles]} {...props}>
			{children}
		</RNTextInput>
	);
};

const styles = StyleSheet.create({});

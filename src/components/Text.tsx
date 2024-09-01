import React from "react";
import {
	Text as RNText,
	StyleProp,
	StyleSheet,
	TextProps as RNTextProps,
	TextStyle,
} from "react-native";

interface TextProps extends RNTextProps {
	style?: StyleProp<TextStyle>;
}

export const Text: React.FC<TextProps> = ({ children, style, ...props }) => {
	const flattenedStyle = StyleSheet.flatten(style);
	const fontStyle = flattenedStyle?.fontStyle;
	const fontWeight = flattenedStyle?.fontWeight;

	delete flattenedStyle.fontWeight;
	delete flattenedStyle.fontStyle;

	let fontFamily = "Poppins_700Bold";

	// fontFamily = (() => {
	// 	if (fontWeight === "600") {
	// 		console.log("Font weight is 600");
	// 		return "Poppins_600SemiBold";
	// 	} else if (fontWeight === "700") {
	// 		console.log("Font weight is 700");
	// 		return "Poppins_400Regular";
	// 	}
	// })();

	// if (fontWeight === "600") {
	// 	console.log("Font weight is 600");
	// 	fontFamily = "Poppins_600SemiBold";
	// } else if (fontWeight === "700") {
	// 	console.log("Font weight is 700");
	// 	fontFamily = "Poppins_400Regular";
	// } else fontFamily = "Poppins_700Bold";

	// if (fontStyle === "normal") {
	// 	fontFamily = (() => {
	// 		switch (fontWeight) {
	// 			case "100":
	// 			case "thin":
	// 				return "Poppins_100Thin";
	// 			case "ultralight":
	// 				return "Poppins_200ExtraLight";
	// 			case "300":
	// 			case "light":
	// 				return "Poppins_300Light";
	// 			case "400":
	// 			case "regular":
	// 			case undefined:
	// 				return "Poppins_400Regular";
	// 			case "500":
	// 			case "medium":
	// 				return "Poppins_500Medium";
	// 			case "600":
	// 			case "semibold":
	// 				return "Poppins_600SemiBold";
	// 			case "700":
	// 			case "bold":
	// 				return "Poppins_700Bold";
	// 			case "800":
	// 			case "heavy":
	// 				return "Poppins_800ExtraBold";
	// 			case "900":
	// 			case "black":
	// 				return "Poppins_900Black";
	// 			default:
	// 				return "Poppins_400Regular";
	// 		}
	// 	})();
	// } else if (fontStyle === "italic") {
	// 	fontFamily = (() => {
	// 		switch (fontWeight) {
	// 			case "100":
	// 			case "thin":
	// 				return "Poppins_100Thin_Italic";
	// 			case "200":
	// 			case "ultralight":
	// 				return "Poppins_200ExtraLight_Italic";
	// 			case "300":
	// 			case "light":
	// 				return "Poppins_300Light_Italic";
	// 			case "400":
	// 			case "regular":
	// 			case undefined:
	// 				return "Poppins_400Regular_Italic";
	// 			case "500":
	// 			case "medium":
	// 				return "Poppins_500Medium_Italic";
	// 			case "600":
	// 			case "semibold":
	// 				return "Poppins_600SemiBold_Italic";
	// 			case "700":
	// 			case "bold":
	// 				return "Poppins_700Bold_Italic";
	// 			case "800":
	// 			case "heavy":
	// 				return "Poppins_800ExtraBold_Italic";
	// 			case "900":
	// 			case "black":
	// 				return "Poppins_900Black_Italic";
	// 			default:
	// 				return "Poppins_400Regular_Italic";
	// 		}
	// 	})();
	// }

	// console.log("Font family is: " + fontFamily);
	// console.log("Font weight is: " + fontWeight);

	return (
		<RNText style={{ ...flattenedStyle, fontFamily }} {...props}>
			{children}
		</RNText>
	);
};

const styles = StyleSheet.create({});

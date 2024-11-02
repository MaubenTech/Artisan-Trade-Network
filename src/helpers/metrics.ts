import { Dimensions } from "react-native";
import { PlainNamedStyles, StyleKey } from "@helpers/styles";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: PlainNamedStyles[keyof PlainNamedStyles]) => {
	if (typeof size === "number") return (width / guidelineBaseWidth) * size;
	return size;
};
const verticalScale = (size: PlainNamedStyles[keyof PlainNamedStyles]) => {
	if (typeof size === "number") return (height / guidelineBaseHeight) * size;
	return size;
};
const moderateScale = (size: PlainNamedStyles[keyof PlainNamedStyles], factor: number = 0.5) => {
	if (typeof size === "number") return size + ((horizontalScale(size) as number) - size) * factor;
	return size;
};

export { horizontalScale, verticalScale, moderateScale };

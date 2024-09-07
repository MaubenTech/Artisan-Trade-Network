import { ImageStyle } from "expo-image";
import { Platform, TextStyle, ViewStyle } from "react-native";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Generates an overall styling based on general styles, ios-specific styles and android-specific styles for a component.
 * @param generalStyles The general styles to be applied for every component.
 * @param androidStyles The android-specific styles to be applied for every component.
 * @param iosStyles The ios-specific styles to be applied for every component.
 * @returns The overall stylesheet
 */
export const compactStyles = <
	T extends NamedStyles<T>,
	U extends Partial<NamedStyles<U>>,
	V extends Partial<NamedStyles<V>>
>(
	generalStyles: T,
	androidStyles?: U,
	iosStyles?: V
): T & U & V => {
	const platformStyles =
		Platform.OS === "android"
			? androidStyles
			: Platform.OS === "ios"
			? iosStyles
			: {};
	return { ...generalStyles, ...platformStyles } as T & U & V;
};

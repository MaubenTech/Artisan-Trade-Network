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
	return deepMerge({ ...generalStyles }, platformStyles) as T & U & V;
	// return deepMerge2({ ...generalStyles }, platformStyles) as T & U & V; //also works
};

const deepMerge = <T>(target: T, source: Partial<T>): T => {
	for (const key of Object.keys(source)) {
		const value = source[key as keyof T];
		if (
			typeof value === "object" &&
			value !== null &&
			!Array.isArray(value) &&
			Object.keys(target).includes(key)
		) {
			target[key] = deepMerge(target[key], value);
		} else {
			target[key] = value;
		}
	}

	return target;
};

export const deepMerge2 = <
	T extends NamedStyles<T>,
	U extends Partial<NamedStyles<U>>
>(
	target: T,
	source: U
) => {
	// console.log("Target is: ");
	// console.log(target);
	// console.log("Source is: ");
	// console.log(source);
	for (const elementStyleKey of Object.keys(source)) {
		const value = source[elementStyleKey as keyof U];
		// console.log("Value is:");
		// console.log(value);
		if (
			typeof value === "object" &&
			value !== null &&
			!Array.isArray(value) &&
			Object.keys(target).includes(elementStyleKey)
		) {
			target[elementStyleKey] = plainMerge(target[elementStyleKey], value);
		} else {
			target[elementStyleKey] = value;
		}
	}

	return target;
};

const plainMerge = (
	target: ViewStyle | TextStyle | ImageStyle,
	source: ViewStyle | TextStyle | ImageStyle
) => {
	for (const stylePropertyKey of Object.keys(source)) {
		const value: keyof ViewStyle | keyof TextStyle | keyof ImageStyle =
			source[stylePropertyKey];
		// if (value !== null && Object.keys(target).includes(value)) {
		// }
		target[stylePropertyKey] = value;
	}

	return target;
};
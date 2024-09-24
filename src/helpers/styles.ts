import { ImageStyle } from "expo-image";
import { Dimensions, Platform, TextStyle, ViewStyle } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "./metrics";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export type PlainNamedStyles = ViewStyle | TextStyle | ImageStyle;
export type StyleKey = keyof ViewStyle | keyof TextStyle | keyof ImageStyle;

/**
 * Generates an overall styling based on general styles, ios-specific styles and android-specific styles for a component.
 * @param generalStyles The general styles to be applied for every component.
 * @param androidStyles The android-specific styles to be applied for every component.
 * @param iosStyles The ios-specific styles to be applied for every component.
 * @returns The overall stylesheet
 */
export const compactStyles = <T extends NamedStyles<T>, U extends NamedStyles<U>, V extends NamedStyles<V>>(generalStyles: T, androidStyles?: U, iosStyles?: V): T & U & V => {
	const platformStyles = Platform.OS === "android" ? androidStyles : Platform.OS === "ios" ? iosStyles : {};
	return scaleMetrics(deepMerge({ ...generalStyles }, platformStyles) as T & U & V);
	// return addFontScale(deepMerge2({ ...generalStyles }, platformStyles) as T & U & V); //also works
};

const deepMerge = <T>(target: T, source: Partial<T>): T => {
	const tempTarget = { ...target };
	for (const key of Object.keys(source)) {
		const value = source[key as keyof T];
		if (typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(target).includes(key)) {
			tempTarget[key] = deepMerge(target[key], value);
		} else {
			tempTarget[key] = value;
		}
	}

	return tempTarget;
};

export const deepMerge2 = <T extends NamedStyles<T>, U extends NamedStyles<U>>(target: T, source: U) => {
	const tempTarget = { ...target };
	// console.log("Target is: ");
	// console.log(target);
	// console.log("Source is: ");
	// console.log(source);
	for (const elementStyleKey of Object.keys(source)) {
		const value = source[elementStyleKey as keyof U];
		// console.log("Value is:");
		// console.log(value);
		if (typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(target).includes(elementStyleKey)) {
			tempTarget[elementStyleKey] = plainMerge(target[elementStyleKey], value);
		} else {
			tempTarget[elementStyleKey] = value;
		}
	}

	return tempTarget;
};

const plainMerge = (target: ViewStyle | TextStyle | ImageStyle, source: ViewStyle | TextStyle | ImageStyle) => {
	const tempTarget = { ...target };
	for (const stylePropertyKey of Object.keys(source)) {
		const value: keyof ViewStyle | keyof TextStyle | keyof ImageStyle = source[stylePropertyKey];
		// if (value !== null && Object.keys(target).includes(value)) {
		// }
		tempTarget[stylePropertyKey] = value;
	}

	return tempTarget;
};

const addFontScale = <T>(target: T): T => {
	const tempTarget = { ...target };
	const { fontScale } = Dimensions.get("window");

	for (const key of Object.keys(target)) {
		const value = tempTarget[key as keyof T];
		if (typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).includes("fontSize")) {
			const fontSize = value["fontSize"];
			tempTarget[key] = {
				...value,
				fontSize: fontSize / fontScale,
			};
		}
	}

	return tempTarget;
};

const scaleMetrics = <T>(target: T): T => {
	// console.log("Before editing: " + JSON.stringify(target));
	const tempTarget = resolveMultipleAxisStyles(target);

	const verticalScaleProperties: StyleKey[] = [
		"height",
		"minHeight",
		"maxHeight",
		"top",
		"bottom",
		"marginTop",
		"marginBottom",
		"marginVertical",
		"lineHeight",
		"paddingTop",
		"paddingBottom",
		"paddingVertical",
		"textAlignVertical",
	];
	const horizontalScaleProperties: StyleKey[] = [
		"width",
		"minWidth",
		"maxWidth",
		"left",
		"right",
		"marginLeft",
		"marginRight",
		"marginHorizontal",
		"paddingLeft",
		"paddingRight",
		"paddingHorizontal",
		"borderWidth",
		"borderTopWidth",
		"borderRightWidth",
		"borderBottomWidth",
		"borderLeftWidth",
	];
	const moderateScaleProperties: StyleKey[] = [
		"fontSize",
		"borderRadius",
		"borderTopLeftRadius",
		"borderTopRightRadius",
		"borderTopEndRadius",
		"borderBottomLeftRadius",
		"borderBottomRightRadius",
		"borderBottomStartRadius",
		"borderBottomEndRadius",
		"borderStartStartRadius",
		"borderStartEndRadius",
		"borderEndStartRadius",
		"borderEndEndRadius",
	];
	for (const key of Object.keys(target)) {
		const value = tempTarget[key as keyof T];
		if (typeof value === "object" && value !== null && !Array.isArray(value)) {
			for (const valueKey of Object.keys(value)) {
				if (verticalScaleProperties.includes(valueKey as StyleKey)) {
					const reValue = tempTarget[key as keyof T]; // to get the updated value of value, which is tempTarget[key]
					const tempValue = reValue[valueKey] as keyof typeof reValue;
					if (typeof tempValue === "number")
						tempTarget[key] = {
							...reValue,
							[valueKey]: verticalScale(tempValue),
						};
				} else if (horizontalScaleProperties.includes(valueKey as StyleKey)) {
					const reValue = tempTarget[key as keyof T]; // to get the updated value of value, which is tempTarget[key]
					const tempValue = reValue[valueKey] as keyof typeof reValue;
					if (typeof tempValue === "number")
						tempTarget[key] = {
							...reValue,
							[valueKey]: horizontalScale(tempValue),
						};
				} else if (moderateScaleProperties.includes(valueKey as StyleKey)) {
					const reValue = tempTarget[key as keyof T]; // to get the updated value of value, which is tempTarget[key]
					const tempValue = reValue[valueKey] as keyof typeof reValue;
					if (typeof tempValue === "number")
						tempTarget[key] = {
							...reValue,
							[valueKey]: moderateScale(tempValue),
						};
				}
			}
		}
	}
	// console.log("After editing: " + JSON.stringify(tempTarget));
	// console.log();
	// console.log();
	// console.log();

	return tempTarget;
};

const resolveMultipleAxisStyles = <T>(target: T): T => {
	const tempTarget = { ...target };

	for (const key of Object.keys(target)) {
		const value = tempTarget[key as keyof T];
		const valueKeys = Object.keys(value);
		if (typeof value === "object" && value !== null && !Array.isArray(value) && (valueKeys.includes("margin") || valueKeys.includes("padding") || valueKeys.includes("gap"))) {
			const margin = value["margin"] as keyof typeof value;
			const padding = value["padding"] as keyof typeof value;
			const gap = value["gap"] as keyof typeof value;
			if (margin) {
				const { margin, ...newValue } = tempTarget[key];
				tempTarget[key] = {
					...newValue,
					marginHorizontal: horizontalScale(margin),
					marginVertical: verticalScale(margin),
				};
			}
			if (padding) {
				const { padding, ...newValue } = tempTarget[key];
				tempTarget[key] = {
					...newValue,
					paddingHorizontal: horizontalScale(padding),
					paddingVertical: verticalScale(padding),
				};
			}
			if (gap) {
				const { gap, ...newValue } = tempTarget[key];
				tempTarget[key] = {
					...newValue,
					rowGap: horizontalScale(gap),
					columnGap: verticalScale(gap),
				};
			}
		}
	}

	return tempTarget;
};

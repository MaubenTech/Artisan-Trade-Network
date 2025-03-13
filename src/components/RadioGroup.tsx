import React from "react";
import { Text } from "@components/Text";
import colors from "@helpers/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, StyleSheet, Touchable, TouchableOpacity, ViewStyle, ImageStyle, TextStyle, StyleProp, Dimensions } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export type RadioData = {
	label: string;
	value: string;
};

export type RadioOption = string | RadioData;

interface RadioGroupProps {
	options: RadioOption[];
	selectedOption?: string;
	onChangeOption?: (option: string) => void;
	style?: StyleProp<ViewStyle>;
	optionStyle?: StyleProp<ViewStyle>;
	checkWithValue?: boolean;
}

const { width, height } = Dimensions.get("window");

export default function RadioGroup({ options, selectedOption, onChangeOption, style, optionStyle, checkWithValue = false }: RadioGroupProps) {
	const hasOption = (optionString: string) => {
		return (
			options.filter((option) => {
				return typeof option === "string" ? option === optionString : checkWithValue ? option.value === optionString : option.label === optionString;
			}).length > 0
		);
	};

	// console.log(`Selected option: ${selectedOption}`);
	// console.log(`HasOption?: ${hasOption(selectedOption)}`);

	return (
		<View style={[styles.container, style]}>
			<View style={styles.radioOptionContainer}>
				{options.map((rawOption: RadioOption, _) => {
					let option: RadioData = null;
					if (typeof rawOption === "string") option = { label: rawOption, value: rawOption };
					else option = rawOption;

					if ((!selectedOption || (selectedOption && !hasOption(selectedOption))) && _ === 0) onChangeOption && onChangeOption(option.value); //If selectedOption is provided and it's not part of the options, or if it's not provided at all, call the onChangeOption function and pass the first item in the options group as it's going to be "changing" the selected option to the first one.

					const activeOption = selectedOption && hasOption(selectedOption) ? selectedOption === option.value : _ === 0; // Option is active if selectedOption is provided, it exists in the options array, and is current option, otherwise if current option is the first one, then it's active as first option is considered active by default.
					const color = activeOption ? colors.inputBorderColor : colors.greyShade;
					const width = 100 / options.length;
					const paddingHorizontal = (35 / 100) * width;
					const gap = (20 / 100) * width;
					const maxFontSize = 14;
					const calculatedFontSize = (35 / 100) * width;
					const minFontSize = 12;
					const fontSize = calculatedFontSize > maxFontSize ? maxFontSize : calculatedFontSize < minFontSize ? minFontSize : calculatedFontSize;
					// console.log(calculatedFontSize);
					const maxIconSize = 25;
					const calculatedIconSize = (50 / 100) * width;
					const minIconSize = 12.5;
					// console.log(calculatedIconSize);
					const iconSize = calculatedIconSize > maxIconSize ? maxIconSize : calculatedIconSize < minIconSize ? minIconSize : calculatedIconSize;
					//TODO: Make a fontSize that adjusts based on the width of the radio button/group. It should also have a min and max fontSize that it doesn't exceed.
					return (
						<TouchableOpacity
							style={[
								styles.radioOption,
								{ width: `${width}%`, gap, paddingVertical: 15, paddingHorizontal },
								activeOption && styles.activeRadioOption,
								optionStyle,
							]}
							key={option.value}
							onPress={() => onChangeOption(option.value)}
						>
							<MaterialIcons name={activeOption ? "radio-button-on" : "radio-button-off"} color={colors.inputBorderColor} size={iconSize} />
							<Text numberOfLines={1} style={[styles.radioOptionLabel, { color, fontSize }]}>
								{option.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},

	radioOptionContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		// flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 5,
		maxWidth: "100%",
	},

	radioOption: {
		flexDirection: "row",
		alignItems: "center",
		// width: "50%",
		backgroundColor: colors.grey2,
		borderColor: colors.inputBorderColor,
		borderWidth: 1,
		borderRadius: 10,
		// padding: "6%",
	},

	activeRadioOption: {
		backgroundColor: colors.mainColor,
	},

	radioOptionLabel: {
		fontSize: 15,
		flex: 1,
	},
});

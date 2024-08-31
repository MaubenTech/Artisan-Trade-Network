import React from "react";
import colors from "../helpers/colors";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// type ButtonOptions = {
// 	positiveAction: string;
// 	negativeAction: string;
// };

export type ButtonOptions = {
	buttonTitle: number | string;
	secondButtonTitle: number | string;
	thirdButtonTitle?: number | string;
	fourthButtonTitle?: number | string;
};
export default function ButtonOptions({
	buttonOptions,
	selectedOption,
	onOptionChanged,
}: {
	buttonOptions: ButtonOptions[];
	selectedOption?: string | number;
	onOptionChanged?: React.Dispatch<React.SetStateAction<number | string>>;
}) {
	return (
		<View style={styles.budgetOptions}>
			{buttonOptions.map((buttonOption) => {
				let activeOption = selectedOption == buttonOption.buttonTitle;
				return (
					<TouchableOpacity
						style={
							activeOption
								? [styles.budgetOption, styles.activeBudgetOption]
								: [styles.budgetOption, styles.inactiveBudgetOption]
						}
						key={buttonOption.buttonTitle}
						onPress={() => onOptionChanged(buttonOption.buttonTitle)}
					>
						<Text
							style={
								activeOption
									? [styles.activeBudgetOptionText]
									: [styles.inactiveBudgetOptionText]
							}
						>
							₦
						</Text>
						<Text
							style={
								activeOption
									? [styles.activeBudgetOptionText]
									: [styles.inactiveBudgetOptionText]
							}
						>
							{buttonOption.buttonTitle}
						</Text>
						<Text
							style={
								activeOption
									? [styles.activeBudgetOptionText]
									: [styles.inactiveBudgetOptionText]
							}
						>
							-
						</Text>
						<Text
							style={
								activeOption
									? [styles.activeBudgetOptionText]
									: [styles.inactiveBudgetOptionText]
							}
						>
							{buttonOption.secondButtonTitle}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	budgetOptions: {
		gap: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
	},

	budgetOption: {
		width: "48%",
		flexDirection: "row",
		padding: "5%",
		gap: 2,
		borderRadius: 10,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.greyBorder,
	},

	activeBudgetOption: {
		backgroundColor: colors.mainColor,
	},

	inactiveBudgetOption: {
		backgroundColor: colors.grey2,
	},

	activeBudgetOptionText: {
		color: colors.whiteShade,
	},

	inactiveBudgetOptionText: {
		color: colors.greySecondaryShade,
	},
});

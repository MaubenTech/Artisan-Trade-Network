import React from "react";
import colors from "../helpers/colors";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";

type FilterOptions = {
	optionTitle: string;
};

export default function FilterComponent({
	filterOptions,
	selectedOption,
	onOptionChanged,
}: {
	filterOptions: FilterOptions[];
	selectedOption?: string | number;
	onOptionChanged?: React.Dispatch<React.SetStateAction<number | string>>;
}) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				justifyContent: "space-evenly",
				width: "100%",
				gap: 10,
			}}
		>
			{filterOptions.map((filterOption) => {
				let activeOption = selectedOption == filterOption.optionTitle;
				return (
					<TouchableOpacity
						style={
							activeOption
								? [styles.filterOption, styles.activeFilterOption]
								: [styles.filterOption, styles.inactiveFilterOption]
						}
						key={filterOption.optionTitle}
						onPress={() => onOptionChanged(filterOption.optionTitle)}
					>
						<Text
							style={
								activeOption
									? [styles.activeFilterOptionText]
									: [styles.inactiveFilterOptionText]
							}
						>
							{filterOption.optionTitle}
						</Text>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	// filterOptions: {
	// 	// gap: 10,
	// 	flexDirection: "row",
	// 	// flexWrap: "wrap",
	// },

	filterOption: {
		// width: "31%",
		flex: 0.4,
		flexDirection: "row",
		padding: "3%",
		borderRadius: 10,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.greyBorder,
	},

	activeFilterOption: {
		backgroundColor: colors.mainColor,
	},

	inactiveFilterOption: {
		backgroundColor: colors.grey2,
	},

	activeFilterOptionText: {
		color: colors.whiteShade,
	},

	inactiveFilterOptionText: {
		color: colors.greySecondaryShade,
	},
});
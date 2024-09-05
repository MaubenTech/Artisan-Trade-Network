import React from "react";
import colors from "../helpers/colors";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from "react-native";
import { Text } from "./Text";

type FilterOptions = {
	optionTitle: string;
};
const { width, height } = Dimensions.get("window");

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
				justifyContent: "space-between",
				// width: width,
				flex: 1,
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
						activeOpacity={0.9}
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
		// flex: 0.4,
		flexDirection: "row",
		padding: "2%",
		paddingHorizontal: "8%",
		borderRadius: 10,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.greyBorder,
	},

	activeFilterOption: {
		backgroundColor: colors.mainColor,
	},

	inactiveFilterOption: {
		// backgroundColor: colors.grey2,
	},

	activeFilterOptionText: {
		color: colors.whiteShade,
	},

	inactiveFilterOptionText: {
		color: colors.greySecondaryShade,
	},
});

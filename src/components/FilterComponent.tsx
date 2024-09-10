import colors from "../helpers/colors";
import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from "react-native";
import { Text } from "./Text";
import { router } from "expo-router";
import { compactStyles } from "@helpers/styles";

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
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.filterOptions}
		>
			{filterOptions.map((filterOption) => {
				let activeOption = selectedOption == filterOption.optionTitle;
				return (
					<TouchableOpacity
						style={[
							styles.filterOption,
							activeOption
								? styles.activeFilterOption
								: styles.inactiveFilterOption,
						]}
						key={filterOption.optionTitle}
						onPress={() => {
							router.navigate("/BidSubmitted");
							onOptionChanged(filterOption.optionTitle);
						}}
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

const generalStyles = StyleSheet.create({
	filterOptions: {
		width: width,
		gap: 5,
		flexDirection: "row",
		// justifyContent: "space-between",
	},

	filterOption: {
		flexGrow: 1,
		justifyContent: "center",
		// alignItems: "center",
		// textAlign: "center",
		flexDirection: "row",
		padding: "1%",
		// paddingHorizontal: "4%",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.greyBorder,
	},

	activeFilterOption: {
		backgroundColor: colors.mainColor,
		textAlign: "center",
	},

	inactiveFilterOption: {
		// backgroundColor: colors.grey2,
	},

	activeFilterOptionText: {
		color: colors.whiteShade,
		textAlign: "center",
	},

	inactiveFilterOptionText: {
		color: colors.greySecondaryShade,
		textAlign: "center",
	},
});

const androidStyles = StyleSheet.create({
	filterOptions: {
		width: width,
		gap: 5,
		flexDirection: "row",
		// justifyContent: "space-between",
	},

	filterOption: {
		flexGrow: 1,
		justifyContent: "center",
		// alignItems: "center",
		// textAlign: "center",
		flexDirection: "row",
		padding: "1%",
		// paddingHorizontal: "4%",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.greyBorder,
	},

	activeFilterOption: {
		backgroundColor: colors.mainColor,
		textAlign: "center",
	},

	inactiveFilterOption: {
		// backgroundColor: colors.grey2,
	},

	activeFilterOptionText: {
		color: colors.whiteShade,
		textAlign: "center",
	},

	inactiveFilterOptionText: {
		color: colors.greySecondaryShade,
		textAlign: "center",
	},
});

const iosStyles = StyleSheet.create({
	filterOptions: {
		width: width,
		gap: 5,
		flexDirection: "row",
		// justifyContent: "space-between",
	},

	filterOption: {
		flexGrow: 1,
		justifyContent: "center",
		// alignItems: "center",
		// textAlign: "center",
		flexDirection: "row",
		padding: "1%",
		// paddingHorizontal: "4%",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.greyBorder,
	},

	activeFilterOption: {
		backgroundColor: colors.mainColor,
		textAlign: "center",
	},

	inactiveFilterOption: {
		// backgroundColor: colors.grey2,
	},

	activeFilterOptionText: {
		color: colors.whiteShade,
		textAlign: "center",
	},

	inactiveFilterOptionText: {
		color: colors.greySecondaryShade,
		textAlign: "center",
	},
});

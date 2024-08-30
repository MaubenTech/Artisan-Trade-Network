import React from "react";
import colors from "../../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import PageHeader from "../../components/PageHeader";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomKeyboardView from "../../components/CustomKeyboardView";

const helpCenterOptions = [
	{
		optionIcon: <Ionicons name="rocket" size={15} />,
		optionTitle: "Getting Started",
		optionPreview:
			"lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
		learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
	},
	{
		optionIcon: <Ionicons name="rocket" size={15} />,
		optionTitle: "Getting Started",
		optionPreview:
			"lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
		learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
	},
	{
		optionIcon: <Ionicons name="rocket" size={15} />,
		optionTitle: "Getting Started",
		optionPreview:
			"lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
		learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
	},
	{
		optionIcon: <Ionicons name="rocket" size={15} />,
		optionTitle: "Getting Started",
		optionPreview:
			"lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
		learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
	},
];

const HelpCenter = () => {
	return (
		<>
			<PageHeader pageName="Help Center" />
			<CustomKeyboardView style={styles.container}>
				<View style={styles.searchContainer}>
					<Text style={styles.helpCenterIntro}>
						Explore our Help Center for answers to your questions and assistance
						with your experience.
					</Text>

					<View style={styles.searchBarContainer}>
						<Ionicons name="search" />
						<TextInput
							style={styles.searchBar}
							placeholder="Search your keyword"
						></TextInput>
					</View>

					<View style={styles.helpCenterOptions}>
						{helpCenterOptions.map((helpCenterOption) => {
							return (
								<>
									<View style={styles.helpCenterOptionContainer}>
										{helpCenterOption.optionIcon}
										<Text>{helpCenterOption.optionTitle}</Text>
										<Text>{helpCenterOption.optionPreview}</Text>
										<Text>Learn More {helpCenterOption.learnMoreIcon}</Text>
									</View>
								</>
							);
						})}
					</View>
				</View>
			</CustomKeyboardView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		gap: 40,
	},

	searchContainer: {
		paddingTop: 40,
		paddingHorizontal: 26,
		gap: 20,
	},

	helpCenterIntro: {
		fontWeight: "300",
	},

	searchBarContainer: {
		flexDirection: "row",
		borderColor: colors.inputBorderColor,
		borderWidth: 1,
		padding: 15,
		gap: 20,
		alignItems: "center",
		paddingHorizontal: 20,
		borderRadius: 10,
	},

	searchBar: {},

	helpCenterOptions: {
		flexDirection: "row",
	},

	helpCenterOptionContainer: {
		borderColor: colors.inputBorderColor,
		padding: 15,
	},
});

export default HelpCenter;

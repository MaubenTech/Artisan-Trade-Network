import React from "react";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import PageHeader from "../../../src/components/PageHeader";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	Pressable,
	TouchableOpacity,
} from "react-native";
import CustomKeyboardView from "../../../src/components/CustomKeyboardView";
import { Link } from "expo-router";

const helpCenterOptions = [
	{
		optionIcon: (
			<Ionicons name="rocket-outline" size={15} color={colors.mainColor} />
		),
		optionTitle: "Getting Started",
		optionPreview:
			"lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
		learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
	},
	{
		optionIcon: (
			<Ionicons name="settings-outline" size={15} color={colors.mainColor} />
		),
		optionTitle: "Account Setting",
		optionPreview:
			"lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
		learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
	},
	{
		optionIcon: (
			<Ionicons name="person-outline" size={15} color={colors.mainColor} />
		),
		optionTitle: "Profile Customization",
		optionPreview:
			"lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
		learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
	},
	{
		optionIcon: (
			<Ionicons name="lock-open-outline" size={15} color={colors.mainColor} />
		),
		optionTitle: "Privacy Tips",
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
				<ScrollView style={styles.subContainer}>
					<View style={styles.searchSection}>
						<Text style={styles.helpCenterIntro}>
							Explore our Help Center for answers to your questions and
							assistance with your experience.
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
										<Link style={styles.helpCenterOption} href={"#"} asChild>
											<TouchableOpacity>
												<View style={styles.optionIconContainer}>
													{helpCenterOption.optionIcon}
												</View>
												<Text style={styles.optionTitle}>
													{helpCenterOption.optionTitle}
												</Text>
												<Text style={styles.optionPreview}>
													{helpCenterOption.optionPreview}
												</Text>
												<Text style={styles.learnMore}>
													Learn More {helpCenterOption.learnMoreIcon}
												</Text>
											</TouchableOpacity>
										</Link>
									</>
								);
							})}
						</View>
					</View>
					<View style={styles.faqSection}>
						<View style={styles.faqHeader}>
							<Text style={styles.faqHeaderTitle}>
								Frequently Asked Questions
							</Text>
							<Text style={styles.faqHeaderSubTitle}>
								Lorem ipsum dolor sit amet, consectetur a attis. Sed vitae est{" "}
							</Text>
						</View>
					</View>
				</ScrollView>
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

	subContainer: {
		gap: 20,
	},

	searchSection: {
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
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: 19,
	},

	helpCenterOption: {
		borderColor: colors.inputBorderColor,
		borderWidth: 1,
		padding: 15,
		width: "47%",
		alignItems: "center",
		gap: 5,
	},

	optionIconContainer: {
		backgroundColor: colors.mainColorbg,
		padding: 10,
		borderRadius: 50,
	},

	optionTitle: {
		fontSize: 12,
	},

	optionPreview: {
		fontWeight: "200",
		fontSize: 10,
		textAlign: "center",
	},

	learnMore: {},

	faqSection: {
		paddingHorizontal: 26,
	},

	faqHeader: {},

	faqHeaderTitle: {},

	faqHeaderSubTitle: {},
});

export default HelpCenter;

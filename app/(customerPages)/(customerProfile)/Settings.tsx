import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "@helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@components/Text";
import SearchBar from "@components/SearchBar";
import PageHeader from "@components/PageHeader";

interface Setting {
	settingIcon: React.JSX.Element;
	settingTitle: string;
}

type SettingSection = {
	sectionHeader: string;
	settings: Setting[];
};

const allSettings: SettingSection[] = [
	{
		sectionHeader: "General",
		settings: [
			{
				settingIcon: <Ionicons name="lock-open-outline" />,
				settingTitle: "Security",
			},
			{
				settingIcon: <Ionicons name="globe-outline" />,
				settingTitle: "Language",
			},
			{
				settingIcon: <Ionicons name="contrast-outline" />,
				settingTitle: "Theme",
			},
			{
				settingIcon: <Ionicons name="notifications-outline" />,
				settingTitle: "Notification",
			},
		],
	},
	{
		sectionHeader: "App",
		settings: [
			{
				settingIcon: <Ionicons name="shield-checkmark-outline" />,
				settingTitle: "Privacy Policy",
			},
			{
				settingIcon: <Ionicons name="contract-outline" />,
				settingTitle: "Terms and Conditions",
			},
			{
				settingIcon: <Ionicons name="thumbs-up-outline" />,
				settingTitle: "Rate Us",
			},
			{
				settingIcon: <Ionicons name="share-outline" />,
				settingTitle: "Share with friends",
			},
			{
				settingIcon: <Ionicons name="information-circle-outline" />,
				settingTitle: "About App",
			},
		],
	},
];

const Settings = () => {
	return (
		<>
			<PageHeader pageName="Settings" />
			<ScrollView style={styles.container}>
				<View style={styles.searchBarContainer}>
					<SearchBar />
				</View>
				<View style={styles.settingsContainer}>
					{allSettings.map((settingsSection, index) => {
						return (
							<View key={index} style={styles.settingsSectionContainer}>
								<View>
									<Text style={styles.sectionHeaderText}>{settingsSection.sectionHeader}</Text>
								</View>
								<View style={styles.settingsSection}>
									{settingsSection.settings.map((setting, index) => {
										return (
											<View key={index} style={styles.setting}>
												<View style={styles.settingContent}>
													<View style={styles.settingIcon}>{setting.settingIcon}</View>
													<Text>{setting.settingTitle}</Text>
												</View>
												<Ionicons name="chevron-forward-outline" />
											</View>
										);
									})}
								</View>
							</View>
						);
					})}
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		gap: 25,
		paddingTop: 30,
	},

	searchBarContainer: {
		paddingHorizontal: 30,
		marginBottom: 30,
	},

	settingsContainer: {
		gap: 20,
		paddingHorizontal: 30,
		marginBottom: 60,
	},

	settingsSectionContainer: {
		gap: 10,
	},

	sectionHeaderText: {
		fontSize: 18,
		fontWeight: "500",
	},

	settingsSection: {
		borderRadius: 10,
		borderWidth: 2,
		borderColor: colors.inputBorderColor,
		padding: 10,
	},

	setting: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},

	settingContent: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},

	settingIcon: {
		backgroundColor: colors.inputBorderColor,
		padding: 8,
		borderRadius: 50,
	},
});

export default Settings;

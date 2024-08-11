import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MenuHeader from "../components/MenuHeader";
import PageHeader from "../components/PageHeader";
import colors from "../helpers/colors";

const Profile = () => {
	return (
		<View style={styles.container}>
			<PageHeader pageName="Profile" profile />
			<View style={styles.profileActivities}>
				<View style={styles.profileNumberContainer}>
					<View style={styles.profileNumber}>
						<Text style={styles.profileNumberText}>20</Text>
						<Text style={styles.profileNumberDetail}>Job Posted</Text>
					</View>
					<View style={styles.profileNumber}>
						<Text style={styles.profileNumberText}>10,000</Text>
						<Text style={styles.profileNumberDetail}>Amount Spent</Text>
					</View>
					<View style={styles.profileNumber}>
						<Text style={styles.profileNumberText}>4.5</Text>
						<Text style={styles.profileNumberDetail}>Rating</Text>
					</View>
				</View>
				<View style={styles.profileLinksContainer}>
					<View style={styles.profileLinks}></View>
					<View style={styles.profileLinks}></View>
					<View style={styles.profileLinks}></View>
					<View style={styles.profileLinks}></View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		gap: 40,
	},

	profileActivities: {
		paddingHorizontal: 30,
	},

	profileNumberContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	profileNumber: {
		alignItems: "center",
	},

	profileNumberText: {
		fontSize: 16,
	},

	profileNumberDetail: {
		fontSize: 14,
		color: colors.greySecondaryShade,
	},

	profileLinksContainer: {},

	profileLinks: {
		backgroundColor: colors.white,
		width: "100%",
		borderStyle: "solid",
		borderBottomColor: "#E2E2E2",
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		shadowOpacity: 1,
		shadowColor: "#E3E3E3",
		shadowOffset: { width: 0, height: 3 },
	},
});

export default Profile;

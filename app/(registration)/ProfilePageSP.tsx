import React from "react";
import { Link } from "expo-router";
import colors from "@helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@components/Text";
import MenuHeader from "@components/MenuHeader";
import PageHeader from "@components/PageHeader";
import JobHistory from "@assets/icons/profileSp/JobHistory.svg";
import Ratings from "@assets/icons/profileSp/Ratings.svg";
import HelpCenter from "@assets/icons/profileSp/HelpCenter.svg";
import Logout from "@assets/icons/profileSp/logout.svg";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";

import ProfilePicture from "@assets/images/ProfilePicture.svg";

const ProfilePageSP = () => {
	return (
		<View style={styles.container}>
			<PageHeader
				pageName="Profile"
				profile
				isProfileSP
				profileName="Drew Berry"
				profileServiceCategory="Carpenter"
				profilePicture={ProfilePicture}
			/>
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
				<View style={styles.mainBiocontainer}>
					<View style={styles.bioContainer}>
						<Text style={styles.bio}>Bio</Text>
						<Text style={styles.edit}>Edit</Text>
					</View>
					<Text style={{ fontSize: 12, fontWeight: "300" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis. Sed vitae
						state dignissim, iaculis nisi pellentesque
					</Text>
				</View>
				<View style={styles.profileLinksContainer}>
					<Link style={styles.profileLinks} asChild href={"/(customerPages)/(profile)/JobHistory"}>
						<TouchableOpacity>
							<JobHistory width={120} style={{}} />
							<Text style={styles.profileLinksText}>Job History</Text>
						</TouchableOpacity>
					</Link>
					<Link style={styles.profileLinks} asChild href={"/(customerPages)/(profile)/MyRatings"}>
						<TouchableOpacity>
							<Ratings width={120} />
							<Text style={styles.profileLinksText}>Ratings</Text>
						</TouchableOpacity>
					</Link>
					<Link style={styles.profileLinks} asChild href={"/(customerPages)/(profile)/HelpCenter"}>
						<TouchableOpacity>
							<HelpCenter width={120} />
							<Text style={styles.profileLinksText}>Help Center</Text>
						</TouchableOpacity>
					</Link>
					<Link style={[styles.profileLinks, { backgroundColor: colors.mainColor }]} asChild href={"#"}>
						<TouchableOpacity>
							<View
								style={{
									backgroundColor: "white",
									padding: 10,
									borderRadius: 50,
									position: "absolute",
									left: 10,
									top: 10,
								}}
							>
								<Logout />
							</View>
							<Text style={[styles.profileLinksText, { color: colors.white }]}>Logout</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		gap: 30,
	},

	profileActivities: {
		paddingHorizontal: 30,
		gap: 40,
	},

	profileNumberContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 30,
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

	mainBiocontainer: {},

	bioContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "20%",
		marginTop: "-7.8%",
		marginBottom: "2.5%",
	},

	bio: {
		fontWeight: "400",
		fontSize: 18,
	},

	edit: {
		textDecorationLine: "underline",
		marginTop: "4%",
	},
	profileLinksContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: 20,
	},

	profileLinks: {
		// backgroundColor: '#E6E7E9',
		width: "40%",
		height: 120,
		borderStyle: "solid",
		borderBottomColor: "#E2E2E2",
		borderRadius: 10,
		shadowOpacity: 1,
		shadowColor: "#E3E3E3",
		shadowOffset: { width: 0, height: 3 },
		gap: 20,
		alignItems: "center",
		padding: 10,
		justifyContent: "center",
		position: "relative",
	},

	profileLinksIconContainer: {
		backgroundColor: colors.mainColor,
		padding: 5,
		borderRadius: 50,
		width: 30,
		alignItems: "center",
		height: 30,
	},

	profileLinksText: {
		fontSize: 12,
		width: 50,
		color: "black",
		position: "absolute",
		bottom: 10,
		left: 20,
	},
});

export default ProfilePageSP;

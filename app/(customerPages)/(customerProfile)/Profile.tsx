import React from "react";
import { Link, useRouter } from "expo-router";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MenuHeader from "../../../src/components/MenuHeader";
import PageHeader from "../../../src/components/PageHeader";
import { Pressable, TouchableOpacity } from "react-native";
import useAppDispatch from "@hooks/useAppDispatch";
import { selectCurrentUser, userLoggedOut } from "@store/authSlice";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import { compactStyles } from "@helpers/styles";
import { useSelector } from "react-redux";
import ProfilePicture from "@assets/images/ProfilePictureNormal.svg";
import { Icon } from "@expo/vector-icons/build/createIconSet";

type ProfileLinks = {
	title: string;
	icon: React.JSX.Element;
	links: string;
};

const Profile = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const { firstname } = useSelector(selectCurrentUser);

	const router = useRouter();

	const dispatch = useAppDispatch();

	const profileLinks: ProfileLinks[] = [
		{
			title: "Job History",
			icon: <Ionicons name="time-outline" size={20} color={"white"} />,
			links: "/(customerPages)/(profile)/JobHistory",
		},
		{
			title: "My Ratings",
			icon: <Ionicons name="thumbs-up-outline" size={20} color={"white"} />,
			links: "/(customerPages)/(profile)/MyRatings",
		},
		{
			title: "Help Center",
			icon: <Ionicons name="information-circle-outline" size={20} color={"white"} />,
			links: "/(customerPages)/(profile)/HelpCenter",
		},
		{
			title: "Logout",
			icon: <Ionicons name="information-circle-outline" size={20} color={"white"} />,
			links: "/(customerPages)/(profile)/HelpCenter",
		},
	];

	return (
		<View style={styles.container}>
			<PageHeader pageName="Profile" profile profilePicture={ProfilePicture} profileName={firstname} />
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
					<Link style={styles.profileLinks} asChild href={"/JobHistory"}>
						<TouchableOpacity>
							<View style={styles.profileLinksIconContainer}>
								<Ionicons name="time-outline" size={20} color={"white"} />
							</View>
							<Text style={styles.profileLinksText}>Job {"\n"}History</Text>
						</TouchableOpacity>
					</Link>
					<Link style={styles.profileLinks} asChild href={"/MyRatings"}>
						<TouchableOpacity>
							<View style={styles.profileLinksIconContainer}>
								<Ionicons name="thumbs-up-outline" size={20} color={"white"} />
							</View>
							<Text style={styles.profileLinksText}>My {"\n"}Ratings</Text>
						</TouchableOpacity>
					</Link>
					<Link style={styles.profileLinks} asChild href={"/HelpCenter"}>
						<TouchableOpacity>
							<View style={styles.profileLinksIconContainer}>
								<Ionicons name="information-circle-outline" size={20} color={"white"} />
							</View>
							<Text style={styles.profileLinksText}>Help {"\n"}Center</Text>
						</TouchableOpacity>
					</Link>
					<Link style={styles.profileLinks} asChild href={"#"}>
						<TouchableOpacity
							onPress={() => {
								dispatch(userLoggedOut());
								router.navigate("/");
							}}
						>
							<View style={styles.profileLinksIconContainer}>
								<Ionicons name="log-out-outline" size={20} color={"white"} />
							</View>
							<Text style={styles.profileLinksText}>Logout</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</View>
	);
};

export default Profile;

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		gap: 40,
	},

	profileActivities: {
		paddingHorizontal: 30,
		gap: 50,
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
		fontSize: 14,
	},

	profileNumberDetail: {
		fontSize: 12,
		color: colors.greySecondaryShade,
	},

	profileLinksContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: 20,
	},

	profileLinks: {
		backgroundColor: colors.white,
		width: "40%",
		height: 120,
		borderStyle: "solid",
		borderBottomColor: "#E2E2E2",
		borderRadius: 10,
		shadowOpacity: 1,
		shadowColor: "#E3E3E3",
		shadowOffset: { width: 0, height: 3 },
		gap: 20,
		alignItems: "flex-start",
		padding: 10,
		justifyContent: "center",
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
		fontSize: 18,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	profileLinks: {
		height: 100,
		width: "45%",
	},

	profileLinksIconContainer: {
		padding: 4,
		height: 25,
		width: 35,
		alignItems: "center",
		justifyContent: "center",
	},
});

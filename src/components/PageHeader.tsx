import {
	View,
	Text,
	StyleSheet,
	ViewStyle,
	TextStyle,
	ColorValue,
	Platform,
} from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import colors from "../helpers/colors";
import React, { ReactElement } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ios = Platform.OS == "ios";
const ProfilePic = require("../../assets/images/profilePic.png");
export default function PageHeader({
	pageName,
	style,
	icon,
	profile,
}: {
	pageName: string;
	style?: ViewStyle | TextStyle | ColorValue;
	icon?: ReactElement<any, any>;
	profile?: boolean;
}) {
	const { top } = useSafeAreaInsets();
	return (
		<View
			style={
				profile
					? [
							styles.profileHeaderStyle,
							styles.pageHeaderContainer,
							{ paddingTop: ios ? top + 20 : top + 30 },
					  ]
					: [
							styles.pageHeaderContainer,
							{ paddingTop: ios ? top + 20 : top + 30 },
					  ]
			}
		>
			<View style={styles.pageHeaderElement}>
				<View
					style={
						profile
							? {
									...styles.pageHeaderElementsContainer,
									justifyContent: "space-between",
							  }
							: styles.pageHeaderElementsContainer
					}
				>
					<View
						style={{
							backgroundColor: colors.buttonsBg,
							padding: 5,
							borderRadius: 200,
						}}
					>
						<Ionicons
							name="chevron-back"
							size={20}
							onPress={() => router.back()}
						/>
					</View>
					<Text style={styles.pageHeaderTitle}>{pageName}</Text>
					{profile ? (
						<View style={styles.settingsContainer}>
							<Ionicons name="settings-outline" size={20} />
						</View>
					) : (
						<></>
					)}
				</View>
			</View>
			{profile ? (
				<View style={styles.profileDetails}>
					<View style={styles.profilePicContainer}>
						<Image
							source={ProfilePic}
							style={styles.profilePic}
							contentFit="contain"
						/>
					</View>
					<Text style={styles.profileName}>Nonso Rob</Text>
					<Link href={"/"} style={styles.editProfile}>
						Edit
					</Link>
				</View>
			) : (
				<></>
			)}

			<View style={profile ? {} : styles.pageHeaderContainerBorder}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	pageHeaderContainer: {
		width: "100%",
		backgroundColor: colors.white,
	},

	profileHeaderStyle: {
		backgroundColor: colors.white,
		width: "100%",
		borderStyle: "solid",
		borderBottomColor: "#E2E2E2",
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		shadowOpacity: 1,
		shadowColor: "#E3E3E3",
		shadowOffset: { width: 0, height: 3 },
		paddingBottom: 30,
	},

	pageHeaderElement: {},

	pageHeaderContainerBorder: {
		width: "100%",
		borderBottomWidth: 3,
		borderStyle: "solid",
		borderColor: colors.whiteShade,
		shadowOpacity: 3,
		shadowColor: "#E0E0E0",
		shadowOffset: { width: 0, height: -1 },
	},

	pageHeaderElementsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		paddingLeft: "5%",
		paddingBottom: "5%",
	},

	pageHeaderTitle: {
		fontSize: 19,
		fontWeight: "500",
	},

	settingsContainer: {
		backgroundColor: colors.buttonsBg,
		padding: 10,
		borderRadius: 50,
	},

	profileDetails: {
		alignItems: "center",
		gap: 10,
	},

	profilePicContainer: {
		height: 70,
	},

	profilePic: {
		width: 100,
		height: "100%",
		objectFit: "contain",
	},

	profileName: {
		fontSize: 20,
	},

	editProfile: {
		textDecorationLine: "underline",
		color: colors.greySecondaryShade,
	},
});
import { Text } from "./Text";
import { Image } from "expo-image";
import colors from "@helpers/colors";
import { Link, router } from "expo-router";
import React, { Component, ReactElement } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MoreIcon from "@assets/icons/services/moreIcon.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, ViewStyle, TextStyle, ColorValue, Platform, ImageSourcePropType, TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";

const ios = Platform.OS == "ios";
const ProfilePic = require("@assets/images/profilePic.png");

interface PageHeaderParams {
	pageName?: string;
	style?: ViewStyle | TextStyle | ColorValue;
	icon?: ReactElement<any, any>;
	profile?: boolean;
	profileName?: string;
	isApplicantPage?: boolean;
	isProfileSP?: boolean;
	profileServiceCategory?: string;
	profilePicture?: React.FC<SvgProps> | ImageSourcePropType;
	width?: number;
	height?: number;
}
const PageHeader: React.FC<PageHeaderParams> = ({
	pageName,
	style,
	icon,
	profile,
	profileName,
	isApplicantPage,
	isProfileSP,
	profileServiceCategory: profileTitle,
	profilePicture,
	width = 60,
	height = 100,
}) => {
	const { top } = useSafeAreaInsets();

	return (
		<View
			style={
				profile
					? [styles.profileHeaderStyle, styles.pageHeaderContainer, { paddingTop: ios ? top + 20 : top + 30 }]
					: [styles.pageHeaderContainer, { paddingTop: ios ? top + 20 : top + 30 }]
			}
		>
			<View style={styles.pageHeaderElement}>
				<View
					style={
						profile
							? {
									...styles.profilePageHeaderContainer,
									justifyContent: "space-between",
							  }
							: styles.pageHeaderElementsContainer
					}
				>
					{pageName || pageName == "" ? (
						<View
							style={{
								backgroundColor: colors.buttonsBg,
								padding: 5,
								borderRadius: 200,
							}}
						>
							<Ionicons name="chevron-back" size={20} onPress={() => router.back()} />
						</View>
					) : (
						<></>
					)}

					<Text style={styles.pageHeaderTitle}>{pageName}</Text>
					{profile ? (
						isApplicantPage ? (
							<Link style={styles.settingsContainer} asChild href={"/(customerPages)/(customerProfile)/Settings"}>
								<TouchableOpacity>
									<MoreIcon color={"black"} />
								</TouchableOpacity>
							</Link>
						) : (
							<Link style={[styles.settingsContainer]} asChild href={"/(customerPages)/(customerProfile)/Settings"}>
								<TouchableOpacity>
									<Ionicons name="settings-outline" size={20} />
								</TouchableOpacity>
							</Link>
						)
					) : (
						<></>
					)}
				</View>
			</View>
			{profile ? (
				<View style={styles.profileDetails}>
					<View style={styles.profilePicContainer}>
						{/* <Image source={ProfilePic} style={styles.profilePic} contentFit="contain" /> */}
						{profilePicture ? (
							typeof profilePicture === "function" ? (
								React.createElement(profilePicture, { width, height })
							) : (
								<Image source={ProfilePic} style={styles.profilePic} contentFit="contain" />
							)
						) : (
							<Image source={ProfilePic} style={styles.profilePic} contentFit="contain" />
							// <></>
						)}
					</View>
					<Text style={[profilePicture ? { marginTop: 80, ...styles.profileName } : styles.profileName]}>
						{profileName ? profileName : "Nonso Rob"}
					</Text>
					{profileName ? (
						<>
							<Text>{profileTitle}</Text>
							{isProfileSP ? <Text style={styles.editProfile}>Edit</Text> : null}
							<Text style={styles.editProfile}>Edit</Text>
						</>
					) : (
						<Link href={"/"} style={styles.editProfile}>
							Edit
						</Link>
					)}
				</View>
			) : (
				<></>
			)}

			<View style={profile ? {} : styles.pageHeaderContainerBorder}></View>
		</View>
	);
};

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
		gap: 2,
		paddingHorizontal: 20,
		paddingBottom: "5%",
	},

	profilePageHeaderContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		paddingHorizontal: 20,
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
		gap: 5,
	},

	profilePicContainer: {
		// height: 50,
		flex: 1,
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
		marginTop: -25, //smh
	},
});

export default PageHeader;

import React from "react";
import { Image } from "expo-image";
import colors from "../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	Button,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import MenuIcon from "../../assets/images/menuIcon.svg";
import NotificationPresent from "../../assets/images/notificationPresent.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

import ProfilePic from "../../assets/images/profilePic.png";

const ios = Platform.OS == "ios";
const MenuHeader = () => {
	const { top } = useSafeAreaInsets();
	return (
		<View style={(styles.menuContainer, { paddingTop: ios ? top : top + 10 })}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<MenuIcon />
				<View style={styles.menuOptions}>
					<View style={styles.notificationIconContainer}>
						<Ionicons
							name="notifications-outline"
							size={25}
							style={styles.notificationBell}
						/>
						<NotificationPresent style={styles.notificationPresent} />
					</View>
					<Link
						style={styles.profilePicContainer}
						// href={"/(customerPages)/(profile)/Profile"}
						href={"/Profile"}
						asChild
					>
						<TouchableWithoutFeedback>
							<Image
								source={ProfilePic}
								style={styles.profilePic}
								contentFit="contain"
							/>
						</TouchableWithoutFeedback>
					</Link>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	menuContainer: {
		// paddingTop: "20%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// width: "100%",
	},

	menuOptions: {
		flexDirection: "row",
		// width: "50%",
		justifyContent: "space-between",
		alignItems: "center",
	},

	notificationIconContainer: {
		borderColor: colors.whiteShade,
		borderWidth: 1,
		borderRadius: 50,
		paddingTop: "2%",
		paddingBottom: "2%",
		paddingLeft: "2%",
		paddingRight: "2%",
		alignItems: "center",
		// height: "50%",
		position: "relative",
	},

	notificationBell: {},

	notificationPresent: {
		position: "absolute",
		left: 18,
		top: 5,
	},

	profilePicContainer: {
		height: 40,
	},

	profilePic: {
		width: 35,
		height: "180%",
		objectFit: "contain",
	},
});

export default MenuHeader;

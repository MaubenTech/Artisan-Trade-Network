import React from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import colors from "@helpers/colors";
import { compactStyles } from "@helpers/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MenuIcon from "@assets/images/menuIcon.svg";
import ProfilePic from "@assets/images/profilePic.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationPresent from "@assets/images/notificationPresent.svg";
import { View, StyleSheet, Platform, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import useAppSelector from "@hooks/useAppSelector";
import { selectCurrentUser } from "@store/authSlice";
import useRoles from "@hooks/useRoles";

const ios = Platform.OS == "ios";
const MenuHeader = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const { isRegularUser, isArtisan } = useRoles();

	const { top } = useSafeAreaInsets();
	return (
		<View style={(styles.menuContainer, { paddingTop: ios ? top : top + 10, backgroundColor: "white" })}>
			<View style={styles.menuHeaderContainer}>
				<MenuIcon />
				<View style={styles.menuOptions}>
					<Link style={styles.notificationIconContainer} asChild href={"/Notifications"}>
						<TouchableOpacity>
							<View>
								<Ionicons name="notifications-outline" size={25} style={styles.notificationBell} />
								<NotificationPresent style={styles.notificationPresent} />
							</View>
						</TouchableOpacity>
					</Link>
					<Link
						style={styles.profilePicContainer}
						// href={"/(customerPages)/(profile)/Profile"}
						href={isRegularUser ? "/Profile" : isArtisan ? "/ProfilePageSP" : ""}
						asChild
					>
						<TouchableOpacity activeOpacity={1}>
							<Image source={ProfilePic} style={styles.profilePic} contentFit="contain" />
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</View>
	);
};

const generalStyles = StyleSheet.create({
	menuContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "white",
	},

	menuHeaderContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		backgroundColor: "white",
	},

	menuOptions: {
		flexDirection: "row",
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
		height: "100%",
		objectFit: "contain",
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	menuHeaderContainer: {
		alignItems: "center",
	},

	profilePicContainer: {
		height: 20,
	},

	profilePic: {
		height: "100%",
	},
});

export default MenuHeader;

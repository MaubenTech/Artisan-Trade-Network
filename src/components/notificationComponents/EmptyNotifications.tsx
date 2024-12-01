import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import React from "react";
import { compactStyles } from "@helpers/styles";
import EmptyNotificationSvg from "@assets/images/empty-notifications-page.svg";
import colors from "@helpers/colors";
import ButtonGroup from "@components/ButtonGroup";

const EmptyNotifications = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	return (
		<View style={styles.container}>
			<EmptyNotificationSvg />
			<View style={styles.textContainer}>
				<Text style={styles.title}>Empty Notification</Text>
				<Text style={styles.content}>Lorem ipsum dolor sit amet, consecteturelit. Etiam sed metus at est iaculis</Text>
			</View>
			<ButtonGroup positiveOption="Go back to home" href={"/Home"} containerStyle={styles.button} />
		</View>
	);
};

export default EmptyNotifications;

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
		marginBottom: "35%",
	},
	textContainer: {
		gap: 10,
		paddingHorizontal: 30,
	},
	title: {
		textAlign: "center",
		fontWeight: "600",
		fontSize: 27,
	},
	content: {
		textAlign: "center",
		color: colors.subTitlesColor,
	},
	button: {
		paddingHorizontal: 30,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

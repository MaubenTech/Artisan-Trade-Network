import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import React from "react";
import { compactStyles } from "@helpers/styles";
import EmptyJobsSvg from "@assets/images/empty-jobs-page.svg";
import colors from "@helpers/colors";
import ButtonGroup from "@components/ButtonGroup";

const EmptyJobs = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	return (
		<View style={styles.container}>
			<EmptyJobsSvg width={"35%"} />
			<View style={styles.textContainer}>
				<Text style={styles.title}>No Job Posted</Text>
				<Text style={styles.content}>Lorem ipsum dolor sit amet, consecteturelit. Etiam sed metus at est iaculis</Text>
			</View>
		</View>
	);
};

export default EmptyJobs;

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "55%",
	},
	textContainer: {
		paddingHorizontal: 40,
	},
	title: {
		textAlign: "center",
		fontWeight: "600",
		fontSize: 25,
	},
	content: {
		fontSize: 11,
		textAlign: "center",
		color: colors.subTitlesColor,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

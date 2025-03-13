import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";

import HeaderImage from "@assets/images/passwordUpdatedHeader.svg";
import React from "react";
import colors from "@helpers/colors";
import { Text } from "@components/Text";
import ButtonGroup from "@components/ButtonGroup";
import { compactStyles } from "@helpers/styles";

const { width, height } = Dimensions.get("window");

interface PasswordUpdatedProps {
	onProceed: () => void;
}

const PasswordUpdated = ({ onProceed }: PasswordUpdatedProps): JSX.Element => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const router = useRouter();
	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" scrollEnabled={false}>
			<View style={styles.imageContainer}>
				<HeaderImage width={300} height={300} />
			</View>
			<View style={styles.forgotPasswordContainer}>
				<View style={styles.lch}>
					<Text style={styles.lchHeader}>Password Updated</Text>
					<Text style={styles.lchText}>Your password has been successfully updated</Text>
				</View>

				<View style={styles.buttonsContainer}>
					<ButtonGroup positiveOption="Back to Login" onPress={onProceed} positiveOptionTextStyle={styles.primaryButtonText} vertical />
				</View>
			</View>
		</ScrollView>
	);
};

export default PasswordUpdated;

const generalStyles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: 10,
	},

	imageContainer: {
		paddingTop: "35%",
	},

	forgotPasswordContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		paddingHorizontal: 35,
		gap: 50,
	},

	lch: {
		alignItems: "center",
		width: "100%",
	},

	lchHeader: {
		fontSize: 26,
		fontWeight: "700",
	},

	lchText: {
		fontWeight: "300",
		fontSize: 13,
		paddingLeft: "12%",
		paddingRight: "12%",
		textAlign: "center",
	},

	buttonsContainer: {},

	primaryButton: {
		alignItems: "center",
		backgroundColor: colors.mainColor,
		borderRadius: 15,
		justifyContent: "center",
		padding: 15,
	},

	primaryButtonText: {
		fontSize: 16,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	lch: {
		gap: 5,
	},
});

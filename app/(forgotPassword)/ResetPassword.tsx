import { StyleSheet, View, TextInput, TouchableOpacity, Dimensions, ScrollView, Platform } from "react-native";
import { Text } from "@components/Text";
import { Link, useRouter } from "expo-router";

import HeaderImage from "@assets/images/resetPasswordHeader.svg";
import React from "react";
import colors from "@helpers/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonGroup from "@components/ButtonGroup";
import { compactStyles } from "@helpers/styles";
import useKeyboardHeight from "@helpers/useKeyboardHeight";

const { width, height } = Dimensions.get("window");

const ResetPassword = (): JSX.Element => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const router = useRouter();
	const keyboardHeight = useKeyboardHeight();
	const { top } = useSafeAreaInsets();
	return (
		<ScrollView style={{ marginTop: top }} contentContainerStyle={styles.container}>
			<View style={styles.imageContainer}>
				<HeaderImage width={250} height={250} />
			</View>
			<View style={styles.resetPasswordContainer}>
				<View style={styles.lch}>
					<Text style={styles.lchHeader}>Reset Password?</Text>
					<Text style={styles.lchText}>You have passed the verification, now you can change your password.</Text>
				</View>
				<View style={styles.resetPasswordFormContainer}>
					<View style={styles.resetPasswordDetailContainer}>
						<Text style={styles.formText}>Password</Text>
						<TextInput style={styles.resetPasswordInput} secureTextEntry />
					</View>
					<View style={styles.resetPasswordDetailContainer}>
						<Text style={styles.formText}>Re-Password</Text>
						<TextInput style={styles.resetPasswordInput} secureTextEntry />
					</View>
				</View>
				<View style={[styles.buttonsContainer, Platform.OS === "ios" && { paddingBottom: keyboardHeight }]}>
					<ButtonGroup
						positiveOption="Reset Password"
						href="/PasswordUpdated"
						negativeOption="Back to Login"
						negativeOnPress={() => {
							router.navigate("/");
						}}
						vertical
					/>
					<View style={styles.signUpOption}>
						<Text style={{ marginRight: "2%" }}>Don't have an account?</Text>
						<Link href="/SignUp" style={{ textDecorationLine: "underline" }}>
							<Text>Sign up</Text>
						</Link>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default ResetPassword;

const generalStyles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: "center",
	},

	resetPasswordContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		paddingHorizontal: 30,
	},

	lch: {
		alignItems: "flex-start",
		width: "100%",
	},

	lchHeader: {
		fontSize: 23,
		fontWeight: "700",
	},

	lchText: {
		fontWeight: "300",
		paddingRight: "10%",
		fontSize: 12,
	},

	resetPasswordFormContainer: {
		flex: 1,
		gap: 15,
	},

	resetPasswordDetailContainer: {},

	formText: {},

	resetPasswordInput: {
		paddingHorizontal: 25,
		borderColor: colors.inputBorderColor,
		borderWidth: 1.05,
		borderRadius: 10,
		fontSize: 13,
	},

	buttonsContainer: {},

	signUpOption: {
		marginTop: "5%",
		flexDirection: "row",
		justifyContent: "center",
	},
});

const androidStyles = StyleSheet.create({
	container: {
		gap: 10,
	},

	imageContainer: {
		paddingTop: "10%",
	},

	resetPasswordContainer: {
		gap: 20,
		paddingBottom: "5%",
	},

	resetPasswordInput: {
		paddingVertical: "3%",
		fontSize: 12,
	},
});

const iosStyles = StyleSheet.create({
	container: {
		paddingBottom: 30,
	},

	imageContainer: {
		paddingTop: "5%",
	},

	resetPasswordContainer: {
		gap: 15,
	},

	lch: {
		gap: 5,
	},

	resetPasswordFormContainer: {
		flex: 1,
		gap: 15,
	},

	resetPasswordInput: {
		paddingVertical: "5%",
		fontSize: 13,
	},
});

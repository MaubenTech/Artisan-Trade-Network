import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import { Link, useNavigation } from "expo-router";

import HeaderImage from "../../assets/images/forgotPasswordHeader.svg";
import { useState } from "react";
import React from "react";
import colors from "../../src/helpers/colors";
import { Text } from "../../src/components/Text";

const { width, height } = Dimensions.get("window");

const ForgotPassword = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			scrollEnabled={false}
		>
			<View style={styles.imageContainer}>
				<HeaderImage width={250} height={250} />
			</View>
			<View style={styles.forgotPasswordContainer}>
				<View style={styles.lch}>
					<Text style={styles.lchHeader}>Forgot Password?</Text>
					<Text style={styles.lchText}>
						No worries, we'll send you reset instruction
					</Text>
				</View>
				<View style={styles.forgotPasswordFormContainer}>
					<Text style={styles.formText}>Email or Username</Text>
					<TextInput
						style={styles.forgotPasswordInput}
						placeholder="example@gmail.com"
						placeholderTextColor={"#8F8F8F"}
					/>
				</View>
				<View style={styles.buttonsContainer}>
					<Link
						style={[styles.button, styles.primaryButton]}
						asChild
						href={"/ResetPassword"}
					>
						<TouchableOpacity>
							<Text style={[styles.buttonText, styles.primaryButtonText]}>
								Reset Password
							</Text>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity
						style={[styles.button, styles.secondaryButton]}
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Text style={styles.buttonText}>Back to Login</Text>
					</TouchableOpacity>
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

export default ForgotPassword;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexGrow: 1,
		alignItems: "center",
		gap: 10,
	},

	imageContainer: {
		paddingTop: "15%",
		// marginBottom: "8%",
	},

	image: {},

	forgotPasswordContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		paddingLeft: 30,
		paddingRight: 30,
		gap: 20,
		paddingBottom: "5%",
	},

	lch: {
		alignItems: "flex-start",
		width: "100%",
		// gap: 7,
		marginBottom: "5%",
	},

	lchHeader: {
		fontSize: 23,
		fontWeight: "700",
	},

	lchText: {
		fontWeight: "300",
		fontSize: 12,
		paddingRight: "10%",
	},

	forgotPasswordFormContainer: {
		flex: 1,
		// gap: 20,
		marginBottom: "6%",
	},

	forgotPasswordInput: {
		padding: "4%",
		paddingLeft: 25,
		paddingRight: 25,
		borderColor: colors.inputBorderColor,
		borderWidth: 1.05,
		borderRadius: 10,
	},

	formText: {
		fontSize: 14,
		// marginBottom: 5,
	},

	buttonsContainer: {
		gap: 10,
	},

	button: {
		alignItems: "center",
		borderRadius: 15,
		justifyContent: "center",
		padding: 15,
	},

	primaryButton: {
		backgroundColor: colors.mainColor,
	},

	secondaryButton: {
		borderWidth: 1,
	},

	buttonText: {
		textAlign: "center",
		fontSize: 16,
	},

	primaryButtonText: {
		color: "#fff",
	},

	signUpOption: {
		marginTop: "5%",
		flexDirection: "row",
		justifyContent: "center",
	},

	links: {
		textDecorationColor: "#52A2F2",
		textDecorationLine: "underline",
		color: "#52A2F2",
	},
});

import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import { Text } from "../../src/components/Text";
import { Link, useNavigation, useRouter } from "expo-router";

import HeaderImage from "../../assets/images/resetPasswordHeader.svg";
import React from "react";
import colors from "../../src/helpers/colors";

const { width, height } = Dimensions.get("window");

const ResetPassword = (): JSX.Element => {
	const router = useRouter();
	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			scrollEnabled={true}
			bounces={false}
		>
			<View style={styles.imageContainer}>
				<HeaderImage width={250} height={250} />
			</View>
			<View style={styles.resetPasswordContainer}>
				<View style={styles.lch}>
					<Text style={styles.lchHeader}>Reset Password?</Text>
					<Text style={styles.lchText}>
						You have passed the verification, now you can change your password.
					</Text>
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
				<View style={styles.buttonsContainer}>
					<Link
						style={[styles.button, styles.primaryButton]}
						asChild
						href={"/PasswordUpdated"}
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
							router.navigate("/");
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

export default ResetPassword;

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

	resetPasswordContainer: {
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
		// marginBottom: "5%",
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

	resetPasswordFormContainer: {
		flex: 1,
		gap: 15,
		// flexShrink: 1,
		// marginBottom: "6%",
	},

	resetPasswordDetailContainer: {},

	resetPasswordInput: {
		padding: "3%",
		paddingLeft: 25,
		paddingRight: 25,
		borderColor: colors.inputBorderColor,
		borderWidth: 1.05,
		borderRadius: 10,
		fontSize: 12,
	},

	formText: {
		fontSize: 14,
		// marginBottom: 5,
	},

	buttonsContainer: {
		gap: 10,
		// backgroundColor: "#f0f",
	},

	button: {
		backgroundColor: "000",
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

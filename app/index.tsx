import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";

import HeaderImage from "../assets/images/loginPageHeader.svg";
import FacebookLogo from "../assets/images/facebook.svg";
import GoogleLogo from "../assets/images/google.svg";
import AppleLogo from "../assets/images/apple-logo.svg";
import { useState } from "react";
import React from "react";
import colors from "../src/helpers/colors";
import { Text, TextInput } from "../src/components/Text";

const { width, height } = Dimensions.get("window");

function Login() {
	const [isChecked, setChecked] = useState(false);
	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			scrollEnabled={false}
		>
			<View style={styles.imageContainer}>
				<HeaderImage width={86} height={86} />
			</View>
			<View style={styles.loginContainer}>
				<View style={styles.lch}>
					<Text style={styles.lchHeader}>Login to your account</Text>
					<Text style={styles.lchText}>
						Welcome back! Please enter your details
					</Text>
				</View>
				<View style={styles.loginFormContainer}>
					<View style={styles.loginDetailContainer}>
						<Text style={styles.formText}>Email</Text>
						<TextInput
							style={styles.loginInput}
							placeholder="example@gmail.com"
							placeholderTextColor={"#8F8F8F"}
						/>
					</View>
					<View style={styles.loginDetailContainer}>
						<Text style={styles.formText}>Password</Text>
						<TextInput
							style={styles.loginInput}
							placeholder="Enter Your Password"
							placeholderTextColor={"#8F8F8F"}
						/>
					</View>
					<View style={styles.loginActions}>
						<View style={styles.check}>
							<Checkbox
								style={styles.checkbox}
								value={isChecked}
								onValueChange={setChecked}
							/>
							<Text>Remember Me</Text>
						</View>
						<Link href={"/ForgotPassword"} asChild>
							<TouchableWithoutFeedback>
								<Text style={styles.formText}>Forgot Password ?</Text>
							</TouchableWithoutFeedback>
						</Link>
					</View>
				</View>
				<View style={styles.loginButtonContainer}>
					<Link
						style={{
							alignItems: "center",
							backgroundColor: colors.mainColor,
							borderRadius: 15,
							justifyContent: "center",
							padding: 15,
						}}
						asChild
						href={"(home)/Home"}
					>
						<TouchableOpacity
							style={[
								{
									alignItems: "center",
									justifyContent: "center",
									padding: 20,
								},
							]}
						>
							<Text
								style={[
									{
										textAlign: "center",
										fontWeight: "600",
										fontSize: 16,
										color: "white",
									},
								]}
							>
								Login
							</Text>
						</TouchableOpacity>
					</Link>
					<View style={styles.loginOptions}>
						<Text style={[{ textAlign: "center" }, styles.formText]}>
							Or Login With
						</Text>
						<View style={styles.loginOptionsContainer}>
							<View style={styles.logoBorder}>
								<FacebookLogo />
							</View>
							<View style={styles.logoBorder}>
								<GoogleLogo />
							</View>
							<View style={styles.logoBorder}>
								<AppleLogo />
							</View>
						</View>
					</View>
					<View style={styles.signUpOption}>
						<Text style={{ marginRight: "2%" }}>Don't have an account?</Text>
						<Link href={"(registration)/SignUp"} style={styles.links}>
							Sign up
						</Link>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

export default Login;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexGrow: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		gap: 10,
	},

	imageContainer: {
		paddingTop: "20%",
		marginBottom: "8%",
	},

	image: {},

	loginContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		paddingLeft: 30,
		paddingRight: 30,
		gap: 10,
		paddingBottom: "5%",
		// backgroundColor: "#f0f",
	},

	lch: {
		// backgroundColor: "#f0f",
		// flex: 0.3,
		marginBottom: "5%",
		alignItems: "flex-start",
		width: "100%",
		// gap: 7,
	},

	lchHeader: {
		fontSize: 23,
		fontWeight: "700",
		// backgroundColor: "#f0f",
	},

	lchText: {
		fontWeight: "300",
		fontSize: 12,
	},

	loginFormContainer: {
		flex: 1,
		gap: 20,
		// marginBottom: "6%",
	},

	loginDetailContainer: {},

	loginInput: {
		padding: "4%",
		paddingLeft: 25,
		paddingRight: 25,
		borderColor: colors.inputBorderColor,
		borderWidth: 1.05,
		borderRadius: 10,
		fontSize: 13,
	},

	formText: {
		fontSize: 14,
		// marginBottom: 5,
	},

	loginActions: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// backgroundColor: "#f0f",
	},

	check: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		// backgroundColor: "#f0f",
	},

	checkbox: {
		borderRadius: 5,
		backgroundColor: "#F8F9FB",
	},

	loginButtonContainer: {
		justifyContent: "center",
		width: "100%",
		// backgroundColor: "#f0f",
		gap: 40,
	},

	loginButton: {
		backgroundColor: colors.mainColor,
		borderRadius: 12,
	},

	loginOptions: {
		// flex: 1,
		gap: 10,
	},

	loginOptionsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 25,
		// marginBottom: "10%",
	},

	logoBorder: {
		borderColor: "#97A3B1",
		borderWidth: 1,
		borderRadius: 40,
		padding: "5%",
		alignItems: "center",
	},

	signUpOption: {
		flexDirection: "row",
		justifyContent: "center",
	},

	links: {
		textDecorationColor: "#52A2F2",
		textDecorationLine: "underline",
		color: "#52A2F2",
	},
});

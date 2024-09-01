import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import { Text } from "../../src/components/Text";
import { Link, useNavigation } from "expo-router";

import HeaderImage from "../../assets/images/resetPasswordHeader.svg";
import { useState } from "react";
import React from "react";
import colors from "../../src/helpers/colors";

const { width, height } = Dimensions.get("window");

const ResetPassword = (): JSX.Element => {
	const [isChecked, setChecked] = useState(false);
	const navigation = useNavigation();
	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			scrollEnabled={true}
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
				<View style={styles.resetPasswordButtonContainer}>
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
										fontWeight: "400",
										fontSize: 16,
										color: "white",
									},
								]}
							>
								Reset Password
							</Text>
						</TouchableOpacity>
					</Link>
					<Link
						style={{
							alignItems: "center",
							borderRadius: 15,
							justifyContent: "center",
							padding: 15,
							borderWidth: 1,
						}}
						asChild
						href={"/"}
						replace
					>
						<TouchableOpacity>
							<Text
								style={[
									{
										textAlign: "center",
										fontWeight: "600",
										fontSize: 16,
									},
								]}
							>
								Back to Login
							</Text>
						</TouchableOpacity>
					</Link>
					<View style={styles.signUpOption}>
						<Text style={{ marginRight: "2%" }}>Don't have an account?</Text>
						<Link href="/SignUp" style={{ textDecorationLine: "underline" }}>
							Sign up
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
		backgroundColor: "#fff",
		alignItems: "center",
		gap: 10,
	},

	imageContainer: {
		paddingTop: "20%",
		marginBottom: "8%",
	},

	image: {},

	resetPasswordContainer: {
		width: "100%",
		justifyContent: "flex-start",
		paddingLeft: 30,
		paddingRight: 30,
		gap: 10,
	},

	lch: {
		alignItems: "flex-start",
		width: "100%",
		gap: 7,
		marginBottom: "5%",
	},

	lchHeader: {
		fontSize: 25,
		fontWeight: "700",
		textAlign: "left",
	},

	lchText: {
		fontWeight: "300",
	},

	resetPasswordFormContainer: {
		gap: 20,
		marginBottom: "6%",
	},

	resetPasswordDetailContainer: {},

	resetPasswordInput: {
		backgroundColor: "#FFFFFF",
		padding: "5%",
		borderColor: colors.inputBorderColor,
		borderWidth: 1.05,
		borderRadius: 10,
		textAlign: "left",
	},

	formText: {
		fontSize: 16,
		marginBottom: 5,
	},

	resetPasswordActions: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	check: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},

	checkbox: {
		borderRadius: 5,
		backgroundColor: "#F8F9FB",
	},

	resetPasswordButtonContainer: {
		gap: 20,
	},

	resetPasswordButton: {
		backgroundColor: colors.mainColor,
		borderRadius: 12,
	},

	resetPasswordOptionsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: "10%",
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

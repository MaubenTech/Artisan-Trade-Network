import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";

import HeaderImage from "@assets/images/forgotPasswordHeader.svg";
import React, { useState } from "react";
import colors from "@helpers/colors";
import { Text } from "@components/Text";
import { compactStyles } from "@helpers/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useKeyboardHeight from "@helpers/useKeyboardHeight";
import useAppDispatch from "@hooks/useAppDispatch";
import { forgotPassword, resetAuthError, resetAuthStatus, selectAuthError, selectAuthStatus } from "@store/authSlice";
import useAppSelector from "@hooks/useAppSelector";
import { isEmailValid } from "@helpers/utils";
import LoadingIndicator from "@components/signupComponents/LoadingIndicator";

interface ForgotPasswordProps {
	onProceed: (email: string) => void;
}

const ForgotPassword = ({ onProceed }: ForgotPasswordProps): JSX.Element => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	// console.log(styles.container);
	const router = useRouter();
	const { top } = useSafeAreaInsets();
	const keyboardHeight = useKeyboardHeight();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState("");
	const [validationError, setValidationError] = useState("");

	const forgotPasswordStatus = useAppSelector(selectAuthStatus);
	const forgotPasswordError = useAppSelector(selectAuthError);

	const handleForgotPassword = async (email: string) => {
		setValidationError("");

		if (!email.trim()) {
			setValidationError("Email is required");
			return;
		} else if (!isEmailValid(email.trim())) {
			setValidationError("Please enter a valid email address");
			return;
		}
		try {
			const result = await dispatch(forgotPassword({ email }));
			if (result.meta.requestStatus === "fulfilled") {
				dispatch(resetAuthStatus());
				onProceed(email);
			}
		} catch (error) {
			setValidationError("An error occurred, please try again later.");
		}
	};

	const getErrorMessage = () => {
		if (validationError) {
			return validationError;
		}
		if (forgotPasswordStatus === "failed" && forgotPasswordError && forgotPasswordError.message) {
			return forgotPasswordError.message;
		}
		return "";
	};

	return (
		<ScrollView style={{ marginTop: top }} contentContainerStyle={styles.container}>
			<View style={styles.imageContainer}>
				<HeaderImage width={250} height={250} />
			</View>
			<View style={styles.forgotPasswordContainer}>
				<View style={styles.lch}>
					<Text style={styles.lchHeader}>Forgot Password?</Text>
					<Text style={styles.lchText}>No worries, we'll send you reset instruction</Text>
				</View>
				{forgotPasswordStatus === "loading" && <LoadingIndicator visible />}
				<View style={styles.forgotPasswordFormContainer}>
					{getErrorMessage() ? <Text style={styles.errorMessage}>{getErrorMessage()}</Text> : null}
					<Text style={styles.formText}>Email or Username</Text>
					<TextInput
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							if (validationError) setValidationError("");
							if (forgotPasswordError && forgotPasswordError.message) dispatch(resetAuthError());
						}}
						style={styles.forgotPasswordInput}
						placeholder="example@gmail.com"
						placeholderTextColor={"#8F8F8F"}
					/>
				</View>
				<View style={[styles.buttonsContainer, Platform.OS === "ios" && { paddingBottom: keyboardHeight }]}>
					<TouchableOpacity onPress={() => handleForgotPassword(email)} style={[styles.button, styles.primaryButton]}>
						<Text style={[styles.buttonText, styles.primaryButtonText]}>Reset Password</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.secondaryButton]}
						onPress={() => {
							router.back();
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

const generalStyles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: "center",
		gap: 10,
	},

	imageContainer: {
		paddingTop: "15%",
	},

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

	errorMessage: {
		color: colors.red,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	container: {
		paddingBottom: 30,
	},

	lch: {
		gap: 7,
	},
});

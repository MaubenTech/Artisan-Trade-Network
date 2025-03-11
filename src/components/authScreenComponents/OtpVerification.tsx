import { View, SafeAreaView, TextInput as RNTextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ButtonGroup from "@components/ButtonGroup";
import { Text, TextInput } from "@components/Text";
import { OtpInput } from "react-native-otp-entry";
import colors from "@helpers/colors";
import HeaderImage from "@assets/images/loginPageHeader.svg";
import { router } from "expo-router";
import useAppSelector from "@hooks/useAppSelector";
import { forgotPassword, resetAuthError, resetAuthStatus, selectAuthError, selectAuthStatus, selectForgotPasswordEmail, verifyOtp } from "@store/authSlice";
import LoadingIndicator from "@components/signupComponents/LoadingIndicator";
import useAppDispatch from "@hooks/useAppDispatch";
import { compactStyles } from "@helpers/styles";

interface OtpVerificationProps {
	onOtpVerified: () => void;
}

const OtpVerification = ({ onOtpVerified }: OtpVerificationProps) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [otp, setOtp] = useState("");
	const [validationError, setValidationError] = useState("");
	const [disabled, setDisabled] = useState(true);

	const email = useAppSelector(selectForgotPasswordEmail);

	const dispatch = useAppDispatch();

	const otpVerificationStatus = useAppSelector(selectAuthStatus);
	const otpVerificationError = useAppSelector(selectAuthError);

	const handleVerifyOtp = async (otp) => {
		try {
			const result = await dispatch(verifyOtp("forgotpassword")({ email, otp }));
			console.log(result);
			if (result.meta.requestStatus === "fulfilled") {
				dispatch(resetAuthStatus());
				onOtpVerified();
			}
		} catch (error) {
			setValidationError("An error occurred, please try again later.");
		}
	};

	const handleResendCode = async () => {
		try {
			const result = await dispatch(forgotPassword({ email }));
			if (result.meta.requestStatus === "fulfilled") {
				dispatch(resetAuthStatus());
			}
		} catch (error) {
			setValidationError("An error occurred, please try again later.");
		}
	};

	const getErrorMessage = () => {
		if (validationError) return validationError;
		if (otpVerificationStatus === "failed" && otpVerificationError && otpVerificationError.message) {
			return otpVerificationError.message;
		}
		return "";
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logo}>
				{/* <Image source={require("@assets/images/logo.png")} /> */}
				<HeaderImage />
			</View>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>OTP Verification</Text>
				<Text style={styles.subHeader}>Please enter your Verification code sent to</Text>
				<Text style={styles.email}>{email}</Text>
			</View>
			{otpVerificationStatus === "loading" && <LoadingIndicator visible />}
			<View style={styles.otpSectionContainer}>
				{getErrorMessage() ? <Text style={styles.errorMessage}>{getErrorMessage()}</Text> : null}
				<OtpInput
					numberOfDigits={6}
					focusColor="#005B92"
					autoFocus
					// hideStick={true}
					// placeholder="******"
					blurOnFilled={true}
					disabled={false}
					type="numeric"
					secureTextEntry={false}
					focusStickBlinkingDuration={500}
					onFocus={() => console.log("Focused")}
					onBlur={() => console.log("Blurred")}
					onTextChange={(text) => {
						if (text.length !== 6) setDisabled(true);
						if (validationError) setValidationError("");
						if (otpVerificationError && otpVerificationError.message) dispatch(resetAuthError());
					}}
					onFilled={(text) => {
						console.log(`OTP is ${text}`);
						setOtp(text);
						setDisabled(false);
					}}
					textInputProps={{
						accessibilityLabel: "One-Time Password",
					}}
					theme={{
						containerStyle: styles.otpContainer,
						pinCodeContainerStyle: styles.otpCodeContainer,
						pinCodeTextStyle: styles.otpText,
						focusStickStyle: styles.focusStick,
						focusedPinCodeContainerStyle: styles.activePinCodeContainer,
						placeholderTextStyle: styles.placeholderText,
						filledPinCodeContainerStyle: styles.filledPinCodeContainer,
						disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
					}}
				/>
			</View>
			<View style={[styles.codeInfo, { flex: 1 }]}>
				<Text style={styles.codeQuestion}>Didn't receive an OTP code?</Text>
				<TouchableOpacity onPress={handleResendCode}>
					<Text style={styles.resend}>Resend Code</Text>
				</TouchableOpacity>
			</View>
			<ButtonGroup positiveOptionDisabled={disabled} onPress={() => handleVerifyOtp(otp)} positiveOption="Verify & Proceed" paddingHorizontal={20} />
		</SafeAreaView>
	);
};
const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 30,
	},
	logo: {
		paddingTop: 20,
		flexDirection: "column",
		alignItems: "center",
	},
	headerContainer: {
		// paddingLeft: 25,
		alignItems: "center",
		gap: 5,
	},
	header: {
		fontSize: 23,
		fontWeight: "bold",
	},
	subHeader: {},
	email: {
		fontWeight: "bold",
	},
	otpSectionContainer: {
		paddingHorizontal: "6%",
	},
	otpContainer: {
		// paddingHorizontal: "3%",
	},
	otpCodeContainer: {
		// borderWidth: 1,
		// borderRadius: 10,
		// paddingTop: "3%",
		// paddingBottom: "5%",
		// paddingLeft: "5%",
		// paddingRight: "2%",
		// alignItems: "center",
		// position: "relative",
		// width: "13%",
		height: undefined,
		paddingVertical: "4%",
		borderColor: "#005B92",
	},
	activePinCodeContainer: {},
	filledPinCodeContainer: {
		backgroundColor: colors.mainColor,
	},
	disabledPinCodeContainer: {},
	otpText: {
		color: "#fff",
		fontSize: 16,
	},
	placeholderText: {},
	focusStick: {
		height: undefined,
		paddingVertical: "25%",
	},
	codeInfo: {
		marginTop: "10%",
		alignItems: "center",
	},
	codeQuestion: {
		fontSize: 16,
	},
	resend: {
		marginTop: "8%",
		fontWeight: "bold",
		fontSize: 16,
	},

	errorMessage: {
		color: colors.red,
	},

	// loginButtonContainer: {
	//     borderWidth: 1,
	//     borderRadius: 10,
	//     paddingTop: "3%",
	//     paddingBottom: "5%",
	//     paddingLeft: "7%",
	//     paddingRight: "7%",
	//     marginLeft: "7%",
	//     marginRight: "7%",
	//     marginTop: "35%",
	//     alignItems: "center",
	//     borderColor: "#52A2f2",
	//     backgroundColor: "#52A2f2",
	//     position: "relative",
	// },
});
const androidStyles = StyleSheet.create({});
const iosStyles = StyleSheet.create({});
export default OtpVerification;

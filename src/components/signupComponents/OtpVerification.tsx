import { View, SafeAreaView, TextInput as RNTextInput } from "react-native";
import { StyleSheet, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ButtonGroup from "@components/ButtonGroup";
import { Text, TextInput } from "@components/Text";
import { OtpInput } from "react-native-otp-entry";
import colors from "@helpers/colors";
import { router } from "expo-router";

interface OtpVerificationProps {
	onVerifyOtp: (otp: string) => void;
}

const OtpVerification = ({ onVerifyOtp }: OtpVerificationProps) => {
	const [otp, setOtp] = useState("");
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logo}>
				<Image source={require("@assets/images/logo.png")} />
			</View>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>OTP Verification</Text>
				<Text style={styles.subHeader}>Please enter your Verification code sent to</Text>
				<Text style={styles.email}>nonsorob@yahoo.com</Text>
			</View>
			<View style={styles.otpContainer}>
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
					onTextChange={(text) => console.log(text)}
					onFilled={(text) => {
						console.log(`OTP is ${text}`);
						setOtp(text);
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
				<Text style={styles.resend}>Resend Code</Text>
			</View>
			<ButtonGroup
				onPress={() => {
					onVerifyOtp(otp);
				}}
				positiveOption="Verify & Proceed"
				paddingHorizontal={20}
			/>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
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
	otpContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingHorizontal: "3%",
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
export default OtpVerification;

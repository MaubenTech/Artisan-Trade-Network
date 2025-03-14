import { BackHandler, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TextInput } from "@components/Text";
import React, { useState } from "react";
import { compactStyles } from "@helpers/styles";
import AccountInformation from "@components/authScreenComponents/AccountInformation";
import ContactDetails from "@components/authScreenComponents/ContactDetails";
import Password from "@components/authScreenComponents/Password";
import OtpVerification from "@components/authScreenComponents/OtpVerification";
import { useRouter } from "expo-router";
import CustomKeyboardView from "@components/CustomKeyboardView";
import { isAndroid } from "@helpers/utils";
import HeaderImage from "@assets/images/loginPageHeader.svg";
import LogoHeaderContainer from "@components/LogoHeaderContainer";

interface AccountInformation {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: "Male" | "Female";
}

interface ContactDetails {
	address: string;
	email: string;
	phoneNumber: string;
}

const SignUp = () => {
	const { top, bottom } = useSafeAreaInsets();
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [accountInformation, setAccountInformation] = useState<AccountInformation>(null);
	const [contactDetails, setContactDetails] = useState<ContactDetails>(null);
	const [password, setPassword] = useState("");
	const router = useRouter();

	const [index, setIndex] = useState(0);

	const submitAccountInformation = (firstName: string, lastName: string, dateOfBirth: string, gender: "Male" | "Female") => {
		setAccountInformation({
			firstName,
			lastName,
			dateOfBirth,
			gender,
		});
		setIndex(1);
	};

	const submitContactDetails = (address: string, email: string, phoneNumber: string) => {
		setContactDetails({
			address,
			email,
			phoneNumber,
		});
		setIndex(2);
	};

	const submitPassword = (password: string) => {
		//TODO: One more thing to do and it'll be time to handle the async part of the signup flow. Check TODO below:
		setPassword(password);
		setIndex(3);
	};

	const otpVerified = () => {
		// setIndex(4);
		//TODO: After verifying otp, the onboarding screen shouldn't be stacked untop regular screens. It should replace the whole registration process, so back will go to the login screen directly.
	};

	BackHandler.addEventListener("hardwareBackPress", () => {
		if (index !== 0) {
			setIndex(index - 1);
		} else {
			router.back();
		}

		return true;
	});

	const renderComponent = () => {
		//TODO: Find a way to persist information between screen components within the signup flow screen.
		switch (index) {
			case 0:
				return <AccountInformation onSubmit={submitAccountInformation} />;
			case 1:
				return <ContactDetails onSubmit={submitContactDetails} />;
			case 2:
				return <Password onSubmit={submitPassword} />;
			case 3:
				return <OtpVerification removeHeader type="signup" onOtpVerified={otpVerified} />;
			default:
				return null;
		}
	};

	return <LogoHeaderContainer>{renderComponent()}</LogoHeaderContainer>;
};

export default SignUp;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

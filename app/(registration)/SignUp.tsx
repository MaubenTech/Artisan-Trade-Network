import { BackHandler, StyleSheet, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import React, { useState } from "react";
import { compactStyles } from "@helpers/styles";
import AccountInformation from "@components/signupComponents/AccountInformation";
import ContactDetails from "@components/signupComponents/ContactDetails";
import Password from "@components/signupComponents/Password";
import OtpVerification from "@components/signupComponents/OtpVerification";
import { useRouter } from "expo-router";

const SignUp = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const router = useRouter();

	const [index, setIndex] = useState(0);

	const submitAccountInformation = (firstName: string, lastName: string, dateOfBirth: string, gender: "Male" | "Female") => {
		setIndex(1);
	};

	const submitContactDetails = (address: string, email: string, phoneNumber: string) => {
		setIndex(2);
	};

	const submitPassword = (password: string) => {
		setIndex(3);
	};

	BackHandler.addEventListener("hardwareBackPress", () => {
		if (index !== 0) {
			setIndex(index - 1);
		} else {
			router.back();
		}

		return true;
	});

	switch (index) {
		case 0:
			return <AccountInformation onSubmit={submitAccountInformation} />;
		case 1:
			return <ContactDetails onSubmit={submitContactDetails} />;
		case 2:
			return <Password onSubmit={submitPassword} />;
		case 3:
			return <OtpVerification />;
		default:
			return null;
	}
};

export default SignUp;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

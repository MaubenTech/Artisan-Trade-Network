import { StyleSheet, BackHandler } from "react-native";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import { compactStyles } from "@helpers/styles";
import useAppDispatch from "@hooks/useAppDispatch";
import { resetAuthError, resetAuthStatus, resetForgotPasswordFlow } from "@store/authSlice";
import { default as ForgotPasswordInitial } from "@components/authScreenComponents/ForgotPassword";
import OtpVerification from "@components/authScreenComponents/OtpVerification";
import ResetPassword from "@components/authScreenComponents/ResetPassword";
import PasswordUpdated from "@components/authScreenComponents/PasswordUpdated";

const ForgotPassword = (): JSX.Element => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [index, setIndex] = useState(0);

	//TODO: We need a toasting service or middleware that will listen for most of the actions and toast a notification to the user, so they'll be aware of what's going on.

	const emailVerified = () => {
		setIndex(1);
	};

	const otpVerified = () => {
		setIndex(2);
	};

	const passwordReset = () => {
		setIndex(3);
	};

	const handleCompleteProcess = () => {
		dispatch(resetForgotPasswordFlow());
		router.dismissAll();
		router.navigate("/");
	};

	BackHandler.addEventListener("hardwareBackPress", () => {
		dispatch(resetAuthStatus());
		dispatch(resetAuthError());
		if (index !== 0) {
			setIndex(index - 1);
		} else {
			dispatch(resetForgotPasswordFlow());
			router.back();
		}

		return true;
	});

	// const forgotPasswordEmail = useAppSelector(selectForgotPasswordEmail);
	// const resetValidationCode = useAppSelector(selectResetValidationCode);

	// useEffect(() => {
	// 	console.log(`Forgot password email: ${forgotPasswordEmail}`);
	// 	console.log(`Reset validation code: ${resetValidationCode}`);
	// }, []);

	switch (index) {
		case 0:
			return <ForgotPasswordInitial onEmailVerified={emailVerified} onBack={handleCompleteProcess} />;
		case 1:
			return <OtpVerification onOtpVerified={otpVerified} />;
		case 2:
			return <ResetPassword onPasswordReset={passwordReset} onBack={handleCompleteProcess} />;
		case 3:
			return <PasswordUpdated onProceed={handleCompleteProcess} />;
		default:
			return null;
	}
};

export default ForgotPassword;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

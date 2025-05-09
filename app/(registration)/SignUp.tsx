import { BackHandler, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TextInput } from "@components/Text";
import React, { useState } from "react";
import { compactStyles } from "@helpers/styles";
import AccountInformation, { AccountInformation as AccountInformationState, Gender } from "@components/authScreenComponents/AccountInformation";
import ContactDetails, { ContactDetails as ContactDetailsState } from "@components/authScreenComponents/ContactDetails";
import Password from "@components/authScreenComponents/Password";
import OtpVerification from "@components/authScreenComponents/OtpVerification";
import { useRouter } from "expo-router";
import CustomKeyboardView from "@components/CustomKeyboardView";
import { isAndroid, reverseDate } from "@helpers/utils";
import HeaderImage from "@assets/images/loginPageHeader.svg";
import LogoHeaderContainer from "@components/LogoHeaderContainer";
import LoadingIndicator from "@components/signupComponents/LoadingIndicator";
import useAppSelector from "@hooks/useAppSelector";
import { registerUser, resetAllAuth, resetAuthError, resetAuthStatus, selectAuthError, selectAuthStatus, setSignupEmail } from "@store/authSlice";
import useAppDispatch from "@hooks/useAppDispatch";

const SignUp = () => {
	const { top, bottom } = useSafeAreaInsets();
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const router = useRouter();
	const [accountInformation, setAccountInformation] = useState<AccountInformationState>(null);
	const [contactDetails, setContactDetails] = useState<ContactDetailsState>(null);
	const [password, setPassword] = useState("");
	const [index, setIndex] = useState(0);
	const [validationError, setValidationError] = useState("");

	const dispatch = useAppDispatch();

	const signupStatus = useAppSelector(selectAuthStatus);
	const signupError = useAppSelector(selectAuthError);

	const submitAccountInformation = (firstName: string, lastName: string, dateOfBirth: string, gender: Gender) => {
		setAccountInformation({
			firstName,
			lastName,
			dateOfBirth: reverseDate(dateOfBirth, "/", "-"),
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
		dispatch(setSignupEmail(email));
		setIndex(2);
	};

	const submitPassword = (localScopePassword: string) => {
		console.log(`Passed password: ${localScopePassword}`);
		//TODO: One more thing to do and it'll be time to handle the async part of the signup flow. Check TODO below:
		setPassword(localScopePassword);
		console.log(`Password after: ${password}`);
		signupUser();
	};

	const signupUser = async () => {
		const { firstName: firstname, lastName: lastname, dateOfBirth: dateofbirth } = accountInformation;
		const { phoneNumber: phonenumber } = contactDetails;
		console.log("Date of birth is " + dateofbirth);

		const newUser = { firstname, lastname, dateofbirth, phonenumber, ...accountInformation, ...contactDetails, password };
		console.log("New user: " + JSON.stringify(newUser));
		try {
			const result = await dispatch(registerUser(newUser));
			if (result.meta.requestStatus === "fulfilled") {
				dispatch(resetAuthError());
				dispatch(resetAuthStatus());
				setIndex(3);
			}
		} catch (error) {
			console.log(error);
			setValidationError(error || "An error occurred, please try again later.");
		}
	};

	const otpVerified = () => {
		// setIndex(4);
		//TODO: After verifying otp, the onboarding screen shouldn't be stacked untop regular screens. It should replace the whole registration process, so back will go to the login screen directly.
		// dispatch(setAccountIs)
		router.dismissAll();
		router.replace("/");
	};

	const getErrorMessage = () => {
		if (validationError) return validationError;
		if (signupStatus === "failed" && signupError && signupError.message) return signupError.message;
		return "";
	};

	BackHandler.addEventListener("hardwareBackPress", () => {
		if (index !== 0) {
			dispatch(resetAuthError());
			dispatch(resetAuthStatus());
			setIndex(index - 1);
		} else {
			// setAccountInformation(null);
			// setContactDetails(null);
			router.back();
		}

		return true;
	});

	const renderComponent = () => {
		switch (index) {
			case 0:
				return <AccountInformation onSubmit={submitAccountInformation} previousAccountInformation={accountInformation} />;
			case 1:
				return <ContactDetails onSubmit={submitContactDetails} previousContactDetails={contactDetails} />;
			case 2:
				return <Password onSubmit={submitPassword} externalValidationError={getErrorMessage()} />;
			case 3:
				return <OtpVerification removeHeader type="signup" onOtpVerified={otpVerified} />;
			default:
				return null;
		}
	};

	return (
		<LogoHeaderContainer>
			{signupStatus === "loading" && <LoadingIndicator visible />}
			{renderComponent()}
		</LogoHeaderContainer>
	);
};

export default SignUp;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import colors from "@helpers/colors";
import { compactStyles } from "@helpers/styles";
import ButtonGroup from "@components/ButtonGroup";
import GoogleIcon from "@assets/images/google.svg";
import AppleIcon from "@assets/images/apple-logo.svg";
import { Text, TextInput } from "@components/Text";
import FacebookIcon from "@assets/images/facebook.svg";
import HeaderImage from "@assets/images/loginPageHeader.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView, Platform, BackHandler } from "react-native";
import useAppDispatch from "@hooks/useAppDispatch";
import { loginUser, resetAuth, resetAuthError, resetAuthStatus, selectAuthError, selectAuthStatus, selectIsNewAccount, setSignupEmail } from "@store/authSlice";
import CustomKeyboardView from "@components/CustomKeyboardView";
import { useSelector } from "react-redux";
import LoadingIndicator from "@components/signupComponents/LoadingIndicator";
import { isAndroid, isEmailValid } from "@helpers/utils";
import Entry from "@components/Entry";
import LogoHeaderContainer from "@components/LogoHeaderContainer";
import RedExclamationMark from "@assets/icons/auth/red-exclamation-mark.svg";
import OtpVerification from "@components/authScreenComponents/OtpVerification";
import useAppSelector from "@hooks/useAppSelector";

const { width, height } = Dimensions.get("window");

const index = () => {
	const { top, bottom } = useSafeAreaInsets();
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [validationError, setValidationError] = useState<string>("");
	const [hasNotVerified, setHasNotVerified] = useState(false);

	const isNewAccount = useAppSelector(selectIsNewAccount);

	const handleChangeEmail = (text: string) => {
		setEmail(text);
		if (validationError) setValidationError("");
		if (loginError && loginError.message) dispatch(resetAuthError());
	};

	const handleChangePassword = (text: string) => {
		setPassword(text);
		if (validationError) setValidationError("");
		if (loginError && loginError.message) dispatch(resetAuthError());
	};

  const handleLogin = async () => {
    setValidationError("");

		if (!email.trim()) {
			setValidationError("Email is required");
			return;
		} else if (!isEmailValid(email.trim())) {
			setValidationError("Email is not valid");
			return;
		} else if (!password.trim()) {
			setValidationError("Password is required");
			return;
		}

		try {
			const result = await dispatch(loginUser({ email, password }));
			if (result.meta.requestStatus === "fulfilled") {
				dispatch(resetAuthStatus());
				if (isNewAccount) router.navigate("/OnboardingScreen");
				else router.navigate("Home");
			}
		} catch (error) {
			setValidationError("An error occured, please try again later.");
		}
	};

  const loginStatus = useSelector(selectAuthStatus);
  const loginError = useSelector(selectAuthError);

  const router = useRouter();
  const dispatch = useAppDispatch();

	const handleForgotPasswordClick = () => {
		dispatch(resetAuth());
		router.navigate("/ForgotPassword");
	};

	const handleSignupClick = () => {
		dispatch(resetAuth());
		router.navigate("/SignUp");
	};

	const getIsErred = (input: "e" | "p") => {
		if (!validationError) {
			return false;
		}
		switch (input) {
			case "e":
				return !email.trim() || validationError.toLowerCase().includes("email");
			case "p":
				return !password.trim() || validationError.toLowerCase().includes("password");
		}
	};

	const handleOtpVerifiedFromLogin = () => {
		//TODO: I think another login attempt should be made in the background after the otp is verified
		//NOPE, it should not. The user has to log in again
		setHasNotVerified(false);
	};

	// TODO: If the error returned by the backend is "Please verify your email first.", the user should be automatically navigated to OtpVerification to verify the email.
	useEffect(() => {
		if (!validationError && loginStatus === "failed" && loginError && loginError.message) {
			setValidationError(loginError.message);
			if (loginError.message === "Please verify your email first.") {
				dispatch(resetAuthError());
				setTimeout(() => {
					setHasNotVerified(true);
				}, 1500);
			}
		}
	}, [validationError, loginStatus, loginError]);

	BackHandler.addEventListener("hardwareBackPress", () => {
		dispatch(resetAuthStatus());
		dispatch(resetAuthError());
		setValidationError("");
		setEmail("");
		setPassword("");
		// console.log(`Email: ${email}, Password: ${password}`);
		setHasNotVerified(false);
		return true;
	});

	if (hasNotVerified) {
		//NOTE: We're using the signup otp verification type because the account verification in the first place is meant to be part of the signup flow.
		dispatch(setSignupEmail(email));
		return <OtpVerification onOtpVerified={handleOtpVerifiedFromLogin} type="signup" />;
	}

	return (
		<LogoHeaderContainer>
			<View style={[styles.ctaComponentContainer]}>
				<View style={[styles.ctaComponentHeader]}>
					<Text style={styles.ctaHeader}>Login to your account</Text>
					<Text style={styles.ctaSubHeader}>Welcome back! Please enter your details</Text>
				</View>
				{loginStatus === "loading" && <LoadingIndicator visible />}
				{/* TODO: When results come back from the backend after a login attempt, there should be either clearing or focusing of inputs, or both, or in few scenarios, neither. These need to be implemented. */}
				<View style={[styles.userInputContainer]}>
					<Entry label="Email" onChangeText={handleChangeEmail} inputErred={getIsErred("e")} />
					<Entry label="Password" onChangeText={handleChangePassword} inputErred={getIsErred("p")} />
				</View>
				{validationError && (
					<View style={styles.unmatchedContainer}>
						<RedExclamationMark />
						<Text style={styles.unmatchedText}>{validationError}</Text>
					</View>
				)}
				<View style={[styles.optionsContainer]}>
					<TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
						<View style={rememberMe ? styles.checkboxChecked : styles.checkboxUnchecked}></View>
						<Text>Remember Me</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleForgotPasswordClick}>
						<Text style={[styles.infoText]}>Forgot Password</Text>
					</TouchableOpacity>
				</View>
				<ButtonGroup positiveOption="Login" onPress={handleLogin} />
			</View>
			<View style={[styles.componentContainer, styles.otherLoginContainer]}>
				<Text style={[styles.infoText]}>Or Login with</Text>
				<View style={[styles.componentContainer, styles.socialLoginContainer]}>
					<TouchableOpacity style={styles.socialButton}>
						<FacebookIcon />
					</TouchableOpacity>
					<TouchableOpacity style={styles.socialButton}>
						<GoogleIcon />
					</TouchableOpacity>
					<TouchableOpacity style={styles.socialButton}>
						<AppleIcon />
					</TouchableOpacity>
				</View>
			</View>
			<View style={[styles.componentContainer, styles.signUpContainer]}>
				<Text style={[styles.noAccount]}>Don't have an account?</Text>
				<TouchableOpacity onPress={handleSignupClick} style={[styles.signUp]}>
					<Text style={styles.signUpText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</LogoHeaderContainer>
	);
};

export default index;

const generalStyles = StyleSheet.create({
	container: {
		padding: 30,
	},
	componentContainer: {
		paddingHorizontal: 20,
		alignItems: "center",
	},
	ctaComponentContainer: {
		alignItems: "flex-start",
	},
	ctaHeader: {
		fontWeight: "600",
		fontSize: 22,
	},
	ctaSubHeader: {
		fontSize: 11,
	},
	userInputContainer: {
		alignItems: "flex-start",
		gap: 20,
	},
	userInputLabel: {},
	optionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkboxUnchecked: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 10,
		borderRadius: 4,
	},
	checkboxChecked: {
		width: 20,
		height: 20,
		backgroundColor: "#007BFF",
		marginRight: 10,
		borderRadius: 4,
	},
	socialButton: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 25,
	},
	signUpText: {
		fontSize: 12,
		textDecorationLine: "underline",
		color: colors.mainColor,
	},
	errorMessage: {
		color: colors.red,
	},
	unmatchedContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: -5,
		gap: 8,
	},
	unmatchedText: {
		fontSize: 12,
		paddingTop: 2,
		color: colors.red,
	},
});

const androidStyles = StyleSheet.create({
	ctaComponentContainer: {
		gap: 20,
	},
	otherLoginContainer: {
		gap: 10,
	},
	infoText: {
		fontSize: 12,
	},
	socialLoginContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 20,
	},
	signUpContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},

  noAccount: {
    fontSize: 12,
    color: colors.greyShade,
  },

  signUp: {},
});

const iosStyles = StyleSheet.create({
	ctaComponentContainer: {
		gap: 30,
		paddingHorizontal: 20,
		width: "100%",
	},

  ctaComponentHeader: {
    gap: 5,
  },

	userInputContainer: {
		width: "100%",
	},

	userInputSubContainer: {
		gap: 5,
	},

	otherLoginContainer: {
		gap: 10,
		marginBottom: 30,
	},

  infoText: {
    fontSize: 14,
  },

  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },

  socialButton: {
    height: 35,
    borderRadius: 50,
    padding: 10,
  },

  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

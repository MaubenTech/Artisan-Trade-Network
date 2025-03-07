import React from "react";
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
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	Platform,
} from "react-native";
import useAppDispatch from "@hooks/useAppDispatch";
import {
	loginUser,
	selectLoginError,
	selectLoginStatus,
} from "@store/authSlice";
import CustomKeyboardView from "@components/CustomKeyboardView";
import { useSelector } from "react-redux";
import LoadingIndicator from "@components/signupComponents/LoadingIndicator";

const { width, height } = Dimensions.get("window");

const index = () => {
	const { top, bottom } = useSafeAreaInsets();
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const ios = Platform.OS === "ios";
	const android = Platform.OS === "android";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [validationError, setValidationError] = useState<string>("");

	const isEmailValid = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleLogin = async () => {
		setValidationError("");

		if (!email.trim() && !password.trim()) {
			setValidationError("Email and Password are required");
			return;
		} else if (!email.trim()) {
			setValidationError("Email is required");
			return;
		} else if (!password.trim()) {
			setValidationError("Password is required");
		} else if (!isEmailValid(email.trim())) {
			setValidationError("Please enter a valid email address");
			return;
		}

		try {
			const result = await dispatch(loginUser({ email, password }));
			if (result.meta.requestStatus === "fulfilled") {
				router.navigate("Home");
			}
		} catch (error) {
			setValidationError("An Error Occured, Please try again");
		}
	};

	const loginStatus = useSelector(selectLoginStatus);
	const loginError = useSelector(selectLoginError);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const getErrorMessage = () => {
		if (validationError) {
			return validationError;
		}
		if (loginStatus === "failed" && loginError && loginError.message) {
			return loginError.message;
		}
		return "";
	};

	return (
		<CustomKeyboardView>
			<SafeAreaView
				style={[
					styles.container,
					{
						paddingTop: android ? top : 0,
						paddingBottom: android ? bottom : 0,
					},
				]}
			>
				<View style={[styles.componentContainer, { marginBottom: 50 }]}>
					<HeaderImage />
				</View>
				<View style={[styles.ctaComponentContainer]}>
					<View style={[styles.ctaComponentHeader]}>
						<Text style={styles.ctaHeader}>
							Login to your account
						</Text>
						<Text style={styles.ctaSubtext}>
							Welcome back! Please enter your details
						</Text>
					</View>
					{loginStatus === "loading" && <LoadingIndicator visible />}
					<View style={[styles.userInputContainer]}>
						{getErrorMessage() ? (
							<Text style={styles.errorMessage}>
								{getErrorMessage()}
							</Text>
						) : null}
						<View style={[styles.userInputSubContainer]}>
							<Text style={[styles.userInputLabel]}>Email</Text>
							<TextInput
								style={[styles.userInput]}
								value={email}
								onChangeText={(text) => {
									setEmail(text);
									if (validationError) setValidationError("");
								}}
								keyboardType="email-address"
								autoCapitalize="none"
								placeholder="Enter your email"
							/>
						</View>
						<View style={[styles.userInputSubContainer]}>
							<Text style={[styles.userInputLabel]}>
								Password
							</Text>
							<TextInput
								style={[styles.userInput]}
								value={password}
								secureTextEntry
								onChangeText={(text) => {
									setPassword(text);
									if (validationError) setValidationError("");
								}}
								placeholder="Enter your password"
							/>
						</View>
					</View>
					<View style={[styles.optionsContainer]}>
						<TouchableOpacity
							onPress={() => setRememberMe(!rememberMe)}
							style={styles.checkboxContainer}
						>
							<View
								style={
									rememberMe
										? styles.checkboxChecked
										: styles.checkboxUnchecked
								}
							></View>
							<Text>Remember Me</Text>
						</TouchableOpacity>
						<Link href={"/(forgotPassword)/ForgotPassword"} asChild>
							<TouchableOpacity>
								<Text style={[styles.infoText]}>
									Forgot Password
								</Text>
							</TouchableOpacity>
						</Link>
					</View>
					<ButtonGroup positiveOption="Login" onPress={handleLogin} />
				</View>
				<View
					style={[
						styles.componentContainer,
						styles.otherLoginContainer,
					]}
				>
					<Text style={[styles.infoText]}>Or Login with</Text>
					<View
						style={[
							styles.componentContainer,
							styles.socialLoginContainer,
						]}
					>
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
				<View
					style={[styles.componentContainer, styles.signUpContainer]}
				>
					<Text style={[styles.noAccount]}>
						Don't have an account?
					</Text>
					<Link href={"/SignUp"} asChild style={[styles.signUp]}>
						<TouchableOpacity>
							<Text style={styles.signUpText}>Sign Up</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</SafeAreaView>
		</CustomKeyboardView>
	);
};

export default index;

const generalStyles = StyleSheet.create({
	container: {
		padding: 30,
	},

	ctaHeader: {
		fontWeight: "600",
		fontSize: 22,
	},

	ctaSubtext: {
		fontSize: 11,
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
});

const androidStyles = StyleSheet.create({
	componentContainer: {
		alignItems: "center",
		paddingHorizontal: 20,
	},
	ctaComponentContainer: {
		alignItems: "flex-start",
		gap: 15,
	},
	userInputContainer: {
		alignItems: "flex-start",
		gap: 30,
	},

	userInput: {
		width: width * 0.85,
		borderColor: colors.inputBorderColor,
		borderWidth: 1,
		borderRadius: 10,
		padding: 5,
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
	componentContainer: {
		paddingHorizontal: 20,
		alignItems: "center",
	},

	ctaComponentContainer: {
		alignItems: "flex-start",
		gap: 30,
		paddingHorizontal: 20,
	},

	ctaComponentHeader: {
		gap: 5,
	},

	userInputContainer: {
		alignItems: "flex-start",
		gap: 30,
	},

	userInputSubContainer: {
		gap: 5,
	},

	userInput: {
		width: width * 0.9,
		borderColor: colors.inputBorderColor,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
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

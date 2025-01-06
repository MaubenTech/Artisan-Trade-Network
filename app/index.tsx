import React from "react";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import colors from "@helpers/colors";
import { compactStyles } from "@helpers/styles";
import ButtonGroup from "@components/ButtonGroup";
import Ionicons from "@expo/vector-icons/Ionicons";
import GoogleIcon from "@assets/images/google.svg";
import AppleIcon from "@assets/images/apple-logo.svg";
import { Text, TextInput } from "@components/Text";
import FacebookIcon from "@assets/images/facebook.svg";
import HeaderImage from "@assets/images/loginPageHeader.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ScrollView, SafeAreaView, Platform, StatusBar } from "react-native";
import useAppDispatch from "@hooks/useAppDispatch";
import { loginUser, userLoggedIn } from "@store/authSlice";
import CustomKeyboardView from "@components/CustomKeyboardView";

const { width, height } = Dimensions.get("window");

const index = () => {
	const { top, bottom } = useSafeAreaInsets();
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const ios = Platform.OS === "ios";
	const android = Platform.OS === "android";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	return (
		<CustomKeyboardView>
			<SafeAreaView style={[styles.container, { paddingTop: android ? top : 0, paddingBottom: android ? bottom : 0 }]}>
				<View style={[styles.componentContainer, { marginBottom: 50 }]}>
					<HeaderImage />
				</View>
				<View style={[styles.ctaComponentContainer]}>
					<View style={[styles.ctaComponentHeader]}>
						<Text style={styles.ctaHeader}>Login to your account</Text>
						<Text style={styles.ctaSubtext}>Welcome back! Please enter your details</Text>
					</View>
					<View style={[styles.userInputContainer]}>
						<View style={[styles.userInputSubContainer]}>
							<Text style={[styles.userInputLabel]}>Email</Text>
							<TextInput style={[styles.userInput]} value={email} onChangeText={setEmail} />
						</View>
						<View style={[styles.userInputSubContainer]}>
							<Text style={[styles.userInputLabel]}>Password</Text>
							<TextInput style={[styles.userInput]} value={password} onChangeText={setPassword} secureTextEntry />
						</View>
					</View>
					<View style={[styles.optionsContainer]}>
						<TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
							<View style={rememberMe ? styles.checkboxChecked : styles.checkboxUnchecked}></View>
							<Text>Remember Me</Text>
						</TouchableOpacity>
						<Link href={"/(forgotPassword)/ForgotPassword"} asChild>
							<TouchableOpacity>
								<Text style={[styles.infoText]}>Forgot Password</Text>
							</TouchableOpacity>
						</Link>
					</View>
					<ButtonGroup
						positiveOption="Login"
						href={"/Home"}
						//TODO: Converted onPress handler to async and awaited the dispatch, so it'll complete before navigating. Only downside is during the awaiting, the users won't know there's a process going on (no loader or identifier)
						onPress={async () => {
							await dispatch(loginUser({ email, password }));

							// dispatch(userLoggedIn({ email, password }));

							//TODO: Add the extra reducers to the auth slice and make sure there's no navigation till the user is logged in
							router.navigate("/Home");
						}}
					/>
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
		marginBottom: 20,
	},

	signUpContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
	},
});

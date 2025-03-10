import { StyleSheet, Image, Pressable, Button, View } from "react-native";
import { Link, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import ButtonGroup from "@components/ButtonGroup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "@components/Text";
import RedExclamationMark from "@assets/icons/auth/red-exclamation-mark.svg";
import colors from "@helpers/colors";

interface PasswordProps {
	onSubmit: (password: string) => void;
}

const Password = ({ onSubmit }: PasswordProps) => {
	const [isSelected, setSelection] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [passwordsMatch, setPasswordsMatch] = useState(true);

	useEffect(() => {
		if (password !== confirmPassword) setPasswordsMatch(false);
		else setPasswordsMatch(true);
	}, [password, confirmPassword]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logo}>
				<Image source={require("@assets/images/logo.png")} />
			</View>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Password</Text>
				<Text style={styles.subHeader}>Please enter your desired Password</Text>
			</View>
			<View style={styles.detailsContainer}>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>Password</Text>
					<TextInput
						value={password}
						onChangeText={setPassword}
						style={[styles.textInput, { borderColor: passwordsMatch ? colors.inputBorderColor : colors.red }]}
						placeholder="Enter Your Password"
					/>
				</View>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>Confirm Password</Text>
					<TextInput
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						style={[styles.textInput, { borderColor: passwordsMatch ? colors.inputBorderColor : colors.red }]}
						placeholder="Enter Your Password"
					/>
					{!passwordsMatch && (
						<View style={styles.unmatchedContainer}>
							<RedExclamationMark />
							<Text style={styles.unmatchedText}>Password doesn't match</Text>
						</View>
					)}
				</View>
			</View>
			<View style={[styles.checkboxContainer, { flex: 1 }]}>
				<Checkbox
					value={isSelected}
					onValueChange={setSelection}
					// style={styles.checkbox}
				/>
				<Text>Yes, I agree to the Terms & Condition</Text>
			</View>
			<ButtonGroup onPress={() => onSubmit(password)} positiveOption="Proceed" paddingHorizontal={20} />
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
		gap: 5,
		marginLeft: "10%",
	},
	header: {
		fontSize: 23,
		fontWeight: "bold",
	},
	subHeader: {},
	detailsContainer: {
		paddingLeft: 20,
		paddingRight: 20,
		gap: 35,
	},
	subDetailsContainer: {
		gap: 8,
	},
	text: {
		color: "black",
		fontSize: 17,
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 10,
		paddingTop: "3%",
		paddingBottom: "5%",
		paddingLeft: "5%",
		paddingRight: "2%",
		alignItems: "center",
		// height: "27%",
		position: "relative",
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
	checkboxContainer: {
		flexDirection: "row",
		marginTop: "8%",
		marginLeft: "10%",
		gap: 10,
	},
});
export default Password;

import { StyleSheet, Image, Pressable, Button, View, TouchableOpacity } from "react-native";
import { Link, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import ButtonGroup from "@components/ButtonGroup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "@components/Text";
import RedExclamationMark from "@assets/icons/auth/red-exclamation-mark.svg";
import colors from "@helpers/colors";
import Entry from "@components/Entry";
import { compactStyles } from "@helpers/styles";

interface PasswordProps {
	onSubmit: (password: string) => void;
	externalValidationError?: string;
}

const Password = ({ onSubmit, externalValidationError }: PasswordProps) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [isSelected, setIsSelected] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationError, setValidationError] = useState<string>("");

	const handleProceed = async () => {
		setValidationError("");
		if (!password.trim()) {
			setValidationError("Password is required");
			return;
		} else if (!confirmPassword.trim()) {
			setValidationError("Confirm your password");
			return;
		} else if (password !== confirmPassword) {
			setValidationError("Password doesn't match");
			return;
		} else if (!isSelected) {
			setValidationError("You have to agree to the terms & conditions before you proceed");
			return;
		}
		await onSubmit(password);
	};

	const getIsErred = (input: "p" | "c") => {
		if (!validationError) {
			return false;
		}
		switch (input) {
			case "p":
				return !password.trim() || validationError.toLowerCase().includes("password");
			case "c":
				return !confirmPassword.trim() || validationError.toLowerCase().includes("confirm") || validationError.toLowerCase().includes("doesn't match");
		}
	};

	useEffect(() => {
		if (password !== confirmPassword) setValidationError("Password doesn't match");
		else setValidationError("");
		// if ((password !== confirmPassword) || password.length <= 0) setPasswordsMatch(false);
		// else setPasswordsMatch(true);
	}, [password, confirmPassword, isSelected]);

	useEffect(() => {
		setValidationError(externalValidationError);
	}, [externalValidationError]);

	return (
		<View style={styles.ctaComponentContainer}>
			<View style={styles.ctaComponentHeader}>
				<Text style={styles.ctaHeader}>Password</Text>
				<Text style={styles.ctaSubHeader}>Please enter your desired password</Text>
			</View>
			<View style={styles.userInputContainer}>
				<Entry label="Password" onChangeText={setPassword} inputErred={!!validationError && getIsErred("p")} />
				<Entry
					label="Confirm Password"
					onChangeText={setConfirmPassword}
					inputProps={{ placeholder: "Confirm your password" }}
					inputErred={!!validationError && getIsErred("c")}
				/>
				{validationError && (
					<View style={styles.unmatchedContainer}>
						<RedExclamationMark />
						<Text style={styles.unmatchedText}>{validationError}</Text>
					</View>
				)}
				<View style={styles.checkboxContainer}>
					<Checkbox value={isSelected} onValueChange={(value) => setIsSelected(value)} />
					<TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
						<Text>Yes, I agree to the terms & conditions</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ButtonGroup positiveOption="Proceed" onPress={handleProceed} />
		</View>
	);
};

const generalStyles = StyleSheet.create({
	ctaComponentContainer: {
		gap: 20,
	},
	ctaHeader: {
		fontSize: 22,
		fontWeight: "600",
	},
	ctaSubHeader: {
		fontSize: 11,
	},
	userInputContainer: {
		alignItems: "flex-start",
		gap: 20,
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
		gap: 8,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	ctaComponentHeader: {
		gap: 5,
	},
});

export default Password;

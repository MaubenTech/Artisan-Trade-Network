import React, { useCallback, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import ButtonGroup from "@components/ButtonGroup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "@components/Text";
import { compactStyles } from "@helpers/styles";
import Entry from "@components/Entry";
import colors from "@helpers/colors";
import RedExclamationMark from "@assets/icons/auth/red-exclamation-mark.svg";
import { isEmailValid } from "@helpers/utils";

export interface ContactDetails {
	address: string;
	email: string;
	phoneNumber: string;
}

interface ContactDetailsProps {
	onSubmit: (address: string, email: string, phoneNumber: string) => void;
	previousContactDetails?: ContactDetails;
}

export default function ContactDetails({ onSubmit, previousContactDetails }: ContactDetailsProps) {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [address, setAddress] = useState(previousContactDetails && !!previousContactDetails.address ? previousContactDetails.address : "");
	const [email, setEmail] = useState(previousContactDetails && !!previousContactDetails.email ? previousContactDetails.email : "");
	const [phoneNumber, setPhoneNumber] = useState(previousContactDetails && previousContactDetails.phoneNumber ? previousContactDetails.phoneNumber : "");
	const [validationError, setValidationError] = useState<string>();

	const handleChangeAddress = (text: string) => {
		setAddress(text);
		setValidationError("");
	};

	const handleChangeEmail = (text: string) => {
		setEmail(text);
		setValidationError("");
	};

	const handleChangePhoneNumber = (text: string) => {
		setPhoneNumber(text);
		setValidationError("");
	};

	const handleProceed = () => {
		setValidationError("");

		if (!address.trim()) {
			setValidationError("Address is required");
			return;
		} else if (!email.trim()) {
			setValidationError("Email is required");
			return;
		} else if (!isEmailValid(email)) {
			setValidationError("Email is not valid");
			return;
		} else if (!phoneNumber.trim()) {
			setValidationError("Phone number is required");
			return;
		}

		// console.log("We passed!");
		onSubmit(address, email, phoneNumber);
	};

	const getIsErred = (input: "p" | "c" | "p") => {
		if (!validationError) {
			return false;
		}
		switch (input) {
			case "p":
				return !address.trim() || validationError.includes("Address");
			case "c":
				return !email.trim() || validationError.includes("Email");
			case "p":
				return !phoneNumber.trim() || validationError.includes("Phone");
		}
	};

	return (
		<View style={styles.ctaComponentContainer}>
			<View style={styles.ctaComponentHeader}>
				<Text style={styles.ctaHeader}>Contact Details</Text>
				<Text style={styles.ctaSubHeader}>Please enter your contact details.</Text>
			</View>
			<View style={[styles.userInputContainer]}>
				<Entry label="Address" value={address} onChangeText={handleChangeAddress} inputErred={getIsErred("p")} />
				<Entry
					label="Email"
					value={email}
					onChangeText={handleChangeEmail}
					inputErred={getIsErred("c")}
					inputProps={{
						keyboardType: "email-address",
						autoCapitalize: "none",
					}}
				/>
				<Entry label="Phone Number" value={phoneNumber} onChangeText={handleChangePhoneNumber} inputErred={getIsErred("p")} />
			</View>
			{validationError && (
				<View style={styles.unmatchedContainer}>
					<RedExclamationMark />
					<Text style={styles.unmatchedText}>{validationError}</Text>
				</View>
			)}
			<ButtonGroup onPress={handleProceed} positiveOption="Proceed" />
		</View>
	);
}

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
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	ctaComponentHeader: {
		gap: 5,
	},
});

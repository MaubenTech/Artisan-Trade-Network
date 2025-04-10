import { StyleSheet, View, Image, TouchableOpacity, Button, Modal } from "react-native";
import { Text, TextInput } from "@components/Text";
import { Link } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonGroup from "@components/ButtonGroup";
import RadioGroup, { RadioOption } from "@components/RadioGroup";
import { useCallback, useEffect, useRef, useState } from "react";
import colors from "@helpers/colors";
import CalenderIcon from "@assets/icons/auth/calender-icon.svg";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderImage from "@assets/images/loginPageHeader.svg";
import DatePicker from "react-native-modern-datepicker";
import { isAndroid } from "@helpers/utils";
import { compactStyles } from "@helpers/styles";
import CustomKeyboardView from "@components/CustomKeyboardView";
import Entry from "@components/Entry";
import RedExclamationMark from "@assets/icons/auth/red-exclamation-mark.svg";

export type Gender = "Male" | "Female";

export interface AccountInformation {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: Gender;
}

interface AccountInformationProps {
	onSubmit: (firstName: string, lastName: string, dateOfBirth: string, gender: Gender) => void;
	previousAccountInformation?: AccountInformation;
}

export default function AccountInformation({ onSubmit, previousAccountInformation }: AccountInformationProps) {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [firstName, setFirstName] = useState(
		previousAccountInformation && !!previousAccountInformation.firstName ? previousAccountInformation.firstName : ""
	);
	const [lastName, setLastName] = useState(previousAccountInformation && !!previousAccountInformation.lastName ? previousAccountInformation.lastName : "");
	const [dateOfBirth, setDateOfBirth] = useState(
		previousAccountInformation && previousAccountInformation.dateOfBirth ? previousAccountInformation.dateOfBirth : ""
	);
	const [gender, setGender] = useState<Gender>(previousAccountInformation && !!previousAccountInformation.gender ? previousAccountInformation.gender : null);
	const [validationError, setValidationError] = useState<string>();

	const handleChangeFirstName = (text: string) => {
		setFirstName(text);
		setValidationError("");
	};

	const handleChangeLastName = (text: string) => {
		setLastName(text);
		setValidationError("");
	};

	const handleChangeDateOfBirth = (text: string) => {
		setDateOfBirth(text);
		setValidationError("");
	};

	const handleProceed = () => {
		setValidationError("");

		if (!firstName.trim()) {
			setValidationError("First name is required");
			return;
		} else if (!lastName.trim()) {
			setValidationError("Last name is required");
			return;
		} else if (!dateOfBirth.trim()) {
			setValidationError("Date of birth is required");
			return;
		}

		// console.log("We passed!");
		onSubmit(firstName, lastName, dateOfBirth, gender);
	};

	const getIsErred = (input: "f" | "l" | "d") => {
		if (!validationError) {
			return false;
		}
		switch (input) {
			case "f":
				return !firstName.trim() || validationError.toLowerCase().includes("first");
			case "l":
				return !lastName.trim() || validationError.toLowerCase().includes("last");
			case "d":
				return !dateOfBirth.trim() || validationError.toLowerCase().includes("date");
		}
	};

	// useEffect(() => console.log(`Gender changed to: ${gender}`), [gender]);
	// useEffect(() => {
	// 	if (previousAccountInformation) console.log(JSON.stringify(previousAccountInformation));
	// }, [previousAccountInformation]);

	return (
		<View style={styles.ctaComponentContainer}>
			<View style={[styles.ctaComponentHeader]}>
				<Text style={styles.ctaHeader}>Create An Account</Text>
				<Text style={styles.ctaSubHeader}>Welcome! please enter your personal details.</Text>
			</View>
			<View style={styles.userInputContainer}>
				<Entry label="First Name" value={firstName} onChangeText={handleChangeFirstName} inputErred={getIsErred("f")} />
				<Entry label="Last Name" value={lastName} onChangeText={handleChangeLastName} inputErred={getIsErred("l")} />
				<Entry label="Date Of Birth" date={dateOfBirth} inputType="date" onChangeDate={handleChangeDateOfBirth} inputErred={getIsErred("d")} />
				<Entry label="Gender" radio={gender} inputType="radio" radioData={["Male", "Female"] as const} onChangeRadio={setGender} />
			</View>
			{validationError && (
				<View style={styles.unmatchedContainer}>
					<RedExclamationMark />
					<Text style={styles.unmatchedText}>{validationError}</Text>
				</View>
			)}
			<View style={styles.optionsContainer}>
				<ButtonGroup onPress={handleProceed} positiveOption="Proceed" />
				<View style={styles.existingUserContainer}>
					<Text>Existing User?</Text>
					<Link href={"/"} replace asChild>
						<TouchableOpacity>
							<Text style={{ textDecorationLine: "underline" }}>Login</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</View>
	);
}

const generalStyles = StyleSheet.create({
	ctaComponentContainer: {
		gap: 20,
	},
	componentContainer: {
		paddingHorizontal: 20,
		alignItems: "center",
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
	optionsContainer: {
		// flex: 1,
	},
	existingUserContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
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

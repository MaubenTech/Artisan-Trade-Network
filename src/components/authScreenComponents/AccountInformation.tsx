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

interface AccountInformationProps {
	onSubmit: (firstName: string, lastName: string, dateOfBirth: string, gender: string) => void;
}

export default function AccountInformation({ onSubmit }: AccountInformationProps) {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [gender, setGender] = useState<string>("Male");
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

	const getIsErred = useCallback(
		(input: "p" | "c" | "p") => {
			if (!validationError) {
				return false;
			}
			const isRequired = validationError.includes("is required");
			switch (input) {
				case "p":
					return validationError.includes("First");
				case "c":
					return (validationError.includes("First") && isRequired) || validationError.includes("Last");
				case "p":
					return (
						(validationError.includes("First") && isRequired) ||
						(validationError.includes("Last") && isRequired) ||
						validationError.includes("Date")
					);
			}
		},
		[validationError]
	);

	return (
		<View style={styles.ctaComponentContainer}>
			<View style={[styles.ctaComponentHeader]}>
				<Text style={styles.ctaHeader}>Create An Account</Text>
				<Text style={styles.ctaSubHeader}>Welcome! please enter your personal details.</Text>
			</View>
			<View style={styles.userInputContainer}>
				<Entry label="First Name" onChangeText={handleChangeFirstName} inputErred={getIsErred("p")} />
				<Entry label="Last Name" onChangeText={handleChangeLastName} inputErred={getIsErred("c")} />
				<Entry label="Date Of Birth" inputType="date" onChangeDate={handleChangeDateOfBirth} inputErred={getIsErred("p")} />
				<Entry label="Gender" inputType="radio" radioData={["Male", "Female"]} onChangeRadio={setGender} />
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

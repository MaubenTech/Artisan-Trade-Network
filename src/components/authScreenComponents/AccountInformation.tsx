import { StyleSheet, View, Image, TouchableOpacity, Button, Modal } from "react-native";
import { Text, TextInput } from "@components/Text";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonGroup from "@components/ButtonGroup";
import RadioGroup, { OptionParams } from "@components/RadioGroup";
import { useCallback, useEffect, useRef, useState } from "react";
import colors from "@helpers/colors";
import CalenderIcon from "@assets/icons/auth/calender-icon.svg";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DatePicker from "react-native-modern-datepicker";

interface AccountInformationProps {
	onSubmit: (firstName: string, lastName: string, dateOfBirth: string, gender: "Male" | "Female") => void;
}

export default function AccountInformation({ onSubmit }: AccountInformationProps) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [gender, setGender] = useState<"Male" | "Female">("Male");

	const [showCalender, setShowCalender] = useState(false);
	// const [date, setDate] = useState<Date>();

	const [selectedDate, setSelectedDate] = useState("");

	// const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// // callbacks
	// const handlePresentModalPress = useCallback(() => {
	// 	bottomSheetModalRef.current?.present();
	// }, []);
	// const handleSheetChanges = useCallback((index: number) => {
	// 	console.log("handleSheetChanges", index);
	// }, []);

	useEffect(() => {
		// if (showCalender) {
		// DateTimePickerAndroid.open({
		// 	value: new Date(),
		// 	onChange: (ev, date) => {
		// 		console.log(`Date: ${date}`);
		// 		setShowCalender(false);
		// 	},
		// 	mode: "date",
		// 	is24Hour: true,
		// 	maximumDate: new Date(),
		// });
		// }
	});

	return (
		<GestureHandlerRootView style={styles.container}>
			{/* <BottomSheetModalProvider> */}
			<SafeAreaView>
				<View style={styles.logo}>
					<Image source={require("@assets/images/logo.png")} />
				</View>
				<View style={styles.componentContainer}>
					<Text style={styles.header}> Create An Account</Text>
					<Text style={styles.subHeader}>Welcome! Please enter your personal details.</Text>
				</View>
				<View style={styles.componentContainer}>
					<View style={styles.subDetailsContainer}>
						<Text style={styles.text}>First Name</Text>
						<TextInput value={firstName} onChangeText={setFirstName} style={styles.detailsInput} placeholder="Enter Your First Name" />
					</View>
					<View style={styles.subDetailsContainer}>
						<Text style={styles.text}>Last Name</Text>
						<TextInput value={lastName} onChangeText={setLastName} style={styles.detailsInput} placeholder="Enter Your Last Name" />
					</View>
					<View style={styles.subDetailsContainer}>
						<Text style={styles.text}>Date Of Birth</Text>
						<View style={[styles.detailsInput, styles.dateOfBirthContainer]}>
							<TextInput
								style={styles.dateOfBirthInput}
								placeholder="DD/MM/YYYY"
								// value={date && date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
								value={selectedDate}
								readOnly={true}
							/>
							<TouchableOpacity
								onPress={() => {
									// handlePresentModalPress();
									setShowCalender(true);
								}}
								style={styles.calenderButton}
							>
								<CalenderIcon />
							</TouchableOpacity>
						</View>
					</View>
					{/* {showCalender && (
							<RNDateTimePicker
								testID="dateTimePicker"
								value={date ?? new Date()}
								mode="date"
								is24Hour={true}
								onChange={(event, date) => {
									setDate(date);
									setShowCalender(false);
								}}
							/>
						)} */}
				</View>
				<View style={[styles.componentContainer]}>
					<Text style={styles.text}>Gender</Text>
					<RadioGroup
						options={[
							{ label: "Male", value: "Male" },
							{ label: "Female", value: "Female" },
						]}
						selectedOption={gender}
						onChanged={setGender}
						optionStyle={{ padding: 15 }}
					/>
				</View>
				<View style={styles.optionsContainer}>
					<ButtonGroup onPress={() => onSubmit(firstName, lastName, dateOfBirth, gender)} positiveOption="Proceed" paddingHorizontal={20} />
					<View style={styles.existingUserContainer}>
						<Text>Existing User?</Text>
						<Link href={"/"} asChild>
							<TouchableOpacity>
								<Text style={{ textDecorationLine: "underline" }}>Login</Text>
							</TouchableOpacity>
						</Link>
					</View>
				</View>
				{/* <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
						<BottomSheetView style={styles.contentContainer}>
							<RNDateTimePicker mode="date" value={new Date()} />
							<Text>Awesome 🎉</Text>
						</BottomSheetView>
					</BottomSheetModal> */}
				<Modal animationType="slide" transparent visible={showCalender}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							{/* TODO: Customize the datepicker a bit more. Add the animation where scrolling left or right has the same effect as clicking the left or right buttons respectively */}
							<DatePicker
								mode="calendar"
								selected={selectedDate}
								onDateChange={setSelectedDate}
								options={{
									backgroundColor: colors.white,
									// textHeaderColor: colors.mainColor,
									textDefaultColor: colors.brownShade,
									selectedTextColor: colors.white,
									mainColor: colors.mainColor,
									textHeaderColor: "#000",
									headerFont: "Poppins_600SemiBold",
									textHeaderFontSize: 14,
									defaultFont: "Poppins_400Regular",
									textFontSize: 13,

									// textHeaderColor: "#FFA25B",
									// textDefaultColor: "#F6E7C1",
									// selectedTextColor: "#fff",
									// mainColor: "#F4722B",
									// textSecondaryColor: "#D6C7A1",
									// borderColor: "rgba(122, 146, 165, 0.1)",
								}}
							/>

							<TouchableOpacity onPress={() => setShowCalender(false)}>
								<Text style={{ color: colors.mainColor }}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
			{/* </BottomSheetModalProvider> */}
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 20,
	},
	logo: {
		flexDirection: "column",
		alignItems: "center",
	},
	componentContainer: {
		gap: 5,
		paddingHorizontal: 20,
	},
	header: {
		fontSize: 23,
		fontWeight: "bold",
	},
	subHeader: {},
	subDetailsContainer: {
		gap: 8,
	},
	text: {
		color: "black",
		fontSize: 17,
	},
	detailsInput: {
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		borderColor: colors.inputBorderColor,
	},
	dateOfBirthContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 0,
	},
	dateOfBirthInput: {
		flex: 1,
		paddingLeft: 15,
	},
	calenderButton: {
		padding: 15,
	},
	optionsContainer: {
		// flex: 1,
	},

	existingUserContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
	},

	centeredView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modalView: {
		margin: 20,
		// backgroundColor: "#000516",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		padding: 35,
		width: "90%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

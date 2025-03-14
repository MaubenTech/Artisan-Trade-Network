import { Dimensions, Modal, StyleProp, StyleSheet, TextInputProps, TextStyle, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import React, { useState } from "react";
import { compactStyles } from "@helpers/styles";
import colors from "@helpers/colors";
import CalenderIcon from "@assets/icons/auth/calender-icon.svg";
import DatePicker from "react-native-modern-datepicker";
import RadioGroup, { RadioOption } from "./RadioGroup";

const { width, height } = Dimensions.get("window");

type EntryInputType = "text" | "radio" | "date";
interface EntryProps {
	label: string;
	inputType?: EntryInputType;
	inputProps?: TextInputProps;
	inputStyle?: StyleProp<TextStyle>;
	radioData?: RadioOption[];
	onChangeDate?: (date: string) => void;
	onChangeText?: (text: string) => void;
	onChangeRadio?: (selected: string) => void;
	customTextInputComponent?: React.ReactNode;
}

const Entry = ({
	label,
	inputType = "text",
	inputProps,
	inputStyle,
	radioData,
	onChangeText,
	onChangeDate,
	onChangeRadio,
	customTextInputComponent,
}: EntryProps) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [text, setText] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [showCalender, setShowCalender] = useState(false);
	const [selectedDate, setSelectedDate] = useState("");
	const [radioOption, setRadioOption] = useState<string>();

	const handleChangeText = (text: string) => {
		setText(text);
		onChangeText && onChangeText(text);
	};

	const handleChangeDate = (dateString: string) => {
		const formattedDate = dateString.split("/").reverse().join("/");
		console.log(`Raw date: ${dateString} | Formatted date: ${formattedDate}`);
		setSelectedDate(formattedDate);
		onChangeDate && onChangeDate(formattedDate);
	};

	const handleRadioOptionChange = (option: string) => {
		setRadioOption(option);
		onChangeRadio && onChangeRadio(option);
	};

	return (
		<View style={[styles.userInputSubContainer]}>
			<Text style={[styles.userInputLabel]}>{label}</Text>
			{customTextInputComponent ? (
				customTextInputComponent
			) : inputType && inputType === "text" ? (
				<TextInput
					value={text}
					onChangeText={handleChangeText}
					style={[styles.userInput, inputStyle]}
					secureTextEntry={(inputProps && inputProps.secureTextEntry) || label.toLowerCase().includes("password")}
					// placeholder={(inputProps && inputProps.placeholder) || `Enter your ${label.replace(/^./, (match) => match.toLowerCase())}`}
					placeholder={(inputProps && inputProps.placeholder) || `Enter your ${label.toLowerCase()}`}
					{...inputProps}
				/>
			) : inputType === "date" ? (
				<TouchableOpacity
					onPress={() => {
						// handlePresentModalPress();
						setShowCalender(true);
					}}
					style={[styles.userInput, styles.dateOfBirthContainer]}
				>
					<TextInput
						style={styles.dateOfBirthInput}
						placeholder="DD/MM/YYYY"
						// value={date && date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
						value={selectedDate}
						readOnly={true}
					/>
					<TouchableOpacity onPress={() => setShowCalender(true)} style={styles.calenderButton}>
						<CalenderIcon />
					</TouchableOpacity>
				</TouchableOpacity>
			) : (
				inputType === "radio" && <RadioGroup options={radioData} selectedOption={radioOption} onChangeOption={handleRadioOptionChange} />
			)}
			<Modal animationType="slide" transparent visible={showCalender}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						{/* TODO: Customize the datepicker a bit more. Add the animation where scrolling left or right has the same effect as clicking the left or right buttons respectively */}
						<DatePicker
							mode="calendar"
							selected={selectedDate}
							onDateChange={handleChangeDate}
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
		</View>
	);
};

export default Entry;

const generalStyles = StyleSheet.create({
	userInputLabel: {},
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

	dateOfBirthContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 0,
	},
	dateOfBirthInput: {
		flex: 1,
	},
	calenderButton: {
		paddingHorizontal: 10,
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

const androidStyles = StyleSheet.create({
	userInput: {
		width: width * 0.85,
		// padding: 5,
	},
});

const iosStyles = StyleSheet.create({
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
});

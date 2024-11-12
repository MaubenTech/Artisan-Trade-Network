import React, { useEffect, useState } from "react";
import colors from "@helpers/colors";
import { SvgProps } from "react-native-svg";
import { compactStyles } from "@helpers/styles";
import PageHeader from "@components/PageHeader";
import ButtonGroup from "@components/ButtonGroup";
import { Text, TextInput } from "@components/Text";
import CustomKeyboardView from "@components/CustomKeyboardView";
import TaskTime from "@assets/icons/cancelJob/TaskTime.svg";
import WrongTask from "@assets/icons/cancelJob/WrongTask.svg";
import NoResponse from "@assets/icons/cancelJob/NoResponse.svg";
import MindChange from "@assets/icons/cancelJob/MindChange.svg";
import OtherReason from "@assets/icons/cancelJob/OtherReason.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AccidentalRequest from "@assets/icons/cancelJob/AccidentalRequest.svg";
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { hideTabBar, showTabBar } from "@store/miscellaneousSlice";
import useAppDispatch from "@hooks/useAppDispatch";

interface ReasonType {
	reasonLogo: React.ComponentType<SvgProps>;
	reason: string;
}

type ReasonProps = ReasonType & {
	showInput: boolean;
	onChangeText: (boolean) => void;
	onReasonPress: () => void;
};

const Reason: React.FC<ReasonProps> = ({ reason, reasonLogo: ReasonLogo, onChangeText, showInput, onReasonPress }) => {
	return (
		<View style={styles.reasonContainer}>
			<TouchableOpacity style={styles.reason} onPress={onReasonPress}>
				<View style={styles.reasonIconContainer}>
					<ReasonLogo />
				</View>
				<Text style={styles.reasonText}>{reason}</Text>
			</TouchableOpacity>
			{reason === "Other Reason" && showInput && (
				<View style={styles.specifiedReason}>
					<TextInput placeholder="Please specify" onChangeText={onChangeText} style={styles.specifiedReasonText} multiline />
				</View>
			)}
		</View>
	);
};

const cancelReasons: ReasonType[] = [
	{
		reasonLogo: NoResponse,
		reason: "The artisan didn't respond",
	},
	{
		reasonLogo: MindChange,
		reason: "Change in mind ?",
	},
	{
		reasonLogo: TaskTime,
		reason: "Task taking too long",
	},
	{
		reasonLogo: WrongTask,
		reason: "Selected wrong task",
	},
	{
		reasonLogo: AccidentalRequest,
		reason: "Requested by Accident",
	},
	{
		reasonLogo: OtherReason,
		reason: "Other Reason",
	},
];

const CancelJob = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [showInput, setShowInput] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useFocusEffect(() => {
		dispatch(hideTabBar());

		return () => {
			dispatch(showTabBar());
		};
	});

	return (
		<KeyboardAwareScrollView>
			<PageHeader pageName="Cancel Job" />
			<View style={styles.container}>
				<View style={styles.componentContainer}>
					<View style={{ gap: 10 }}>
						<Text style={{ fontSize: 18, fontWeight: "500" }}>Why do you want to cancel ?</Text>
						<Text style={{ fontSize: 12 }}>Optional</Text>
					</View>
				</View>
				<View>
					{cancelReasons.map(({ reasonLogo, reason }, index) => (
						<Reason
							key={index}
							reasonLogo={reasonLogo}
							reason={reason}
							onChangeText={setInputValue}
							showInput={showInput}
							onReasonPress={() => {
								reason === "Other Reason" ? setShowInput(true) : setShowInput(false);
							}}
						/>
					))}
				</View>
				<View>
					<ButtonGroup positiveOption="Cancel" href={"/"} paddingHorizontal={20} />
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default CancelJob;

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		gap: 10,
	},

	componentContainer: {
		paddingHorizontal: 30,
	},

	reasonContainer: {
		borderBottomColor: colors.greyBorder,
		borderBottomWidth: 1,
	},

	reason: {
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	reasonIconContainer: {
		alignItems: "center",
		width: "10%",
	},

	reasonText: {
		textAlign: "center",
	},

	specifiedReason: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},

	specifiedReasonText: {
		borderColor: colors.darkInputBorderColor,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		paddingHorizontal: 20,
		height: 100,
		textAlign: "left",
		textAlignVertical: "top",
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

const styles = compactStyles(generalStyles, androidStyles, iosStyles);

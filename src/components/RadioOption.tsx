import React from "react";
import colors from "@helpers/colors";
import { compactStyles } from "@helpers/styles";
import { Text } from "@components/Text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View, TouchableOpacity, ViewStyle, StyleProp } from "react-native";

export interface RadioOptionProps {
	label: string;
	selected?: boolean;
	onPress?: () => void;
	icon?: React.ReactNode;
	containerStyle?: StyleProp<ViewStyle>;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, selected, onPress, icon, containerStyle }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	return (
		<>
			<TouchableOpacity onPress={onPress} style={[styles.radioContainer, containerStyle]}>
				<View style={styles.iconContainer}>{icon}</View>
				<Text style={styles.label}>{label}</Text>
				<MaterialIcons name={selected ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={selected ? "#00A3FF" : "#CCC"} />
			</TouchableOpacity>
			<View style={{ borderBottomColor: colors.greyBorder, paddingBottom: 10, borderBottomWidth: 1 }}></View>
		</>
	);
};

export default RadioOption;

const generalStyles = StyleSheet.create({
	radioContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	iconContainer: {
		marginRight: 10,
	},
	label: {
		flex: 1,
		fontSize: 16,
		color: "#333",
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

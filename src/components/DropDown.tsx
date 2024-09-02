import React, { useCallback, useState } from "react";
import colors from "../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";

const dropDown = [
	{
		dropDownHeader: "Why am I not receiving notifications",
		dropDownDetails:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis.Sed vitae est dignissim, iaculis nisi pellentesque.",
	},
	{
		dropDownHeader: "Can I withdraw my bid for a job?",
		dropDownDetails:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis.Sed vitae est dignissim, iaculis nisi pellentesque.",
	},

	{
		dropDownHeader: "What should I do if I want to change my job type?",
		dropDownDetails:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis.Sed vitae est dignissim, iaculis nisi pellentesque.",
	},
];

const DropDown = () => {
	const [openStates, setOpenStates] = useState<{
		[key: string]: boolean;
	}>({ [dropDown[0].dropDownHeader]: true });

	const toggleDropDown = useCallback(
		(header: string) => {
			setOpenStates((prevState) => ({
				...prevState,
				[header]: !prevState[header],
			}));
			console.log(openStates);
		},
		[openStates]
	);
	return (
		<FlatList
			contentContainerStyle={styles.container}
			keyExtractor={(item) => item.dropDownHeader}
			data={dropDown}
			scrollEnabled={false}
			renderItem={({ item }) => {
				const isOpen = openStates[item.dropDownHeader];
				return (
					<TouchableOpacity
						style={styles.dropDownContainer}
						onPress={() => toggleDropDown(item.dropDownHeader)}
					>
						<Ionicons
							name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
							style={styles.dropDownIcon}
						/>
						<View>
							<Text style={styles.dropDownHeaderText}>
								{item.dropDownHeader}
							</Text>
							{isOpen ? <Text>{item.dropDownDetails}</Text> : <></>}
						</View>
					</TouchableOpacity>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	dropDownContainer: {
		backgroundColor: colors.inputBorderColor,
		padding: 10,
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	dropDownIcon: {
		alignSelf: "flex-start",
	},

	dropDownHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	dropDownHeaderText: {
		textAlign: "left",
		fontSize: 18,
		fontWeight: "500",
	},
});
export default DropDown;

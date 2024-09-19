import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Pressable, Button, TouchableOpacity } from "react-native";
import { Text } from "@components/Text";
import { Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonGroup from "@components/ButtonGroup";
import RadioGroup, { OptionParams } from "@components/RadioGroup";
import { useState } from "react";
import colors from "@helpers/colors";

export default function SignUp() {
	const [gender, setGender] = useState<string>("Male");
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logo}>
				<Image source={require("@assets/images/logo.png")} />
			</View>
			<View style={styles.componentContainer}>
				<Text style={styles.header}> Create An Account</Text>
				<Text style={styles.subHeader}>Welcome! please enter your personal details.</Text>
			</View>
			<View style={styles.componentContainer}>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>First Name</Text>
					<TextInput style={styles.detailsInput} placeholder="Enter Your First Name" />
				</View>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>Last Name</Text>
					<TextInput style={styles.detailsInput} placeholder="Enter Your Last Name" />
				</View>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>Date Of Birth</Text>
					<TextInput style={styles.detailsInput} placeholder="DD/MM/YYY" />
				</View>
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
			<ButtonGroup href={"/ContactDetails"} positiveOption="Proceed" paddingHorizontal={20} />
			<View style={styles.existContainer}>
				<Text>Existing User?</Text>
				<Link href={"/"} asChild>
					<TouchableOpacity>
						<Text style={{ textDecorationLine: "underline" }}>Login</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</SafeAreaView>
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

	existContainer: {
		marginTop: -30,
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
		gap: 10,
	},
});

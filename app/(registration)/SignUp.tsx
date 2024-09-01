import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";

export default function SignUp() {
	return (
		<View style={styles.container}>
			<View style={styles.logo}>
				<Image source={require("../../assets/images/logo.png")} />
			</View>
			<Text> Create An Account</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		gap: 50,
	},
	logo: {
		paddingTop: 20,
		flexDirection: "column",
	},
});

import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";

import HeaderImage from "../../assets/images/passwordUpdatedHeader.svg";
import React from "react";
import colors from "../../src/helpers/colors";
import { Text } from "../../src/components/Text";

const { width, height } = Dimensions.get("window");

const PasswordUpdated = (): JSX.Element => {
	const router = useRouter();
	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			scrollEnabled={false}
		>
			<View style={styles.imageContainer}>
				<HeaderImage width={300} height={300} />
			</View>
			<View style={styles.forgotPasswordContainer}>
				<View style={styles.lch}>
					<Text style={styles.lchHeader}>Password Updated</Text>
					<Text style={styles.lchText}>
						Your password has been successfully updated
					</Text>
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={() => {
							router.navigate("/");
						}}
					>
						<Text style={styles.primaryButtonText}>Back to Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default PasswordUpdated;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		alignItems: "center",
		gap: 10,
	},

	imageContainer: {
		paddingTop: "35%",
		// marginBottom: "8%",
	},

	image: {},

	forgotPasswordContainer: {
		// backgroundColor: "#f0f",
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		paddingLeft: 30,
		paddingRight: 30,
		gap: 50,
	},

	lch: {
		alignItems: "center",
		width: "100%",
		// gap: 7,
		// marginBottom: "5%",
	},

	lchHeader: {
		fontSize: 26,
		fontWeight: "700",
	},

	lchText: {
		fontWeight: "300",
		fontSize: 13,
		paddingLeft: "12%",
		paddingRight: "12%",
		textAlign: "center",
	},

	buttonsContainer: {
		// marginTop
	},

	primaryButton: {
		alignItems: "center",
		backgroundColor: colors.mainColor,
		borderRadius: 15,
		justifyContent: "center",
		padding: 15,
	},

	primaryButtonText: {
		textAlign: "center",
		fontSize: 16,
		color: "#fff",
	},
});

import React from "react";
import { View, StyleSheet } from "react-native";
import BidSubmittedSuccessfully from "../../../assets/images/BidSubmittedSuccessfuilly.svg";
import ButtonGroup from "../../../src/components/ButtonGroup";
import colors from "../../../src/helpers/colors";
import { Text } from "../../../src/components/Text";

const BidSubmitted = () => {
	return (
		<View style={styles.container}>
			<BidSubmittedSuccessfully />
			<View style={styles.successContainer}>
				<Text style={styles.successTitle}>Bid Submitted Successfully</Text>
				<View style={styles.successSubTitleContainer}>
					<Text style={styles.successSubTitle}>
						Lorem ipsum dolor sit amet, consecteturelit. Etiam sed metus at est
						iaculis
					</Text>
				</View>
			</View>
			<ButtonGroup
				positiveOptionStyle={{}}
				positiveOption="Go back to home"
				href={"/(home)/Home"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#ff0",
		alignItems: "center",
		justifyContent: "center",
		// gap: 5,
		// paddingTop: 70,
	},

	successContainer: {
		justifyContent: "center",
		alignItems: "center",
		// paddingHorizontal: 30,
		gap: 10,
		// backgroundColor: "#f0f",
	},

	successTitle: {
		fontSize: 30,
		fontWeight: "700",
		textAlign: "center",
	},

	successSubTitleContainer: {
		paddingHorizontal: 40,
	},

	successSubTitle: {
		textAlign: "center",
		color: colors.greySecondaryShade,
	},
});

export default BidSubmitted;

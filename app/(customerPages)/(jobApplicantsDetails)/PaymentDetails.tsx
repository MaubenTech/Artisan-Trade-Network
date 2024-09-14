import colors from "@helpers/colors";
import React, { useState } from "react";
import { Text } from "@components/Text";
import PageHeader from "@components/PageHeader";
import { compactStyles } from "@helpers/styles";
import ButtonGroup from "@components/ButtonGroup";
import { StyleSheet, View } from "react-native";
import RadioOption, { RadioOptionProps } from "@components/RadioOption";
import Card from "@assets/icons/paymentMethods/credit-card.svg";
import PayPalIcon from "@assets/icons/paymentMethods/paypal.svg";
import Paystack from "@assets/icons/paymentMethods/paystack.svg";

const radiOptions: RadioOptionProps[] = [
	{
		label: "Card",
		icon: <Card />,
		selected: true,
	},
	{
		label: "PayPal",
		icon: <PayPalIcon />,
	},
	{
		label: "Paystack",
		icon: <Paystack />,
	},
];

const PaymentDetails = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const [selectedMethod, setSelectedMethod] = useState<string>("Card");

	return (
		<>
			<PageHeader pageName="Payment" />
			<View style={styles.container}>
				<View style={styles.componentContainer}>
					<View style={styles.amountContainer}>
						<Text style={styles.amountText}>Amount</Text>
						<Text style={styles.amount}>₦50,000</Text>
					</View>
				</View>
				<View style={styles.componentContainer}>
					<Text style={{ fontSize: 20, fontWeight: "600" }}>Payment Method</Text>
				</View>
				<View style={{ gap: 20 }}>
					{radiOptions.map(({ label, icon }) => (
						<RadioOption
							label={label}
							icon={icon}
							key={label}
							containerStyle={{ paddingHorizontal: 20 }}
							selected={selectedMethod === label}
							onPress={() => setSelectedMethod(label)}
						/>
					))}
				</View>
			</View>
			<ButtonGroup
				href={"/ApplicationConfirmationPage"}
				positiveOption="Pay (50,000)"
				paddingHorizontal={20}
				positiveOptionBg={colors.greenShade}
			/>
		</>
	);
};

export default PaymentDetails;

const generalStyles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginTop: 30,
		gap: 30,
		flex: 1,
	},

	componentContainer: {
		paddingHorizontal: 20,
	},
	amountContainer: {
		backgroundColor: "#00A3FF",
		padding: 20,
		borderRadius: 10,
		alignItems: "flex-start",
		marginBottom: 20,
		gap: 5,
	},
	amountText: {
		color: "#FFF",
		fontSize: 16,
	},
	amount: {
		color: "#FFF",
		fontSize: 24,
		fontWeight: "bold",
	},
	paymentMethodText: {
		fontSize: 18,
		marginVertical: 10,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

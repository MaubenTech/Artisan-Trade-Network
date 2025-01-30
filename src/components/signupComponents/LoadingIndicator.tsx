import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { Text, TextInput } from "@components/Text";
import React from "react";
import { compactStyles } from "@helpers/styles";
import colors from "@helpers/colors";

const LoadingIndicator = ({ visible }: { visible: boolean }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	return (
		<Modal transparent animationType="fade" visible={visible}>
			<View style={styles.container}>
				<ActivityIndicator size={"large"} color={colors.mainColor} />
			</View>
		</Modal>
	);
};

export default LoadingIndicator;

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

import React from "react";
import { router } from "expo-router";
import colors from "../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";

export default function PageHeader({ pageName }: { pageName: string }) {
	return (
		<View style={styles.pageHeaderContainer}>
			<View style={styles.pageHeaderElement}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
						paddingLeft: "10%",
						paddingRight: "10%",
						paddingBottom: "5%",
					}}
				>
					<View
						style={{
							backgroundColor: colors.whiteShade,
							padding: 2,
							borderRadius: 200,
						}}
					>
						<Ionicons
							name="chevron-back"
							size={20}
							onPress={() => router.back()}
						/>
					</View>
					<Text style={styles.pageHeaderTitle}>{pageName}</Text>
				</View>
			</View>
			<View style={styles.pageHeaderContainerBorder}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	pageHeaderContainer: {
		width: "100%",
	},

	pageHeaderElement: {},

	pageHeaderContainerBorder: {
		width: "100%",
		borderBottomWidth: 3,
		borderStyle: "solid",
		borderColor: colors.whiteShade,
		shadowOpacity: 3,
		shadowColor: "#E0E0E0",
		shadowOffset: { width: 0, height: -1 },
	},

	pageHeaderTitle: {
		fontSize: 19,
		fontWeight: "500",
	},
});

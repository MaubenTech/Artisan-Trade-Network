import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CustomSplashScreen = (): JSX.Element => {
	const [fadeAnim] = useState(new Animated.Value(1));

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
			])
		).start();
	}, [fadeAnim]);

	const animatedStyle = { opacity: fadeAnim };

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<Image
				source={require("../../assets/images/logo-4x.png")}
				style={styles.image}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Artisan</Text>
				<Text style={styles.subText}>Trades Network</Text>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff", // Change this to match your design
	},
	image: {
		width: width * 0.25,
		height: height * 0.12,
		resizeMode: "contain",
		// backgroundColor: "#0f0",
	},
	textContainer: {
		height: height * 0.12,
		// backgroundColor: "#f0f",
		// alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 35,
		// backgroundColor: "#0ff",
		fontWeight: "bold",
		// marginTop: 20,
	},
	subText: {
		// backgroundColor: "#f00",
		fontSize: 16,
		color: "#888",
		marginTop: -8,
	},
});

export default CustomSplashScreen;

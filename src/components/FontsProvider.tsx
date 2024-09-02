import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
	useFonts,
	Poppins_100Thin,
	Poppins_100Thin_Italic,
	Poppins_200ExtraLight,
	Poppins_200ExtraLight_Italic,
	Poppins_300Light,
	Poppins_300Light_Italic,
	Poppins_400Regular,
	Poppins_400Regular_Italic,
	Poppins_500Medium,
	Poppins_500Medium_Italic,
	Poppins_600SemiBold,
	Poppins_600SemiBold_Italic,
	Poppins_700Bold,
	Poppins_700Bold_Italic,
	Poppins_800ExtraBold,
	Poppins_800ExtraBold_Italic,
	Poppins_900Black,
	Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import CustomSplashScreen from "./CustomSplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

const FontsProvider = ({ children }): JSX.Element => {
	const [fontsLoaded] = useFonts({
		Poppins_100Thin,
		Poppins_100Thin_Italic,
		Poppins_200ExtraLight,
		Poppins_200ExtraLight_Italic,
		Poppins_300Light,
		Poppins_300Light_Italic,
		Poppins_400Regular,
		Poppins_400Regular_Italic,
		Poppins_500Medium,
		Poppins_500Medium_Italic,
		Poppins_600SemiBold,
		Poppins_600SemiBold_Italic,
		Poppins_700Bold,
		Poppins_700Bold_Italic,
		Poppins_800ExtraBold,
		Poppins_800ExtraBold_Italic,
		Poppins_900Black,
		Poppins_900Black_Italic,
	});
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (fontsLoaded) {
			// setTimeout(() => {
			setIsReady(true);
			// SplashScreen.hideAsync();
			// console.log("Fonts loaded!");
			// }, 5000);
		}
		// else console.log("Fonts not loaded yet!");
	}, [fontsLoaded]);

	if (!isReady) {
		return <CustomSplashScreen />;
	}
	return <View style={{ flex: 1 }}>{children}</View>;
};

const styles = StyleSheet.create({});

export default FontsProvider;

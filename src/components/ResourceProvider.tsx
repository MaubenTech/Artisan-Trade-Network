import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
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
import CustomSplashScreen from "./CustomSplashScreen";
import { Asset } from "expo-asset";

const cacheImages = (images) => {
	function isValidUrl(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	}
	return images.map((image) => {
		if (typeof image === "string" && isValidUrl(image)) {
			return Image.prefetch(image);
		} else {
			return Asset.fromModule(image).downloadAsync();
		}
	});
};

const cacheFonts = (fonts: Array<{ [fontFamily: string]: Font.FontSource }>) => {
	return fonts.map((font) => Font.loadAsync(font));
};

const FontsProvider = ({ children }): JSX.Element => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				const loadedFonts = cacheFonts([
					{
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
					},
					{ ...Ionicons.font },
				]);

				const loadedImages = cacheImages([require("@assets/images/homeCard1.png"), require("@assets/images/homeCard2.png")]);

				await Promise.all([...loadedFonts, ...loadedImages]);

				//TODO: Move the setIsReady to the finally block when you have a proper error reporting service!
				setIsReady(true);
			} catch (error) {
				//TODO: Add error to error reporting service
				console.warn(error);
			} finally {
			}
		}

		loadResourcesAndDataAsync();

		// else console.log("Fonts not loaded yet!");
	}, []);

	if (!isReady) {
		return <CustomSplashScreen />;
	}
	return <View style={{ flex: 1 }}>{children}</View>;
};

const styles = StyleSheet.create({});

export default FontsProvider;

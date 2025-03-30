import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { compactStyles } from "@helpers/styles";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import CustomKeyboardView from "@components/CustomKeyboardView";
import { isAndroid } from "@helpers/utils";
import HeaderImage from "@assets/images/loginPageHeader.svg";

interface LogoHeaderContainerProps {
	children: React.ReactNode;
	containerStyle?: StyleProp<ViewStyle>;
}

const LogoHeaderContainer = ({ children, containerStyle }: LogoHeaderContainerProps) => {
	const { top, bottom } = useSafeAreaInsets();
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	return (
		<CustomKeyboardView>
			<SafeAreaView
				style={[
					styles.container,
					{
						paddingTop: isAndroid ? top : 0,
						paddingBottom: isAndroid ? bottom : 0,
					},
					containerStyle,
				]}
			>
				<View style={styles.componentContainer}>
					<HeaderImage />
				</View>
				{children}
			</SafeAreaView>
		</CustomKeyboardView>
	);
};

export default LogoHeaderContainer;

const generalStyles = StyleSheet.create({
	container: {
		// padding: 30,
		flex: 1,
	},
	componentContainer: {
		paddingHorizontal: 20,
		alignItems: "center",
		marginBottom: 30,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	container: {
		padding: 0,
	},
});

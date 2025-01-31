import { Text, TextInput } from "@components/Text";
import colors from "@helpers/colors";
import Jobs from "../../app/(tabs)/Jobs";
import React, { ReactElement } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/src/types";
import { compactStyles } from "@helpers/styles";

const { width, height } = Dimensions.get("window");

type BottomTabProps = {
	focused: boolean;
	text: string;
	iconName: any;
};

const TabBar = ({ state, descriptors, navigation }: any, props: Omit<BottomTabBarButtonProps & BottomTabProps, "focused">) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const icons = {
		Home: (props) => <Ionicons name="home" color={colors.whiteShade} size={25} {...props} />,
	};

	return (
		<View style={styles.tabBarStyle}>
			{state.routes.map((route: any, index) => {
				const { options } = descriptors[route.key];
				const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

				console.log("route name:", route.name);
				if (["_sitemap", "+not-found"].includes(route.name)) return null;
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				const { accessibilityState, iconName, text } = props;
				// const focused = accessibilityState.selected;

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={[
							{
								flex: isFocused ? 1 : 0.6,
								alignItems: "center",
								justifyContent: "center",
							},
						]}
						activeOpacity={1}
						key={route.name}
					>
						<View style={[styles.iconContainer, isFocused ? styles.activeContainer : styles.inactiveIconContainer]}>
							<Ionicons name={iconName} color={colors.whiteShade} size={25} />
							{/* {icons[route.name]({
								color: isFocused ? colors.whiteShade : colors.greyShade,
							})} */}
							{isFocused ? <Text style={{ ...styles.iconText }}>{label}</Text> : <></>}
						</View>
					</TouchableOpacity>
					// <TouchableOpacity
					// 	onPress={onPress}
					// 	style={[
					// 		{
					// 			flex: isFocused ? 1 : 0.6,
					// 			alignItems: "center",
					// 			justifyContent: "center",
					// 		},
					// 	]}
					// 	activeOpacity={1}
					// 	key={route.name}
					// >
					// 	<View
					// 		style={[
					// 			styles.iconContainer,
					// 			isFocused
					// 				? styles.activeContainer
					// 				: styles.inactiveIconContainer,
					// 		]}
					// 	>
					// 		<Ionicons name={"home"} color={colors.whiteShade} size={25} />
					// 		{isFocused ? (
					// 			<Text style={{ ...styles.iconText }}>{label}</Text>
					// 		) : (
					// 			<></>
					// 		)}
					// 	</View>
					// </TouchableOpacity>
				);
			})}
		</View>
	);
};

export default TabBar;

const generalStyles = StyleSheet.create({
	tabBarStyle: {
		// flexDirection: "column",
		flexDirection: "row",
		// justifyContent: "space-between",
		borderRadius: 50,
		backgroundColor: colors.brownShade,
		position: "absolute",
		bottom: 30,
		marginRight: 30,
		marginLeft: 30,
		paddingTop: 10,
		paddingBottom: 10,
	},
	tabBarItemStyle: {
		flex: 1,
		borderRadius: 50,
		paddingLeft: 30,
		paddingRight: 30,
	},
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		padding: 12.5,
	},
	activeContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		padding: 10,
		paddingBottom: 12.5,
		paddingTop: 12.5,
		width: width * 0.3,
		backgroundColor: colors.mainColor,
	},
	inactiveIconContainer: {
		backgroundColor: colors.greySecondaryShade,
	},
	iconText: {
		color: colors.whiteShade,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({
	tabBarItemStyle: {
		alignItems: "center",
	},
});

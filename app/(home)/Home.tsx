import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	ScrollView,
	Dimensions,
	FlatListProps,
	ImagePropsBase,
} from "react-native";
import { Image } from "expo-image";
import colors from "../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ReactElement, useEffect, useState } from "react";

import { useNavigation } from "expo-router";
import MenuHeader from "../../src/components/MenuHeader";
import HomeCarousel from "../../src/components/HomeCarousel";
import RewardIcon from "../../assets/images/reward.svg";
import { LinkProps } from "expo-router/build/link/Link";

const HomeCard1 = require("../../assets/images/homeCard1.png");
const HomeCard2 = require("../../assets/images/homeCard2.png");

const { width, height } = Dimensions.get("window");

export interface SwipeData extends LinkProps {
	index: number;
	img: ImagePropsBase;
	title: string;
	subtitle: string;
	buttonColor?: string;
	buttonTitle?: string;
	icon?: ReactElement<any, any>;
	secondIcon?: ReactElement<any, any>;
}

export default function Home() {
	const [notificationPresent, setNotificationPresent] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		navigation.addListener("beforeRemove", (event) => {
			event.preventDefault();
			console.log("tried to go back");
			navigation.dispatch(event.data.action);
		});
	});

	const swipeData: SwipeData[] = [
		{
			index: 0,
			img: HomeCard1,
			title: "Hire a service provider",
			subtitle: "With the click of a button, hire a service provider today",
			buttonTitle: "Start Now",
			buttonColor: colors.greenShade,
			icon: (
				<Ionicons
					name="arrow-forward-outline"
					style={{ color: "white" }}
					size={20}
				/>
			),
			href: "/(customerPages)/Services",
		},
		{
			index: 1,
			img: HomeCard2,
			title: "View available Jobs",
			subtitle: "With the click of a button, view available jobs today",
			buttonTitle: "Unlock",
			buttonColor: colors.whiteSecondaryShade,
			secondIcon: (
				<Ionicons name="lock-open" style={{ color: "white" }} size={15} />
			),
			icon: (
				<Ionicons
					name="arrow-forward-outline"
					style={{ color: "white", textAlign: "center" }}
					size={20}
				/>
			),
			href: "/(customerPages)/NewJob",
		},
	];

	return (
		<View style={styles.container}>
			<View style={styles.menuHeaderContainer}>
				<MenuHeader />
			</View>
			<View style={styles.contentSection}>
				<View style={styles.salutationContainer}>
					<Text style={styles.salutationText}>Hello</Text>
					<Text style={styles.userName}>Nonso</Text>
				</View>

				<View style={styles.cardSection}>
					<HomeCarousel data={swipeData} />
				</View>

				<View style={styles.rewardContainer}>
					<View
						style={{
							alignItems: "center",
							flexDirection: "row",
							justifyContent: "center",
							gap: 10,
						}}
					>
						<RewardIcon />
						<View style={{ width: width * 0.4 }}>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "600",
									...styles.basicTextStyle,
								}}
							>
								Reward!
							</Text>
							<Text style={{ fontSize: 12, ...styles.basicTextStyle }}>
								Invite your friends today and earn a reward
							</Text>
						</View>
					</View>
					<View
						style={{
							backgroundColor: colors.greySecondaryShade,
							borderRadius: 20,
							padding: 5,
						}}
					>
						<Ionicons name="chevron-forward" size={25} color={"white"} />
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	menuHeaderContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		paddingHorizontal: 30,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		gap: 50,
	},

	contentSection: {
		width: "100%",
		gap: 5,
		paddingLeft: "10%",
	},

	salutationContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	salutationText: {
		color: colors.greyShade,
		fontSize: 30,
		marginRight: "3%",
	},
	userName: {
		fontSize: 30,
	},

	cardSection: {
		alignItems: "flex-end",
	},

	rewardContainer: {
		backgroundColor: colors.brownShade,
		height: height * 0.125,
		width: width * 0.8,
		borderRadius: 15,
		marginTop: 10,
		flexDirection: "row",
		padding: 20,
		justifyContent: "space-between",
		alignItems: "center",
	},

	basicTextStyle: {
		color: "white",
	},

	cardButtonTitle: {
		fontSize: 20,
		color: "white",
		marginLeft: 5,
	},
});

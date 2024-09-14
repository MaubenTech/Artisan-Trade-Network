import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import colors from "@helpers/colors";
import { Text } from "@components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import RewardIcon from "@assets/images/reward.svg";
import { LinkProps } from "expo-router/build/link/Link";
import MenuHeader from "@components/MenuHeader";
import HomeCarousel from "@components/HomeCarousel";
import React, { ReactElement, useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, ScrollView, Dimensions, FlatListProps, ImagePropsBase } from "react-native";
import { compactStyles } from "@helpers/styles";
import { Bid, PostedBid } from "./Bids";

const HomeCard1 = require("@assets/images/homeCard1.png");
const HomeCard2 = require("@assets/images/homeCard2.png");

const { width, height } = Dimensions.get("window");

export interface SwipeData extends LinkProps<string> {
	index: number;
	img: ImagePropsBase;
	title: string;
	subtitle: string;
	buttonColor?: string;
	buttonTitle?: string;
	icon?: ReactElement<any, any>;
	secondIcon?: ReactElement<any, any>;
}

const recommendedJobs: Bid[] = [
	{
		jobTitle: "Need to repair my toilet",
		jobServiceCategory: "Maintenance",
		jobDetail: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
		jobPrice: "50,000 - 70,000",
		jobDate: "Posted 2 hours ago",
	},
	{
		jobTitle: "Need to repair my toilet again",
		jobServiceCategory: "Maintenance",
		jobDetail:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
		jobPrice: "50,000 - 70,000",
		jobDate: "Posted 2 hours ago",
	},
];

export default function Home() {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
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
			icon: <Ionicons name="arrow-forward-outline" style={{ color: "white" }} size={20} />,
			href: "/Services",
		},
		{
			index: 1,
			img: HomeCard2,
			title: "View available Jobs",
			subtitle: "With the click of a button, view available jobs today",
			buttonTitle: "Unlock",
			buttonColor: colors.listItemBorderColor,
			secondIcon: <Ionicons name="lock-open" style={{ color: "white" }} size={15} />,
			icon: <Ionicons name="arrow-forward-outline" style={{ color: "white", textAlign: "center" }} size={20} />,
			href: "/NewJob",
		},
	];

	return (
		<>
			<View style={styles.menuHeaderContainer}>
				<MenuHeader />
			</View>
			<ScrollView style={{ backgroundColor: colors.white }} contentContainerStyle={styles.container}>
				<View style={styles.contentSection}>
					<View style={styles.salutationContainer}>
						<Text style={styles.salutationText}>Hello</Text>
						<Text style={styles.userName}>Nonso</Text>
					</View>

					<View style={styles.cardSection}>
						<HomeCarousel data={swipeData} />
					</View>

					<View style={styles.recommendedContainer}>
						<View style={styles.recommendedHeader}>
							<Text style={styles.recommendedTitle}>Recommended</Text>
							<Text style={styles.recommendedViewAll}>View all</Text>
						</View>
						<View style={styles.recommendedJobContainer}>
							{recommendedJobs.map((recommendedJob, index) => (
								<PostedBid job={recommendedJob} key={index} containerStyle={styles.recommendedJob} />
							))}
						</View>
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
			</ScrollView>
		</>
	);
}

const generalStyles = StyleSheet.create({
	menuHeaderContainer: {
		backgroundColor: colors.white,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingBottom: 20,
	},

	container: {
		// flex: 1,
		backgroundColor: colors.white,
		alignItems: "center",
		paddingBottom: "35%",
	},

	contentSection: {
		width: "100%",
		gap: 5,
	},

	salutationContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingHorizontal: "10%",
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

	recommendedContainer: {
		marginTop: "5%",
		marginBottom: "5%",
	},

	recommendedHeader: {
		paddingHorizontal: "10%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	recommendedTitle: {
		fontSize: 20,
		fontWeight: "600",
	},

	recommendedViewAll: {
		color: colors.subTitlesColor,
		textDecorationLine: "underline",
	},

	recommendedJobContainer: {},

	recommendedJob: {
		paddingHorizontal: "10%",
	},

	rewardContainer: {
		backgroundColor: colors.brownShade,
		height: height * 0.125,
		borderRadius: 15,
		marginTop: 10,
		flexDirection: "row",
		padding: 20,
		marginHorizontal: "10%",
		justifyContent: "space-between",
		alignItems: "center",
	},

	basicTextStyle: {
		color: colors.white,
	},

	cardButtonTitle: {
		fontSize: 20,
		color: colors.white,
		marginLeft: 5,
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

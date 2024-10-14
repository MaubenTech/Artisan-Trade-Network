import { LinkProps, useNavigation } from "expo-router";
import colors from "../../src/helpers/colors";
import { compactStyles } from "@helpers/styles";
import { Text } from "../../src/components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import RewardIcon from "@assets/images/reward.svg";
import MenuHeader from "@components/MenuHeader";
import HomeCarousel from "@components/HomeCarousel";
import React, { ReactElement, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, ImageSourcePropType } from "react-native";

import { BidJob, PostedBid } from "./Bids";
import { selectCurrentUser } from "@store/usersSlice";
import useAppSelector from "@hooks/useAppSelector";
import { selectRecommendedBidJobs } from "@store/bidsSlice";

const HomeCard1 = require("@assets/images/homeCard1.png");
const HomeCard2 = require("@assets/images/homeCard2.png");

const { width, height } = Dimensions.get("window");

export interface SwipeData extends LinkProps<string> {
	index: number;
	img: ImageSourcePropType;
	title: string;
	subtitle: string;
	buttonColor?: string;
	buttonTitle?: string;
	icon?: ReactElement<any, any>;
	secondIcon?: ReactElement<any, any>;
}

export default function Home() {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [notificationPresent, setNotificationPresent] = useState(false);

	const { nickName, type: userType } = useAppSelector(selectCurrentUser);

	const navigation = useNavigation();

	const recommendedJobs = useAppSelector(selectRecommendedBidJobs);

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
			icon: <Ionicons name="arrow-forward-outline" style={styles.cardIcon} size={20} />,
			href: "/Services",
		},
		{
			index: 1,
			img: HomeCard2,
			title: "View available Jobs",
			subtitle: "With the click of a button, view available jobs today",
			buttonTitle: "Unlock",
			buttonColor: colors.listItemBorderColor,
			secondIcon: <Ionicons name="lock-open" style={styles.cardIcon} size={15} />,
			icon: <Ionicons name="arrow-forward-outline" style={styles.cardIcon} size={18} />,
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
						<Text style={styles.userName}>{nickName}</Text>
					</View>

					<View style={styles.cardSection}>
						<HomeCarousel data={swipeData} />
					</View>

					{userType === "ARTISAN" && (
						<View style={styles.recommendedContainer}>
							<View style={styles.recommendedHeader}>
								<Text style={styles.recommendedTitle}>Recommended</Text>
								<Text style={styles.recommendedViewAll}>View all</Text>
							</View>
							<View style={styles.recommendedJobContainer}>
								{recommendedJobs.map((recommendedJob, index) => (
									<PostedBid bidJob={recommendedJob} key={index} containerStyle={styles.recommendedJob} />
								))}
							</View>
						</View>
					)}

					<View style={styles.rewardContainer}>
						<View style={styles.rewardContent}>
							<RewardIcon width={40} />
							<View style={styles.rewardTextContainer}>
								<Text style={styles.rewardTitle}>Reward!</Text>
								<Text style={styles.rewardSubtitle}>Invite your friends today and earn a reward</Text>
							</View>
						</View>
						<View style={styles.rewardContentIcon}>
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
		fontSize: 25,
		marginRight: "3%",
	},

	userName: {
		fontSize: 25,
		fontWeight: "600",
	},

	cardSection: {
		alignItems: "flex-end",
	},

	cardButtonTitle: {
		fontSize: 20,
		color: colors.white,
		marginLeft: 5,
	},

	cardIcon: { color: "white" },

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
		borderRadius: 15,
		marginTop: 10,
		flexDirection: "row",
		marginHorizontal: "10%",
		justifyContent: "space-between",
		alignItems: "center",
	},

	rewardContent: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
		// width: "100%",
		// backgroundColor: "#f0f",
	},

	rewardTextContainer: {
		// width: width * 0.4,
		flex: 1,
		paddingRight: 20,
	},

	rewardTitle: {
		color: colors.white,
		fontWeight: "600",
	},

	rewardSubtitle: {
		fontSize: 12,
		color: colors.greyBorder,
	},

	rewardContentIcon: {
		backgroundColor: colors.greySecondaryShade,
		borderRadius: 20,
		padding: 5,
	},
});

const androidStyles = StyleSheet.create({
	cardIcon: {
		marginTop: -5,
	},

	rewardContainer: {
		paddingVertical: 20,
		paddingHorizontal: 20,
	},

	rewardTitle: {
		fontSize: 16,
	},

	rewardSubtitle: {
		fontSize: 8,
		marginTop: -5,
	},
});

const iosStyles = StyleSheet.create({
	salutationContainer: {
		marginBottom: 10,
	},

	rewardContainer: {
		paddingVertical: 20,
		paddingHorizontal: 20,
	},

	rewardTextContainer: {
		// gap: 5,
	},

	rewardTitle: {
		fontSize: 18,
	},

	rewardSubtitle: {
		fontSize: 10,
	},
});

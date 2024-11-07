import colors from "@helpers/colors";
import { Text } from "@components/Text";
import { useFocusEffect, useRouter } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import PageHeader from "@components/PageHeader";
import { compactStyles } from "@helpers/styles";
import ButtonGroup from "@components/ButtonGroup";
import Ionicons from "@expo/vector-icons/Ionicons";
import JobRating from "@assets/images/JobRating.svg";
import React, { useCallback, useEffect, useState } from "react";
import ProfilePicture from "@assets/components/chatList/images/profilePicture.svg";
import { StyleSheet, View, Platform, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import useAppDispatch from "@hooks/useAppDispatch";
import { hideTabBar, showTabBar } from "@store/miscellaneousSlice";

const { width } = Dimensions.get("window");

const ApplicantsPage = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);

	const router = useRouter();

	const [isBidApproved, setIsBidApproved] = useState<boolean>(false);
	const [pendingState, setPendingState] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const toggleBidApproval = () => {
		setIsBidApproved(!isBidApproved);

		// setTimeout(() => {
		//     router.push(navigationTarget);
		// }, 0);
	};

	const togglePendingState = () => {
		setPendingState(!pendingState);
	};

	useFocusEffect(() => {
		dispatch(hideTabBar());

		return () => {
			dispatch(showTabBar());
		};
	});

	return (
		<>
			<PageHeader profile profileName="Drew Berry" isApplicantPage pageName="" />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.componentContainer}>
					<Text style={styles.componentContainerHeader}>Bio</Text>
					<Text style={styles.componentContainerContent}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis. Sed vitae est dignissim, iaculis nisi
						pellentesque,
					</Text>
				</View>
				<View style={[styles.componentContainer, { flexDirection: "row", gap: 50 }]}>
					<View>
						<Text style={styles.componentContainerHeader}>Bid</Text>
						<Text>₦ 50,000</Text>
					</View>
					<View>
						<Text style={styles.componentContainerHeader}>Distance</Text>
						<View style={{ flexDirection: "row" }}>
							<Ionicons name="pin-outline" color={colors.mainColor} />
							<Text style={styles.componentContainerContent}>20 km</Text>
						</View>
					</View>
				</View>
				<View style={[styles.componentContainer]}>
					<Text style={styles.componentContainerHeader}>Rating</Text>
					<View>
						<JobRating />
					</View>
				</View>
				<View style={[styles.componentContainer]}>
					<Text style={styles.componentContainerHeader}>Review</Text>
					<Text style={styles.componentContainerContent}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis.
					</Text>
				</View>
				<View style={[styles.componentContainer, { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 50 }]}>
					<View>
						<ProfilePicture />
					</View>
					<View>
						<Text style={styles.componentContainerHeader}>Nonso Robert</Text>
						<JobRating width={60} />
					</View>
				</View>
			</ScrollView>
			{isBidApproved ? (
				pendingState ? (
					<View style={styles.applicationChoiceContainer}>
						<ButtonGroup href={"/PaymentDetails"} positiveOption="Proceed to Payment" paddingHorizontal={10} />
					</View>
				) : (
					<View style={styles.applicationChoiceContainer}>
						<ButtonGroup
							onPress={togglePendingState}
							positiveOption="Pending"
							positiveOptionBg={colors.greyBorder}
							positiveOptionTextStyle={{ color: "black" }}
							paddingHorizontal={10}
						/>
					</View>
				)
			) : Platform.OS === "ios" ? (
				<View style={styles.applicationChoiceContainer}>
					<ButtonGroup
						onPress={toggleBidApproval}
						containerStyle={{ gap: 40 }}
						positiveOption="Approve"
						negativeOption="Reject"
						reverse
						positiveOptionBg={colors.greenShade}
						negativeOptionBg={colors.redShade}
						negativeOptionStyle={{ borderColor: "transparent" }}
					/>
				</View>
			) : (
				<Shadow distance={10} startColor="#000">
					<View style={styles.applicationChoiceContainer}>
						<ButtonGroup
							onPress={toggleBidApproval}
							containerStyle={{ gap: 10 }}
							positiveOption="Approve"
							negativeOption="Reject"
							reverse
							positiveOptionBg={colors.greenShade}
							negativeOptionBg={colors.redShade}
							negativeOptionStyle={{ borderColor: "transparent" }}
						/>
					</View>
				</Shadow>
			)}
		</>
	);
};

export default ApplicantsPage;

const generalStyles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginTop: 30,
		gap: 20,
	},

	componentContainer: {
		paddingHorizontal: 30,
		gap: 5,
	},

	componentContainerHeader: {
		fontWeight: "400",
		fontSize: 14,
	},

	componentContainerContent: {
		fontWeight: "300",
		fontSize: 12,
	},
	applicationChoiceContainer: {
		backgroundColor: "white",
		padding: 10,
		borderColor: colors.shadedMainColor,
		borderWidth: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: "center",
		// marginTop: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		// position: "absolute",
		bottom: 0,
		width: width,
	},

	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subText: {
		fontSize: 14,
		color: "#888",
		marginBottom: 20,
		textAlign: "center",
	},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

import { Link } from "expo-router";
import React, { useState } from "react";
import colors from "../../src/helpers/colors";
import { Text } from "../../src/components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "../../src/components/SearchBar";
import MenuHeader from "../../src/components/MenuHeader";
import JobPicture from "../../assets/images/JobPicture.svg";
import FilterComponent from "../../src/components/FilterComponent";
import MoreIcon from "../../assets/icons/services/moreIcon.svg";
import LocationIcon from "../../assets/icons/services/locationIcon.svg";
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, StyleProp, ViewStyle } from "react-native";
import { compactStyles } from "@helpers/styles";
import useAppSelector from "@hooks/useAppSelector";
import { selectJobById } from "@store/jobsSlice";
import { formatDistance, formatDistanceToNow, sub } from "date-fns";
import { selectBidJobByBidId } from "@store/bidsSlice";

const { width, height } = Dimensions.get("window");

export type BidJob = {
	title: string;
	type: string;
	service: string;
	description: string;
	bidPrice: string;
	createdAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
	updatedAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
};

export type BidStatus = "Initial" | "Bid" | "Pending" | "Active" | "Completed";

export const PostedBid = ({ bid, containerStyle }: { bid: BidJob; containerStyle?: StyleProp<ViewStyle> }) => {
	const timeAgo = formatDistanceToNow(bid.createdAt, { addSuffix: true });

	return (
		<Link href={"/PostedJobDetails"} style={[styles.job, containerStyle]} asChild>
			<TouchableOpacity key={bid.title}>
				<View style={styles.jobPicture}>
					<JobPicture />
				</View>
				<View style={styles.jobDetailContainer}>
					<View style={[styles.jobDetailHeader]}>
						<Text style={styles.jobDetailText} numberOfLines={1}>
							{bid.title}
						</Text>
						<MoreIcon color={"#000"} style={styles.moreIcon} />
					</View>
					<View style={styles.jobDetailMiddle}>
						<View style={styles.jobServiceCategory}>
							<Text style={styles.jobServiceCategoryText}>{bid.type}</Text>
							<View style={styles.location}>
								<LocationIcon style={styles.locationIcon} />
								<Text style={styles.locationText}>20 km</Text>
							</View>
						</View>
						<Text style={styles.jobDetailContent} numberOfLines={2}>
							{bid.description}
						</Text>
					</View>
					<View style={[styles.jobDetailFooter]}>
						<Text style={styles.jobPriceDetail}>₦ {bid.bidPrice}</Text>
						<Text style={styles.jobDate}>Posted {timeAgo}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default function Bids() {
	const [filterOption, setFilterOption] = useState<string | number>("All");
	const bids = useAppSelector((state) => state.bids);

	const filterOptions = [
		{
			optionTitle: "All",
		},
		{
			optionTitle: "Posted",
		},
		{
			optionTitle: "Active",
		},
		{
			optionTitle: "Completed",
		},
	];

	return (
		<>
			<View style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
				<MenuHeader />
			</View>
			<View style={styles.container}>
				<View style={styles.searchBarContainer}>
					<SearchBar />
				</View>
				<View style={styles.filterComponentContainer}>
					<FilterComponent filterOptions={filterOptions} selectedOption={filterOption} onOptionChanged={setFilterOption} />
				</View>
				<ScrollView style={styles.componentContainer} contentContainerStyle={styles.componentContentContainer}>
					{bids.map((bid, index) => {
						const job = useAppSelector((state) => selectBidJobByBidId(state, bid._id));
						const bidJob: BidJob = { ...job, ...bid };
						// const bidJob = useAppSelector((state) => selectBidJobByBidId(state, bid._id));
						return <PostedBid key={index} bid={bidJob} />;
					})}
				</ScrollView>
			</View>
		</>
	);
}

const generalStyles = StyleSheet.create({
	container: {
		paddingTop: 40,
		flex: 1,
		backgroundColor: colors.white,
	},

	componentContainer: {
		marginTop: 20,
	},

	componentContentContainer: {
		marginTop: -20,
	},

	searchBarContainer: {
		paddingHorizontal: 20,
	},

	filterComponentContainer: {
		marginTop: 20,
		paddingHorizontal: 20,
	},

	job: {
		flexDirection: "row",
		gap: 15,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.greyBorder,
		paddingHorizontal: 20,
	},

	jobPicture: {},

	jobDetailContainer: {
		flex: 1,
		justifyContent: "space-between",
	},

	jobDetailHeader: {
		marginTop: -3,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	jobDetailText: {
		fontWeight: "600",
	},

	jobServiceCategory: {
		flexDirection: "row",
		gap: 8,
	},

	location: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},

	jobDetailContent: {
		fontWeight: "300",
		paddingRight: 15,
	},

	jobDetailFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 5,
	},

	jobPriceDetail: {
		fontWeight: "500",
		fontSize: 10,
	},

	jobDate: {
		fontWeight: "500",
		fontSize: 10,
	},
});

const androidStyles = StyleSheet.create({
	jobDetailHeader: {
		alignItems: "flex-end",
	},

	jobServiceCategory: {
		marginTop: -5,
	},

	jobServiceCategoryText: {
		fontSize: 10,
	},

	locationIcon: {
		marginTop: -4,
	},

	locationText: {
		fontSize: 10,
	},

	jobDetailContent: {
		fontSize: 10,
	},
});

const iosStyles = StyleSheet.create({
	jobDetailHeader: {
		alignItems: "flex-start",
	},

	moreIcon: {
		marginTop: 7,
	},

	jobDetailMiddle: {
		gap: 5,
	},

	jobServiceCategory: {
		marginTop: -12,
	},

	jobServiceCategoryText: {
		fontSize: 11,
	},

	locationText: {
		fontSize: 11,
	},

	jobDetailContent: {
		fontSize: 11,
	},
});

const styles = compactStyles(generalStyles, androidStyles, iosStyles);

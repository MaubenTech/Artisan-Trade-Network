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

const { width, height } = Dimensions.get("window");

export type Bid = {
    jobTitle: string;
    jobServiceCategory: string;
    jobDetail: string;
    jobPrice: string;
    jobDate: string;
};

export type BidStatus = "Initial" | "Bid" | "Pending" | "Active" | "Completed";

const bids: Bid[] = [
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
        jobDetail: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
        jobPrice: "50,000 - 70,000",
        jobDate: "Posted 2 hours ago",
    },
];

export const PostedBid = ({ job, containerStyle }: { job: Bid; containerStyle?: StyleProp<ViewStyle> }) => {
    return (
        <Link href={"/PostedJobDetails"} style={[styles.job, containerStyle]} asChild>
            <TouchableOpacity key={job.jobTitle}>
                <View style={styles.jobPicture}>
                    <JobPicture />
                </View>
                <View style={styles.jobDetailContainer}>
                    <View style={[styles.jobDetailHeader]}>
                        <Text style={styles.jobDetailText}>{job.jobTitle}</Text>
                        <MoreIcon color={"#000"} style={styles.moreIcon} />
                    </View>
                    <View style={styles.jobDetailMiddle}>
                        <View style={styles.jobServiceCategory}>
                            <Text style={styles.jobServiceCategoryText}>{job.jobServiceCategory}</Text>
                            <View style={styles.location}>
                                <LocationIcon style={styles.locationIcon} />
                                <Text style={styles.locationText}>20 km</Text>
                            </View>
                        </View>
                        <Text style={styles.jobDetailContent} numberOfLines={2}>
                            {job.jobDetail}
                        </Text>
                    </View>
                    <View style={[styles.jobDetailFooter]}>
                        <Text style={styles.jobPriceDetail}>₦ {job.jobPrice}</Text>
                        <Text style={styles.jobDate}>{job.jobDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default function Bids() {
    const [filterOption, setFilterOption] = useState<string | number>("All");

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
                <View style={styles.componentContainer}>
                    {bids.map((job, index) => {
                        return <PostedBid key={index} job={job} />;
                    })}
                </View>
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

    componentContainer: {},

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

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
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

export type JobStatus = "Posted" | "Active" | "Completed";

type Bid = {
    jobTitle: string;
    jobServiceCategory: string;
    jobDetail: string;
    jobPrice: string;
    jobDate: string;
};

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

const PostedBid = ({ job }: { job: Bid }) => {
    return (
        <Link style={styles.job} asChild href={"/(jobs)/PostedJobDetails"} key={job.jobTitle}>
            <TouchableOpacity style={styles.jobDetails} key={job.jobTitle}>
                <View style={styles.jobPicture}>
                    <JobPicture />
                </View>
                <View style={styles.jobDetailContainer}>
                    <View style={[styles.jobDetailHeader]}>
                        <Text style={styles.jobDetailText}>{job.jobTitle}</Text>
                        <MoreIcon color={"#000"} />
                    </View>
                    <View style={{ flexWrap: "nowrap" }}>
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
                <SearchBar />
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

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: "#fff",
        // gap: 20,
        paddingHorizontal: 20,
    },

    componentContainer: {},

    filterComponentContainer: {
        marginTop: 20,
    },

    job: {
        flexDirection: "row",
        gap: 15,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyBorder,
        // backgroundColor: "#f00",
    },
    jobDetails: {},

    jobPicture: {
        // height: "100%",
        // backgroundColor: "#f0f",
    },
    jobDetailContainer: {
        // width: width * 0.65,
        // gap: 5,
        flex: 1,
    },
    jobDetailHeader: {
        marginTop: -3,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        // backgroundColor: "#00f",
    },
    jobDetailText: {
        fontWeight: "600",
        // fontSize: 15,
    },
    jobServiceCategory: {
        flexDirection: "row",
        gap: 8,
        marginTop: -5,
    },
    jobServiceCategoryText: {
        // color: colors.greySecondaryShade,
        // backgroundColor: "#f0f",
        fontSize: 10,
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "#f0f",
        gap: 2,
    },
    locationIcon: {
        marginTop: -4,
    },
    locationText: {
        fontSize: 10,
    },
    jobDetailContent: {
        fontSize: 10,
        fontWeight: "300",
    },
    jobDetailFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        // color: colors.greySecondaryShade,
        // fontWeight: "200",
        alignItems: "center",
        marginTop: 5,
    },
    jobPriceDetail: {
        // color: colors.greySecondaryShade,

        fontWeight: "500",
        fontSize: 10,
    },
    jobDate: {
        fontWeight: "500",
        // color: colors.greySecondaryShade,
        // fontWeight: "100",
        fontSize: 10,
    },
});

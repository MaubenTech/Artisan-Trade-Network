import React from "react";
import { Text } from "../Text";
import { Link } from "expo-router";
import colors from "../../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Clock from "../../../assets/icons/Clock.svg";
import JobPicture from "../../../assets/images/JobPicture.svg";
import MoreIcon from "../../../assets/icons/services/moreIcon.svg";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export type JobStatus = "Posted" | "Active" | "Completed";

type Jobs = {
    jobTitle: string;
    jobServiceCategory: string;
    jobDetail: string;
    jobStatus: JobStatus;
    jobPrice: string;
    jobDate: string;
};

const jobs: Jobs[] = [
    {
        jobTitle: "Need to repair my toilet",
        jobServiceCategory: "Maintenance",
        jobDetail: "Lorem  dolore quis pariatur porro ullam facilis molestiae quasi.",
        jobStatus: "Posted",
        jobPrice: "500 - 7000",
        jobDate: "11/04/2023",
    },
    {
        jobTitle: "Need to repair my toilet again",
        jobServiceCategory: "Maintenance",
        jobDetail: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
        jobStatus: "Active",
        jobPrice: "500",
        jobDate: "11/04/2023",
    },
];

const setStatusBackgroundColor = (status: JobStatus) => {
    switch (status) {
        case "Posted":
            return { backgroundColor: colors.yellow };

        case "Active":
            return {
                backgroundColor: colors.greenShade,
            };
    }
};

const PostedJobs = () => {
    return jobs.map((job) => {
        return (
            <Link style={styles.job} asChild href={"/(jobs)/PostedJobDetails"} key={job.jobTitle}>
                <TouchableOpacity style={styles.jobDetails} key={job.jobTitle}>
                    <View style={styles.jobPicture}>
                        <JobPicture />
                    </View>
                    <View style={styles.jobDetailContainer}>
                        <View style={[styles.jobDetailHeader]}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={styles.jobDetailText}>{job.jobTitle}</Text>
                                <MoreIcon color={"#94A3B1"} />
                            </View>
                            <Text style={styles.jobServiceCategory}>{job.jobServiceCategory}</Text>
                        </View>
                        <View style={{ flexWrap: "nowrap" }}>
                            <Text style={styles.jobDetailContent} numberOfLines={2}>
                                {job.jobDetail}
                            </Text>
                        </View>
                        <View style={[styles.jobDetailFooter]}>
                            <View style={styles.jobStatus}>
                                <View style={[styles.jobStatusIcon, setStatusBackgroundColor(job.jobStatus)]}></View>
                                <Text style={{ fontWeight: "200", fontSize: 12 }}>{job.jobStatus}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontWeight: "500" }}>₦</Text>
                                <Text style={styles.jobPriceDetail}> {job.jobPrice}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                                <Clock />
                                <Text style={styles.jobDate}>11/04/2023</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        );
    });
};

const styles = StyleSheet.create({
    job: {
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyBorder,
        alignItems: "center",
    },
    jobDetails: {},

    jobPicture: {
        backgroundColor: "green",
        borderRadius: 10,
    },
    jobDetailContainer: {
        flex: 1,
        gap: 4,
    },
    jobServiceCategory: {
        // color: colors.greySecondaryShade,
        fontWeight: "300",
        fontSize: 12,
    },
    jobDetailHeader: {},
    jobDetailText: {
        fontWeight: "500",
    },
    jobDetailContent: {
        fontWeight: "200",
        fontSize: 10,
    },
    jobDetailFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        color: colors.greySecondaryShade,
        fontWeight: "200",
    },
    jobStatus: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    jobStatusIcon: {
        height: 15,
        width: 15,
        borderRadius: 50,
    },
    jobPriceDetail: {
        fontWeight: "200",
        fontSize: 12,
    },
    jobDate: {
        fontWeight: "200",
        fontSize: 12,
    },
});

export default PostedJobs;

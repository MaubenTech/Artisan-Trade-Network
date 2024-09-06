import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Link } from "expo-router";
import colors from "../../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import JobPicture from "../../../assets/images/JobPicture.svg";
import MoreIcon from "../../../assets/icons/services/moreIcon.svg";
import JobHistoryDetails from "../../../app/(customerPages)/(profile)/JobHistoryDetails";

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
    jobPrice: "500",
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
              <Text style={styles.jobDetailText}>{job.jobTitle}</Text>
              <MoreIcon />
            </View>
            <View style={{ flexWrap: "nowrap" }}>
              <Text style={styles.jobServiceCategory}>{job.jobServiceCategory}</Text>
              <Text style={styles.jobDetailContent} numberOfLines={2}>
                {job.jobDetail}
              </Text>
            </View>
            <View style={[styles.jobDetailFooter]}>
              <View style={styles.jobStatus}>
                <View style={[styles.jobStatusIcon, setStatusBackgroundColor(job.jobStatus)]}></View>
                <Text>{job.jobStatus}</Text>
              </View>
              <Text style={styles.jobPriceDetail}>₦ {job.jobPrice}</Text>
              <Text style={styles.jobDate}>
                <Ionicons name="timer-outline" />
                11/04/2023
              </Text>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyBorder,
  },
  jobDetails: {},

  jobPicture: {},
  jobDetailContainer: {
    width: width * 0.65,
    gap: 5,
  },
  jobServiceCategory: {
    color: colors.greySecondaryShade,
  },
  jobDetailHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  jobDetailText: {
    fontWeight: "600",
  },
  jobDetailContent: {},
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
    color: colors.greySecondaryShade,
    fontWeight: "400",
  },
  jobDate: {
    color: colors.greySecondaryShade,
    fontWeight: "400",
  },
});

export default PostedJobs;

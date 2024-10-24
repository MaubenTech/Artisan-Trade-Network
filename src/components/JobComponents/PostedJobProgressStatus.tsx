import { StyleSheet } from "react-native";
import React from "react";
import { compactStyles } from "@helpers/styles";
import ProgressBar from "@components/ProgressBar";
import { JobStatus } from "app/(home)/Jobs";
import { BidStatus } from "app/(home)/Bids";
import useAppSelector from "@hooks/useAppSelector";
import { selectCurrentUser } from "@store/usersSlice";
import { selectJobById, selectJobsState } from "@store/jobsSlice";

const PostedJobProgressStatus = ({ jobStage, bidStage }: { jobStage?: JobStatus; bidStage?: BidStatus }) => {
    const job = useAppSelector((state) => selectJobById(state, "3"));

    const jobStatus = job.status;

    console.log("User's Job Stage in PostedJobProgressStatus is: " + jobStatus);

    const styles = compactStyles(generalStyles, androidStyles, iosStyles);
    const { type: userType } = useAppSelector(selectCurrentUser);
    const isServiceProvider = userType === "SERVICE_PROVIDER";

    const denominator = isServiceProvider ? 4 : 3;

    if (!isServiceProvider) {
        switch (jobStage) {
            case "Posted":
                return <ProgressBar status={jobStatus} numerator={1} denominator={denominator} showCompleteLevel />;
            case "Active":
                return <ProgressBar status={jobStatus} numerator={2} denominator={denominator} showCompleteLevel />;
            case "Completed":
                return <ProgressBar status={jobStatus} numerator={3} denominator={denominator} showCompleteLevel />;
            default:
                return <></>;
        }
    } else {
        switch (bidStage) {
            case "Initial":
                return <></>;
            case "Bid":
                return <ProgressBar status="Bid" numerator={1} denominator={denominator} showCompleteLevel />;
            case "Pending":
                return <ProgressBar status="Pending" numerator={2} denominator={denominator} showCompleteLevel />;
            case "Active":
                return <ProgressBar status="Active" numerator={3} denominator={denominator} showCompleteLevel />;
            case "Completed":
                return <ProgressBar status="Completed" numerator={4} denominator={denominator} showCompleteLevel />;
            default:
                return <></>;
        }
    }
};

export default PostedJobProgressStatus;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

import { StyleSheet, View, Text } from "react-native";
import React, { useContext } from "react";
import { compactStyles } from "@helpers/styles";
import ProgressBar from "@components/ProgressBar";
import { UserTypeContext } from "context/UserTypeProvider";
import USER_TYPE from "constants/UserType";
import { JobStatus } from "../../../app/(home)/Jobs";
import { BidStatus } from "../../../app/(home)/Bids";

const PostedJobProgressStatus = ({ jobStage, bidStage }: { jobStage?: JobStatus; bidStage?: BidStatus }) => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);
    const userType = useContext(UserTypeContext);
    const isServiceProvider = userType.type === USER_TYPE.SERVICE_PROVIDER;

    const denominator = isServiceProvider ? 4 : 3;

    if (!isServiceProvider) {
        switch (jobStage) {
            case "Posted":
                return <ProgressBar status="Posted" numerator={1} denominator={denominator} />;
            case "Active":
                return <ProgressBar status="Active" numerator={2} denominator={denominator} />;
            case "Completed":
                return <ProgressBar status="Completed" numerator={3} denominator={denominator} />;
            default:
                return <View></View>;
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

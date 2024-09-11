import React from "react";
import { Text } from "@components/Text";
import { SvgProps } from "react-native-svg";
import { compactStyles } from "@helpers/styles";
import { StyleSheet, View } from "react-native";
import PageHeader from "@components/PageHeader";
import TaskTime from "../../../assets/icons/cancelJob/TaskTime.svg";
import WrongTask from "../../../assets/icons/cancelJob/WrongTask.svg";
import NoResponse from "../../../assets/icons/cancelJob/NoResponse.svg";
import MindChange from "../../../assets/icons/cancelJob/MindChange.svg";
import OtherReason from "../../../assets/icons/cancelJob/OtherReason.svg";
import AccidentalRequest from "../../../assets/icons/cancelJob/AccidentalRequest.svg";

type ReasonType = {
    reasonLogo: React.FC<SvgProps>;
    reason: string;
};

const CancelJob = () => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);

    const cancelReasons: ReasonType[] = [
        {
            reasonLogo: NoResponse,
            reason: "The artisan didn't respond",
        },
        {
            reasonLogo: MindChange,
            reason: "Change in mind ?",
        },
        {
            reasonLogo: TaskTime,
            reason: "Task taking too long",
        },
        {
            reasonLogo: WrongTask,
            reason: "Selected wrong task",
        },
        {
            reasonLogo: AccidentalRequest,
            reason: "Requested by Accident",
        },
        {
            reasonLogo: OtherReason,
            reason: "Other Reason",
        },
    ];

    return (
        <>
            <PageHeader pageName="Cancel Job" />
            <View></View>
        </>
    );
};

export default CancelJob;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

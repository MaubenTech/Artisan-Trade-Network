import React from "react";
import { Text } from "./Text";
import colors from "../helpers/colors";
import * as Progress from "react-native-progress";
import { View, StyleSheet, Dimensions } from "react-native";
import { JobStatus } from "../../app/(home)/Jobs";
import { BidStatus } from "../../app/(home)/Bids";
import { compactStyles } from "@helpers/styles";
import useAppSelector from "@hooks/useAppSelector";
import { selectJobsState } from "@store/jobsSlice";

const { width } = Dimensions.get("window");

type ProgressBarProps = {
    status: JobStatus | BidStatus;
    numerator?: number;
    denominator?: number;
    showCompleteLevel?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ status, numerator, denominator, showCompleteLevel }) => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);

    const calculateProgress = () => {
        return numerator / denominator;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Status</Text>
            </View>
            <View style={styles.subTextContainer}>
                <Text style={styles.status}>{status}</Text>
                {showCompleteLevel && (
                    <Text style={styles.completeLevel}>
                        {numerator}/{denominator}
                    </Text>
                )}
            </View>
            <Progress.Bar
                progress={calculateProgress()}
                width={null}
                height={10}
                color={colors.mainColor}
                unfilledColor={colors.offMainColor}
                borderWidth={0}
                borderRadius={5}
                style={styles.progressBar}
            />
        </View>
    );
};

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({
    container: {
        backgroundColor: "#F8F9FB",
        padding: 16,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.mainColor,
        width: width * 0.9,
        alignSelf: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    subTextContainer: {
        alignItems: "center",
        // backgroundColor: "#f0f",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: -5,
    },
    step: {
        fontSize: 14,
        color: "#ddd",
    },
    status: {
        // backgroundColor: "#0f0",
        fontSize: 14,
        color: "#333",
    },
    completeLevel: {
        // backgroundColor: "#0f0",
        fontSize: 12,
    },
    progressBar: {
        marginTop: 8,
    },
});

const iosStyles = StyleSheet.create({
    container: {
        backgroundColor: "#F8F9FB",
        padding: 16,
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.mainColor,
        width: width * 0.9,
        alignSelf: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    subTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    step: {
        fontSize: 14,
        color: "#ddd",
    },
    status: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    completeLevel: {},
    progressBar: {
        marginTop: 8,
    },
});

export default ProgressBar;

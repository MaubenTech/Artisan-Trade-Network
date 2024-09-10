import React from "react";
import { Text } from "./Text";
import colors from "../helpers/colors";
import * as Progress from "react-native-progress";
import { View, StyleSheet, Dimensions } from "react-native";
import { JobStatus } from "../../app/(home)/Jobs";

const { width } = Dimensions.get("window");

type JobStatusBarProps = {
    status: JobStatus;
};

const ProgressBar: React.FC<JobStatusBarProps> = ({ status }) => {
    const setProgress = (status: JobStatus) => {
        switch (status) {
            case "Posted":
                return 0.33;
            case "Active":
                return 0.5;
            case "Completed":
                return 1;
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Status</Text>
            </View>
            <Text style={styles.status}>{status}</Text>
            <Progress.Bar
                progress={setProgress(status)}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f8f8",
        padding: 16,
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
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
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
    progressBar: {
        marginTop: 8,
    },
});

export default ProgressBar;

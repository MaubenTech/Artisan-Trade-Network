import React from "react";
import { compactStyles } from "@helpers/styles";
import { View, StyleSheet } from "react-native";
import colors from "../../../src/helpers/colors";
import { Text } from "../../../src/components/Text";
import ButtonGroup from "../../../src/components/ButtonGroup";
import JobPostedSuccessfully from "../../../assets/images/JobPostedSuccessfully.svg";

const JobPosted = () => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <JobPostedSuccessfully />
                <View style={styles.successContainer}>
                    <Text style={styles.successTitle}>Job Posted Successfully</Text>
                    <View style={styles.successSubTitleContainer}>
                        <Text style={styles.successSubTitle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, dolore tempore?</Text>
                    </View>
                </View>
                <ButtonGroup positiveOption="Go Back Home" paddingHorizontal={30} href={"/(home)/Home"} />
            </View>
        </View>
    );
};

const generalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        // gap: 5,
        // paddingTop: 70,
    },

    contentContainer: {
        paddingHorizontal: 30,
    },

    successContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        gap: 10,
    },

    successTitle: {
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        width: "60%",
    },

    successSubTitleContainer: {},

    successSubTitle: {
        textAlign: "center",
        color: colors.greySecondaryShade,
    },
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

export default JobPosted;
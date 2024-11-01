import React from "react";
import colors from "../../src/helpers/colors";
import { Text } from "../../src/components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import PageHeader from "../../src/components/PageHeader";
import ButtonGroup from "../../src/components/ButtonGroup";
import { ImagePickerAsset } from "expo-image-picker";
import { addNewJob, Job, resetCurrentJob } from "@store/jobsSlice";
import useAppDispatch from "@hooks/useAppDispatch";

const JobSummary = () => {
    const { jobParam } = useLocalSearchParams();

    const newJob: Job = JSON.parse(decodeURIComponent(jobParam as string));
    const { media } = newJob;

    const DecodedImagesComponent = () => {
        return (
            <>
                {media.map((imageUri: ImagePickerAsset, index: number) => {
                    return <Image source={{ uri: imageUri.uri }} style={styles.uploadedImage} key={index} />;
                })}
            </>
        );
    };

    const handleJobSubmission = () => {
        router.push({
            pathname: "/JobPosted",
            params: { jobParam: encodeURIComponent(JSON.stringify(newJob)) },
        });
    };

    return (
        <View style={styles.container}>
            <PageHeader pageName="Summary" />
            <ScrollView style={styles.contentContainer}>
                <View style={styles.summaryTitleContainer}>
                    <View style={styles.summaryTitleSubContainer}>
                        <Text style={styles.summaryTitle}>Job Title</Text>
                        <Text style={styles.summarySubTitle}>{newJob.title}</Text>
                    </View>
                    <View style={styles.summaryEditContainer}>
                        <Text style={styles.editText}>Edit</Text>
                        <Ionicons name="pencil" />
                    </View>
                </View>
                <View style={styles.summaryTitleContainer}>
                    <View style={styles.summaryTitleSubContainer}>
                        <Text style={styles.summaryTitle}>Job Type</Text>
                        <Text style={styles.summarySubTitle}>{newJob.type}</Text>
                    </View>
                    <View style={styles.summaryEditContainer}>
                        <Text style={styles.editText}>Edit</Text>
                        <Ionicons name="pencil" />
                    </View>
                </View>
                <View style={styles.summaryTitleContainer}>
                    <View style={styles.summaryTitleSubContainer}>
                        <Text style={styles.summaryTitle}>Job Description</Text>
                        <Text style={styles.summarySubTitle}>{newJob.description}</Text>
                    </View>
                    <View style={styles.summaryEditContainer}>
                        <Text style={styles.editText}>Edit</Text>
                        <Ionicons name="pencil" />
                    </View>
                </View>
                <View style={styles.summaryTitleContainer}>
                    <View style={styles.summaryTitleSubContainer}>
                        <Text style={styles.summaryTitle}>Budget</Text>
                        <Text style={styles.summarySubTitle}>{newJob.budget}</Text>
                    </View>
                    <View style={styles.summaryEditContainer}>
                        <Text style={styles.editText}>Edit</Text>
                        <Ionicons name="pencil" />
                    </View>
                </View>
                <View style={[styles.summaryTitleContainer, { flexDirection: "column" }]}>
                    <Text style={styles.summaryTitle}>Media</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <DecodedImagesComponent />
                    </View>
                </View>
                <View style={styles.summaryTitleContainer}>
                    <View style={styles.summaryTitleSubContainer}>
                        <Text style={styles.summaryTitle}>Address</Text>
                        <Text style={styles.summarySubTitle}>{newJob.address}</Text>
                    </View>
                    <View style={styles.summaryEditContainer}>
                        <Text style={styles.editText}>Edit</Text>
                        <Ionicons name="pencil" />
                    </View>
                </View>
                <View style={{ marginBottom: 60 }}>
                    <ButtonGroup
                        paddingHorizontal={20}
                        positiveOption="Post Job"
                        positiveOptionBg={colors.greenShade}
                        // href={"/(customerPages)/JobPosted"}
                        onPress={handleJobSubmission}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        gap: 10,
    },

    contentContainer: {
        paddingTop: 20,
    },

    summaryTitleContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.greyBorder,
        paddingBottom: 10,
        paddingHorizontal: 30,
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 20,
    },

    summaryTitleSubContainer: {
        width: "80%",
    },

    summaryTitle: {
        fontSize: 20,
        fontWeight: "600",
    },

    summarySubTitle: {
        color: colors.greySecondaryShade,
    },

    editText: {
        textDecorationLine: "underline",
    },

    summaryEditContainer: {
        flexDirection: "row",
        gap: 5,
    },

    uploadedMediaContainer: {
        paddingHorizontal: 20,
        width: "100%",
        gap: 15,
        marginTop: 20,
        flexDirection: "row",
    },

    uploadedImage: {
        height: 100,
        width: 100,
        padding: "7%",
        alignItems: "center",
        borderRadius: 10,
    },
});

export default JobSummary;

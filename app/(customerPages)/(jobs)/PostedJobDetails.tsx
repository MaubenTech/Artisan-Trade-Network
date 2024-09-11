import React, { useContext, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TextInput } from "../../../src/components/Text";
import JobRating from "../../assets/images/JobRating.svg";
import PageHeader from "../../../src/components/PageHeader";
import ProgressBar from "../../../src/components/ProgressBar";
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform, Button } from "react-native";
import ButtonGroup from "../../../src/components/ButtonGroup";
import { UserTypeContext } from "context/UserTypeProvider";
import USER_TYPE from "constants/UserType";
import { JobStatus } from "../../(home)/Jobs";
import { BidStatus } from "../../(home)/Bids";
import BottomModal from "../../../src/components/JobComponents/PostedJobBottomModal";
import PostedJobProgressStatus from "../../../src/components/JobComponents/PostedJobProgressStatus";

const { width, height } = Dimensions.get("window");

const PostedJobDetails = () => {
    const { jobStage, bidStage }: { jobStage?: JobStatus; bidStage?: BidStatus } = useLocalSearchParams();
    console.log("Jobstage: " + jobStage);
    console.log("Bidstage: " + bidStage);
    const userType = useContext(UserTypeContext);
    return (
        <>
            <PageHeader pageName="Job" />
            <PostedJobProgressStatus jobStage={jobStage} bidStage={bidStage} />
            <View style={[styles.container]}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.summaryTitleContainer}>
                        <View style={styles.summaryTitleSubContainer}>
                            <Text style={styles.summaryTitle}>Job Title</Text>
                            <Text style={styles.summarySubTitle}>Need to Repair my toilet</Text>
                        </View>
                    </View>
                    <View style={styles.summaryTitleContainer}>
                        <View style={{ width: width * 0.4 }}>
                            <Text style={styles.summaryTitle}>Job Type</Text>
                            <Text style={styles.summarySubTitle}>Maintenance</Text>
                        </View>
                        <View style={{ width: width * 0.5 }}>
                            <Text style={styles.summaryTitle}>Distance</Text>
                            <Text style={styles.summarySubTitle}>
                                <Ionicons name="pin" color={"blue"} />
                                20km
                            </Text>
                        </View>
                    </View>
                    <View style={styles.summaryTitleContainer}>
                        <View style={styles.summaryTitleSubContainer}>
                            <Text style={styles.summaryTitle}>Job Description</Text>
                            <Text style={styles.summarySubTitle}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate aspernatur facere at minus nobis! Nisi, cumque eveniet facere repellat suscipit, voluptatum modi
                                tempore laboriosam possimus harum molestiae perspiciatis ipsam accusantium.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.summaryTitleContainer}>
                        <Text style={styles.summaryTitle}>Media</Text>
                        {/* <Image
						source={selectedImage.uri}
						key={selectedImage.assetId}
						style={styles.uploadedImage}
					/> */}
                    </View>

                    <View style={[styles.summaryTitleContainer, styles.lastSummaryTitleContainer]}>
                        {userType.type === USER_TYPE.NORMAL ? (
                            <View style={styles.summaryTitleSubContainer}>
                                <Text style={styles.summaryTitle}>Address</Text>
                                <Text style={styles.summarySubTitle}>Address</Text>
                            </View>
                        ) : (
                            <View style={styles.budgetContainer}>
                                <View>
                                    <Text style={styles.summaryTitle}>Budget</Text>
                                    <Text style={styles.summarySubTitle}>
                                        <Text style={{ fontWeight: "600", color: colors.brownShade }}>₦</Text> 50,000 - 70,000
                                    </Text>
                                </View>
                                {bidStage && bidStage !== "Initial" && bidStage !== "Bid" && (
                                    <View>
                                        <Text style={styles.summaryTitle}>Bid</Text>
                                        <Text style={styles.summarySubTitle}>
                                            <Text style={{ fontWeight: "600", color: colors.brownShade }}>₦</Text> 50,000
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </ScrollView>
                {jobStage &&
                    (Platform.OS === "ios" ? (
                        <BottomModal jobStage={jobStage} bidStage={bidStage} />
                    ) : (
                        <Shadow distance={5} style={{ borderRadius: 20 }}>
                            <BottomModal jobStage={jobStage} bidStage={bidStage} />
                        </Shadow>
                    ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 0,
    },
    spContainer: {},
    contentContainer: {
        // flex: 1,
    },

    summaryTitleContainer: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyBorder,
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    lastSummaryTitleContainer: {
        borderBottomWidth: 0,
    },

    summaryTitleSubContainer: {
        width: width * 0.8,
    },

    budgetContainer: {
        flexDirection: "row",
        gap: 60,
    },

    summaryTitle: {
        fontSize: 18,
        fontWeight: "600",
    },

    summarySubTitle: {
        fontSize: 13,
        color: colors.greySecondaryShade,
    },

    editText: {
        textDecorationLine: "underline",
    },

    uploadedMediaContainer: {
        // width: "100%",
        gap: 15,
        marginTop: 20,
        flexDirection: "row",
    },

    uploadedImage: {
        width: "30%",
        padding: "7%",
        alignItems: "center",
        height: 100,
        borderRadius: 10,
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    applicantContainer: {
        // backgroundColor: "#fff",
        padding: 20,
        // borderColor: "#94A3B1",
        // borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        // marginTop: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: width,
    },
    spApplicantContainer: {
        alignItems: "flex-start",
        paddingTop: 30,
    },
    spPendingStageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: "#888",
        marginBottom: 20,
        textAlign: "center",
    },
    spSubText: {
        marginBottom: 10,
        color: colors.brownShade,
    },
    bidInput: {
        borderWidth: 1,
        width: "100%",
        padding: 15,
        paddingLeft: 30,
        borderColor: colors.inputBorderColor,
        borderRadius: 15,
        backgroundColor: "#FBFCFD",
        marginBottom: 40,
    },
    bidInputFocused: {
        backgroundColor: "#fff",
        // color: "#000",
    },
    button: {
        backgroundColor: "#3498db",
        padding: 15,
        borderRadius: 10,
        width: width * 0.9,
        marginBottom: 20,
    },
    spPendingButton: {
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        marginTop: "4%",
    },
    rejectButton: {
        backgroundColor: "#EA4435",
    },
    approveButton: {
        backgroundColor: "#33A852",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    spPendingButtonText: {
        fontSize: undefined,
    },
});

export default PostedJobDetails;

import React from "react";
import { Link } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "../../../src/components/Text";
import JobRating from "../../assets/images/JobRating.svg";
import PageHeader from "../../../src/components/PageHeader";
import ProgressBar from "../../../src/components/ProgressBar";
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform } from "react-native";
import ButtonGroup from "../../../src/components/ButtonGroup";

const { width, height } = Dimensions.get("window");

const PostedJobDetails = () => {
    return (
        <>
            <PageHeader pageName="Job" />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View>
                        <ProgressBar status="Posted" />
                    </View>
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

                    <View style={styles.summaryTitleContainer}>
                        <View style={styles.summaryTitleSubContainer}>
                            <Text style={styles.summaryTitle}>Address</Text>
                            <Text style={styles.summarySubTitle}>Address</Text>
                        </View>
                    </View>
                </ScrollView>
                {Platform.OS === "ios" ? (
                    <View style={styles.applicantContainer}>
                        <Text style={styles.headerText}>10 Applicants</Text>
                        <Text style={styles.subText}>Click to view all applicants.</Text>
                        <ButtonGroup positiveOption="View All Applicants" href={"/PostedJobApplicants"} />
                    </View>
                ) : (
                    <Shadow distance={10} startColor="#000">
                        <View style={styles.applicantContainer}>
                            <Text style={styles.headerText}>10 Applicants</Text>
                            <Text style={styles.subText}>Click to view all applicants.</Text>
                            <Link style={styles.button} asChild href={"/PostedJobApplicants"}>
                                <TouchableOpacity>
                                    <Text style={styles.buttonText}>View all applicants</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </Shadow>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 40,
    },
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

    summaryTitleSubContainer: {
        width: width * 0.8,
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
        backgroundColor: "white",
        padding: 20,
        borderColor: colors.shadedMainColor,
        borderWidth: 1,
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
        elevation: 5,
        // position: "absolute",
        bottom: 0,
        width: width,
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
    button: {
        backgroundColor: "#3498db",
        padding: 15,
        borderRadius: 10,
        width: width * 0.9,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});

export default PostedJobDetails;

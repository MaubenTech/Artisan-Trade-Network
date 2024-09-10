import React from "react";
import { Link } from "expo-router";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "../../../src/components/Text";
import DropDown from "../../../src/components/DropDown";
import SearchBar from "../../../src/components/SearchBar";
import PageHeader from "../../../src/components/PageHeader";
import CustomKeyboardView from "../../../src/components/CustomKeyboardView";
import { View, StyleSheet, ScrollView, Pressable, TouchableOpacity } from "react-native";

const helpCenterOptions = [
    {
        optionIcon: <Ionicons name="rocket-outline" size={15} color={colors.mainColor} />,
        optionTitle: "Getting Started",
        optionPreview: "lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
        learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
    },
    {
        optionIcon: <Ionicons name="settings-outline" size={15} color={colors.mainColor} />,
        optionTitle: "Account Setting",
        optionPreview: "lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
        learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
    },
    {
        optionIcon: <Ionicons name="person-outline" size={15} color={colors.mainColor} />,
        optionTitle: "Profile Customization",
        optionPreview: "lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
        learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
    },
    {
        optionIcon: <Ionicons name="lock-open-outline" size={15} color={colors.mainColor} />,
        optionTitle: "Privacy Tips",
        optionPreview: "lorem ipsum dolor sit amet attis. Sed vitae est dignissim iaculis nisi pellentesque.",
        learnMoreIcon: <Ionicons name="arrow-forward" size={15} />,
    },
];

const HelpCenter = () => {
    return (
        <>
            <PageHeader pageName="Help Center" />
            <CustomKeyboardView style={styles.container}>
                <ScrollView contentContainerStyle={styles.subContainer}>
                    <View style={styles.searchSection}>
                        <Text style={styles.helpCenterIntro}>Explore our Help Center for answers to your questions and assistance with your experience.</Text>

                        <SearchBar />

                        <View style={styles.helpCenterOptions}>
                            {helpCenterOptions.map((helpCenterOption) => {
                                return (
                                    <>
                                        <Link style={styles.helpCenterOption} href={"#"} asChild key={helpCenterOption.optionTitle}>
                                            <TouchableOpacity>
                                                <View style={styles.optionIconContainer}>{helpCenterOption.optionIcon}</View>
                                                <Text style={styles.optionTitle}>{helpCenterOption.optionTitle}</Text>
                                                <Text style={styles.optionPreview}>{helpCenterOption.optionPreview}</Text>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        gap: 5,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text style={styles.learnMore}>Learn More</Text>
                                                    {helpCenterOption.learnMoreIcon}
                                                </View>
                                            </TouchableOpacity>
                                        </Link>
                                    </>
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.Header}>
                            <Text style={styles.HeaderTitle}>Frequently Asked Questions</Text>
                            <Text style={styles.HeaderSubTitle} numberOfLines={2}>
                                Lorem ipsum dolor sit amet, consectetur a attis. Sed vitae est{" "}
                            </Text>
                        </View>
                        <DropDown />
                    </View>
                    <View style={styles.section}>
                        <View style={styles.Header}>
                            <Text style={styles.HeaderTitle}>Didn't Find any Solution ?</Text>
                            <Text style={styles.HeaderSubTitle} numberOfLines={2}>
                                Lorem ipsum dolor sit amet, consectetur a attis. Sed vitae est{" "}
                            </Text>
                        </View>
                        <View style={styles.solutions}>
                            <View style={styles.solutionContainer}>
                                <View style={styles.solutionIconContainer}>
                                    <View style={styles.solutionIcon}>
                                        <Ionicons name="chatbox-ellipses-outline" style={styles.solutionMainIcon} />
                                    </View>
                                </View>
                                <View style={styles.solutionContent}>
                                    <Text style={{ fontSize: 18, fontWeight: "500" }}>Chat with us</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "300", width: "40%" }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis. Sed vitae
                                    </Text>
                                    <Link href={"#"} style={{ textDecorationLine: "underline" }}>
                                        Chat Now
                                    </Link>
                                </View>
                            </View>
                            <View style={styles.solutionContainer}>
                                <View style={styles.solutionIconContainer}>
                                    <View style={styles.solutionIcon}>
                                        <Ionicons name="call-outline" s style={styles.solutionMainIcon} />
                                    </View>
                                </View>
                                <View style={styles.solutionContent}>
                                    <Text style={{ fontSize: 18, fontWeight: "500" }}>Contact Us</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "300", width: "40%" }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed metus at est iaculis mattis. Sed vitae
                                    </Text>
                                    <Link href={"#"} style={{ textDecorationLine: "underline" }}>
                                        Call Now
                                    </Link>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </CustomKeyboardView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        gap: 40,
    },

    subContainer: {
        gap: 20,
        paddingBottom: 50,
    },

    searchSection: {
        paddingTop: 40,
        paddingHorizontal: 26,
        gap: 20,
    },

    helpCenterIntro: {
        fontWeight: "300",
    },

    helpCenterOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 19,
    },

    helpCenterOption: {
        borderColor: colors.inputBorderColor,
        borderWidth: 1,
        padding: 15,
        width: "47%",
        alignItems: "center",
        gap: 5,
    },

    optionIconContainer: {
        backgroundColor: colors.mainColorbg,
        padding: 10,
        borderRadius: 50,
    },

    optionTitle: {
        fontSize: 12,
    },

    optionPreview: {
        fontWeight: "200",
        fontSize: 10,
        textAlign: "center",
    },

    learnMore: {
        textAlign: "center",
    },

    section: {
        paddingHorizontal: 26,
        gap: 40,
    },

    Header: {
        gap: 7,
    },

    HeaderTitle: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20,
    },

    HeaderSubTitle: {
        paddingHorizontal: 50,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "300",
        fontSize: 10,
    },

    componentContainer: {
        gap: 10,
    },

    solutions: {
        gap: 15,
    },

    solutionContainer: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: colors.inputBorderColor,
        padding: 10,
        borderRadius: 5,
    },

    solutionIconContainer: {},

    solutionIcon: {
        backgroundColor: colors.mainColor,
        padding: 10,
        borderRadius: 50,
    },

    solutionMainIcon: {
        color: "white",
    },

    solutionContent: {
        gap: 10,
        paddingTop: 10,
    },
});

export default HelpCenter;

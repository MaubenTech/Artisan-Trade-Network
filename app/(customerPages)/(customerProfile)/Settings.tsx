import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "../../../src/components/Text";
import SearchBar from "../../../src/components/SearchBar";
import PageHeader from "../../../src/components/PageHeader";

const settingsTypes = [
    {
        sectionHeader: "General",
        sections: [
            {
                sectionIcon: <Ionicons name="lock-open-outline" />,
                sectionTitle: "Security",
            },
            {
                sectionIcon: <Ionicons name="globe-outline" />,
                sectionTitle: "Language",
            },
            {
                sectionIcon: <Ionicons name="contrast-outline" />,
                sectionTitle: "Theme",
            },
            {
                sectionIcon: <Ionicons name="notifications-outline" />,
                sectionTitle: "Notification",
            },
        ],
    },
    {
        sectionHeader: "App",
        sections: [
            {
                sectionIcon: <Ionicons name="shield-checkmark-outline" />,
                sectionTitle: "Privacy Policy",
            },
            {
                sectionIcon: <Ionicons name="contract-outline" />,
                sectionTitle: "Terms and Conditions",
            },
            {
                sectionIcon: <Ionicons name="thumbs-up-outline" />,
                sectionTitle: "Rate Us",
            },
            {
                sectionIcon: <Ionicons name="share-outline" />,
                sectionTitle: "Share with friends",
            },
            {
                sectionIcon: <Ionicons name="information-circle-outline" />,
                sectionTitle: "About App",
            },
        ],
    },
];

const Settings = () => {
    return (
        <>
            <PageHeader pageName="Settings" />
            <ScrollView style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <SearchBar />
                </View>
                <View style={styles.settingsByTypeContainer}>
                    {settingsTypes.map((settingsType) => {
                        return (
                            <View style={styles.settingsByType}>
                                <View>
                                    <Text style={styles.sectionHeaderText}>{settingsType.sectionHeader}</Text>
                                </View>
                                <View style={styles.settingBySectionsContainer}>
                                    {settingsType.sections.map((section) => {
                                        return (
                                            <View style={styles.settingBySection}>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        gap: 10,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            backgroundColor: colors.inputBorderColor,
                                                            padding: 8,
                                                            borderRadius: 50,
                                                        }}
                                                    >
                                                        {section.sectionIcon}
                                                    </View>

                                                    <Text>{section.sectionTitle}</Text>
                                                </View>
                                                <Ionicons name="chevron-forward-outline" />
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        gap: 25,
        paddingTop: 30,
    },

    searchBarContainer: {
        paddingHorizontal: 30,
        marginBottom: 30,
    },

    settingsByTypeContainer: {
        gap: 20,
        paddingHorizontal: 30,
        marginBottom: 60,
    },

    settingsByType: {
        gap: 10,
    },

    sectionHeaderText: {
        fontSize: 18,
        fontWeight: "500",
    },

    settingBySectionsContainer: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.inputBorderColor,
        padding: 10,
    },

    settingBySection: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});

export default Settings;

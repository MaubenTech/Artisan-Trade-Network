import React from "react";
import { Text, TextInput } from "@components/Text";
import { compactStyles } from "@helpers/styles";
import PageHeader from "@components/PageHeader";
import { Dimensions, StyleSheet, View } from "react-native";
import JobRating from "../../../assets/images/JobRating.svg";
import ProfilePicture from "../../../assets/components/chatList/images/profilePicture.svg";
import colors from "@helpers/colors";
import CustomKeyboardView from "@components/CustomKeyboardView";
import ButtonGroup from "@components/ButtonGroup";

const { width } = Dimensions.get("window");

const ReviewJobApplicant = () => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);

    return (
        <>
            <PageHeader pageName="Job" />
            <CustomKeyboardView style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <ProfilePicture width={150} height={150} />
                </View>
                <View style={styles.componentContainer}>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>Drew Berry</Text>
                    <Text style={{ fontSize: 12, fontWeight: "300" }}>Let's rate your service provider</Text>
                    <JobRating width={200} height={50} />
                </View>
                <View style={styles.componentContainer}>
                    <TextInput placeholder="Leave a review for your service provider" style={styles.reviewInput} multiline />
                </View>
                <View style={[styles.componentContainer, {}]}>
                    <ButtonGroup positiveOption="Submit" href={"/PostedJobDetails"} positiveOptionStyle={{ width: width * 0.8 }} />
                </View>
            </CustomKeyboardView>
        </>
    );
};

export default ReviewJobApplicant;

const generalStyles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        paddingHorizontal: 30,
        // alignItems: "center",
        paddingVertical: 40,
        gap: 20,
    },
    componentContainer: {
        alignItems: "center",
    },
    reviewInput: {
        width: width * 0.8,
        borderWidth: 1,
        borderColor: colors.inputBorderColor,
        borderRadius: 5,
        fontSize: 12,
        padding: 10,
        height: 100,
        paddingHorizontal: 20,
        textAlign: "left",
    },
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

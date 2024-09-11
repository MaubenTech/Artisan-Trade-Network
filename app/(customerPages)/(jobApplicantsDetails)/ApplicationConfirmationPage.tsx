import React from "react";
import colors from "@helpers/colors";
import { Text } from "@components/Text";
import PageHeader from "@components/PageHeader";
import { compactStyles } from "@helpers/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Question from "../../../assets/icons/paymentMethods/question.svg";
import SuccessIndicator from "../../../assets/icons/paymentMethods/success-blip.svg";
import PaymentSuccessful from "../../../assets/icons/paymentMethods/paymentSuccessful.svg";
import { Link } from "expo-router";
import ButtonGroup from "@components/ButtonGroup";

const { width } = Dimensions.get("window");
const ApplicationConfirmationPage = () => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);

    return (
        <>
            <PageHeader />
            <View style={styles.container}>
                <View style={[styles.componentContainer, { gap: 10 }]}>
                    <PaymentSuccessful />
                    <Text style={styles.paymentHeader}>Payment Success!</Text>
                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                        <Text style={{ fontWeight: "600", fontSize: 20 }}>₦</Text>
                        <Text style={{ fontWeight: "400", fontSize: 20 }}>50,000</Text>
                    </View>
                </View>
                <View style={[styles.componentContainer, { alignItems: "flex-start", paddingHorizontal: 20, paddingVertical: 20, gap: 10 }]}>
                    <Text style={[styles.paymentHeader, { fontWeight: "400" }]}>Payment Details</Text>
                    <View style={styles.paymentDetail}>
                        <Text style={[styles.paymentDetailKey, styles.paymentTexts]}>Ref Number</Text>
                        <Text style={styles.paymentTexts}>0003939922</Text>
                    </View>
                    <View style={styles.paymentDetail}>
                        <Text style={[styles.paymentDetailKey, styles.paymentTexts]}>Payment Status</Text>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <SuccessIndicator />
                            <Text style={styles.paymentTexts}>Success</Text>
                        </View>
                    </View>
                    <View style={styles.paymentDetail}>
                        <Text style={[styles.paymentDetailKey, styles.paymentTexts]}>Payment Time</Text>
                        <Text style={styles.paymentTexts}>21/04/2024, 12:23</Text>
                    </View>
                </View>
                <View style={[styles.componentContainer, { flexDirection: "row", paddingHorizontal: 20, gap: 10, paddingVertical: 20 }]}>
                    <View style={{ borderRadius: 50, borderWidth: 1, padding: 5, width: 30, height: 30, alignItems: "center", borderColor: "#434343" }}>
                        <Question />
                    </View>
                    <Link style={{ flexDirection: "row", alignItems: "center", gap: 10 }} href={"/HelpCenter"} asChild>
                        <TouchableOpacity>
                            <View>
                                <Text style={styles.paymentTexts}>Trouble with your payment ?</Text>
                                <Text style={[styles.paymentTexts, { fontSize: 9 }]}>Let us know on our help center now</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-forward" size={25} color={"#434343"} />
                            </View>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            <ButtonGroup href={"/ReviewJobApplicant"} positiveOption="Job Page" paddingHorizontal={20} />
        </>
    );
};

export default ApplicationConfirmationPage;

const generalStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 30,
        paddingHorizontal: 20,
        gap: 30,
        flex: 1,
    },

    componentContainer: {
        borderWidth: 2,
        borderColor: colors.inputBorderColor,
        borderRadius: 10,
        alignItems: "center",
        width: width * 0.8,
        paddingVertical: 50,
    },

    paymentHeader: {
        fontSize: 16,
        fontWeight: "300",
    },

    paymentDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    paymentDetailKey: {
        flex: 1,
    },

    paymentTexts: {
        color: "#434343",
        fontSize: 12,
    },
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

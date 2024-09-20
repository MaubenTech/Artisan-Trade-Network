import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import ButtonGroup from "@components/ButtonGroup";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactDetails() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={require("@assets/images/logo.png")} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}> Contact Details</Text>
                <Text style={styles.subHeader}>Please enter your contact details.</Text>
            </View>
            <View style={[styles.detailsContainer, { flex: 1 }]}>
                <View style={styles.subDetailsContainer}>
                    <Text style={styles.text}>Address</Text>
                    <TextInput style={styles.placeholder} placeholder="Enter Your Address" />
                </View>
                <View style={styles.subDetailsContainer}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.placeholder} placeholder="example@gmail.com" />
                </View>
                <View style={styles.subDetailsContainer}>
                    <Text style={styles.text}>Phone Number</Text>
                    <TextInput style={styles.placeholder} placeholder="+234" />
                </View>
            </View>
            <ButtonGroup href={"/OtpVerification"} positiveOption="Proceed" paddingHorizontal={20} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        gap: 30,
    },
    logo: {
        paddingTop: 20,
        flexDirection: "column",
        alignItems: "center",
    },
    headerContainer: {
        paddingLeft: 25,
        gap: 5,
    },
    header: {
        fontSize: 23,
        fontWeight: "bold",
    },
    subHeader: {},
    detailsContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        gap: 20,
    },
    subDetailsContainer: {
        gap: 8,
    },
    text: {
        color: "black",
        fontSize: 17,
    },
    placeholder: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "3%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "2%",
        alignItems: "center",
        // height: "27%",
        position: "relative",
    },
    loginButtonContainer: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "3%",
        paddingBottom: "5%",
        paddingLeft: "7%",
        paddingRight: "7%",
        marginLeft: "7%",
        marginRight: "7%",
        alignItems: "center",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
    },
});

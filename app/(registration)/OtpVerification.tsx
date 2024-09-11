import { View, Text } from 'react-native'
import {
    StyleSheet,
    Image,
    TextInput,
    Pressable,
    Button,
} from "react-native";
import { Link, Redirect } from "expo-router";
import React from 'react'
import ButtonGroup from '@components/ButtonGroup';

const OtpVerification = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require("../../assets/images/logo.png")} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>OTP Verification</Text>
                <Text style={styles.subHeader}>Please enter your Verification code sent to</Text>
                <Text style={styles.email}>nonsorob@yahoo.com</Text>
            </View>
            <View style={styles.otpContainer}>
                <TextInput keyboardType='numeric' style={styles.otpCode}></TextInput>
                <TextInput keyboardType='numeric' style={styles.otpCode}></TextInput>
                <TextInput keyboardType='numeric' style={styles.otpCode}></TextInput>
                <TextInput keyboardType='numeric' style={styles.otpCode}></TextInput>
                <TextInput keyboardType='numeric' style={styles.otpCode}></TextInput>
                <TextInput keyboardType='numeric' style={styles.otpCode}></TextInput>
            </View>
            <View style={styles.codeInfo}>
                <Text style={styles.codeQuestion}>Didn't receive an OTP code?</Text>
                <Text style={styles.resend}>Resend Code</Text>
            </View>
            <ButtonGroup href={"/Password"} positiveOption="Verify & Proceed" paddingHorizontal={20} />
        </View>
    )
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
        // paddingLeft: 25,
        alignItems: "center",
        gap: 5,
    },
    header: {
        fontSize: 23,
        fontWeight: "bold",
    },
    subHeader: {
    },
    email: {
        fontWeight: "bold",
    },
    otpContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    otpCode: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "3%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "2%",
        alignItems: "center",
        position: "relative",
        width: "13%",
    },
    codeInfo: {
        marginTop: "10%",
        alignItems: "center",
    },
    codeQuestion: {
        fontSize: 16,
    },
    resend: {
        marginTop: "8%",
        fontWeight: "bold",
        fontSize: 16,
    },
    // loginButtonContainer: {
    //     borderWidth: 1,
    //     borderRadius: 10,
    //     paddingTop: "3%",
    //     paddingBottom: "5%",
    //     paddingLeft: "7%",
    //     paddingRight: "7%",
    //     marginLeft: "7%",
    //     marginRight: "7%",
    //     marginTop: "35%",
    //     alignItems: "center",
    //     borderColor: "#52A2f2",
    //     backgroundColor: "#52A2f2",
    //     position: "relative",
    // },
})
export default OtpVerification
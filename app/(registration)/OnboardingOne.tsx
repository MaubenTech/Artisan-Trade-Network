import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    Button,
} from "react-native";
import React from 'react'
import { Link } from "expo-router";

export default function OnboardingOne() {
    return (
        <View style={styles.container} >
            <View style={styles.logoContainer}>
                {/* <View style={styles.logo}> */}
                <Image source={require("../../assets/images/logo.png")} />
                <View>
                    <Text style={styles.artisan}>Artisan</Text>
                    <Text>Trade Network</Text>
                </View>
                {/* </View> */}
            </View>
            <View style={styles.textContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTextOne}>Welcome to Artisan</Text>
                    <Text style={styles.welcometextTwo}>Trades Network</Text>
                </View>
                <Text style={styles.text}>Empowering artisans to effortlessly allow them to gain</Text>
                <Text>more access and visbility to customers</Text>
                <View style={styles.navigationContainer}>
                    <View style={styles.activeNav}></View>
                    <View style={styles.barOne}></View>
                    <View style={styles.barTwo}></View>
                    <View style={styles.barThree}></View>
                    <View style={styles.barFour}></View>
                </View>
            </View>
            <View style={styles.Navigation}>
                <Pressable>
                    <Link
                        style={styles.skip}

                        href={'/(registration)/OnboardingTwo'}
                    >
                        <Text>Skip</Text>
                    </Link>
                </Pressable>
                <Pressable>
                    <Link
                        style={styles.next}

                        href={'/(registration)/OnboardingTwo'}
                    >
                        <Text>Next</Text>
                    </Link>
                </Pressable>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: '55%',
        backgroundColor: "#8f8f8f",
    },
    logoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: '7%',
    },
    textContainer: {
        alignItems: "center",
        display: 'flex',
        paddingTop: '80%',

    },
    welcomeContainer: {

    },
    welcomeTextOne: {
        fontSize: 33,
    },
    welcometextTwo: {
        fontSize: 33,
        marginLeft: "9%",
    },
    text: {
        marginTop: "3%",
    },
    navigationContainer: {
        flexDirection: "row",
    },
    artisan: {
        fontWeight: "800",
    },
    activeNav: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingLeft: "5%",
        paddingRight: "5%",
        marginTop: "10%",
        alignItems: "center",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
    },
    barOne: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingLeft: "1%",
        paddingRight: "1%",
        marginLeft: "0.3%",
        marginTop: "10%",
        alignItems: "center",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
    },
    barTwo: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingLeft: "1%",
        paddingRight: "1%",
        marginLeft: "0.3%",
        marginTop: "10%",
        alignItems: "center",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
    },
    barThree: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingLeft: "1%",
        paddingRight: "1%",
        marginLeft: "0.3%",
        marginTop: "10%",
        alignItems: "center",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
    },
    barFour: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingLeft: "1%",
        paddingRight: "1%",
        marginLeft: "0.3%",
        marginTop: "10%",
        alignItems: "center",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
    },
    Navigation: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "12%",
    },
    skip: {
        borderWidth: 0.5,
        paddingTop: "3%",
        paddingBottom: "15%",
        paddingLeft: "10%",
        paddingRight: "10%",
        marginLeft: "0.3%",
        alignItems: "center",
        borderColor: "black",
        position: "relative",
        borderRadius: 5,
    },
    next: {
        borderWidth: 0.5,
        paddingTop: "3%",
        paddingBottom: "15%",
        paddingLeft: "10%",
        paddingRight: "10%",
        marginLeft: "0.3%",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
        color: "white",
        borderRadius: 5,
    }

})
import { StyleSheet, View, Image, TextInput, Pressable, Button } from "react-native";
import React, { useState } from "react";
import { Text } from "@components/Text";
import { Link } from "expo-router";
import ButtonGroup from "@components/ButtonGroup";

export default function OnboardingScreen() {
    const [currentPage, setCurrentPage] = useState(0);

    const [finalObPage, setFinalObPage] = useState(false);

    const handleNextOnboardingPage = () => {
        if (currentPage < onboardingData.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setFinalObPage((prevState) => !prevState);
            console.log("Complete");
        }
    };
    const onboardingData = [
        {
            title: "Welcome to Artisan Trades Network",
            subtitle: "Empowering artisans to effortlessly allow them to gain more access and visibility to customers",
            buttonText: "Next",
        },
        {
            title: "Discover Powerful Features",
            subtitle: "Bidding feature: Bid for jobs at will. Real-time chat with clients to get jobs done. E-Wallet: Get paid and accept payments.",
            buttonText: "Next",
        },
        {
            title: "How It Works",
            subtitle: "Make bids easily on jobs posted by customers. Accept jobs, get customer feedback, and more!",
            buttonText: "Next",
        },
        {
            title: "Customization and Personalization",
            subtitle: "Profile setup, customize your profile and preferences. Set notification settings and more.",
            buttonText: "Next",
        },
        {
            title: "Ready to Boost Your Productivity?",
            subtitle: "Explore the dashboard and get started!",
            buttonText: "Get Started",
        },
    ];

    return (
        <View style={styles.container}>
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
                    <Text style={styles.welcomeText}>{onboardingData[currentPage].title}</Text>
                    <Text style={styles.welcomeTextDesc}>{onboardingData[currentPage].subtitle}</Text>
                </View>
                <View style={styles.navigationContainer}>
                    <View style={styles.activeNav}></View>
                    <View style={styles.barOne}></View>
                    <View style={styles.barTwo}></View>
                    <View style={styles.barThree}></View>
                    <View style={styles.barFour}></View>
                </View>
            </View>
            {finalObPage ? (
                <ButtonGroup href={"/ProfilePageSP"} positiveOption="Proceed" paddingHorizontal={20} />
            ) : (
                <ButtonGroup onPress={handleNextOnboardingPage} positiveOption="Next" negativeOption="Skip" paddingHorizontal={20} reverse />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "55%",
        backgroundColor: "#8f8f8f",
    },
    logoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "7%",
    },
    textContainer: {
        alignItems: "center",
        display: "flex",
        paddingTop: "80%",
    },
    welcomeContainer: {
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontWeight: "600",
        fontSize: 30,
        textAlign: "center",
    },
    welcomeTextDesc: {
        textAlign: "center",
        fontSize: 12,
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
    },
});

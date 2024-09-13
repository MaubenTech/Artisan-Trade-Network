import { View, Text } from "react-native";
import { StyleSheet, Image, TextInput, Pressable, Button } from "react-native";
import { Link, Redirect } from "expo-router";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import ButtonGroup from "@components/ButtonGroup";
import { SafeAreaView } from "react-native-safe-area-context";

const Password = () => {
    const [isSelected, setSelection] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={require("../../assets/images/logo.png")} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Password</Text>
                <Text style={styles.subHeader}>Please enter your desired Password</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.subDetailsContainer}>
                    <Text style={styles.text}>Password</Text>
                    <TextInput style={styles.placeholder} placeholder="Enter Your Password" />
                </View>
                <View style={styles.subDetailsContainer}>
                    <Text style={styles.text}>Comfirm Password</Text>
                    <TextInput style={styles.placeholder} placeholder="Enter Your Password" />
                </View>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                // style={styles.checkbox}
                />
                <Text>Yes, I agree to the Terms & Condition</Text>
            </View>
            <ButtonGroup href={"/OnboardingScreen"} positiveOption="Proceed" paddingHorizontal={20} />
        </SafeAreaView>
    );
};

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
        gap: 5,
        marginLeft: "10%",
    },
    header: {
        fontSize: 23,
        fontWeight: "bold",
    },
    subHeader: {},
    detailsContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        gap: 35,
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
    checkboxContainer: {
        flexDirection: "row",
        marginTop: "8%",
        marginLeft: "10%",
        gap: 10,
    },

});
export default Password;

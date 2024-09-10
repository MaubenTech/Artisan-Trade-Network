import { View, Text } from "react-native";
import { StyleSheet, Image, TextInput, Pressable, Button } from "react-native";
import { Link, Redirect } from "expo-router";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

const Password = () => {
    const [isSelected, setSelection] = useState(false);
    return (
        <View style={styles.container}>
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
            <View style={styles.loginButtonContainer}>
                <Link
                    style={[
                        {
                            color: "white",
                            textAlign: "center",
                            fontSize: 18,
                            // fontWeight: "800",
                            letterSpacing: 1,
                            alignSelf: "center",
                        },
                    ]}
                    // href={"(home)/Home"}
                    href={"/(registration)/OnboardingScreen"}
                    asChild
                >
                    <Pressable>
                        <Text>Proceed</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
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
    loginButtonContainer: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: "3%",
        paddingBottom: "5%",
        paddingLeft: "7%",
        paddingRight: "7%",
        marginLeft: "7%",
        marginRight: "7%",
        marginTop: "25%",
        alignItems: "center",
        borderColor: "#52A2f2",
        backgroundColor: "#52A2f2",
        position: "relative",
    },
});
export default Password;

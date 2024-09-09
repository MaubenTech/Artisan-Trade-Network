import React from "react";
import { Text } from "./Text";
import colors from "../helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function CustomTabBar({ onPress, isFocused, text, iconName }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    flex: isFocused ? 1 : 0.6,
                    alignItems: "center",
                    justifyContent: "center",
                },
            ]}
            activeOpacity={1}
            accessibilityState={isFocused ? { selected: true } : {}}
        >
            <View style={[styles.iconContainer, isFocused ? styles.activeContainer : styles.inactiveIconContainer]}>
                <Ionicons name={iconName} color={colors.whiteShade} size={25} />
                {isFocused ? <Text style={{ ...styles.iconText }}>{text}</Text> : <></>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        flexDirection: "column",
        // justifyContent: "space-between",
        borderRadius: 50,
        backgroundColor: colors.brownShade,
        position: "absolute",
        bottom: 30,
        marginRight: 30,
        marginLeft: 30,
        paddingBottom: 0,
    },
    tabBarItemStyle: {
        flex: 1,
        borderRadius: 50,
        paddingLeft: 30,
        paddingRight: 30,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        padding: 12.5,
    },
    activeContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        padding: 10,
        paddingBottom: 12.5,
        paddingTop: 12.5,
        width: width * 0.3,
        backgroundColor: colors.mainColor,
    },
    inactiveIconContainer: {
        backgroundColor: colors.greySecondaryShade,
    },
    iconText: {
        color: colors.whiteShade,
    },
});

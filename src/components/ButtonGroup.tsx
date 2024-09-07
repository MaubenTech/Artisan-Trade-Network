import React from "react";
import { Text } from "./Text";
import colors from "../helpers/colors";
import { Link } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { View, StyleSheet, TouchableOpacity, ColorValue, DimensionValue } from "react-native";

type ButtonOptionParams = {
    negative: string;
    positive: string;
};

export default function ButtonGroup({
    negativeOption,
    positiveOption,
    positiveOptionBg,
    negativeOptionBg,
    isNop,
    href,
    paddingHorizontal,
}: {
    negativeOption?: string;
    positiveOption: string;
    positiveOptionBg?: ColorValue;
    negativeOptionBg?: ColorValue;
    isNop?: boolean;
    href?: ExpoRouter.Href;
    paddingHorizontal?: DimensionValue;
}) {
    return (
        <View
            style={
                isNop
                    ? [styles.container, { paddingHorizontal }]
                    : [
                          {
                              paddingHorizontal: paddingHorizontal,
                              alignItems: "center",
                          },
                      ]
            }
        >
            <TouchableOpacity style={isNop ? [styles.option, styles.negativeOption] : { width: 0 }}>
                <Text>{negativeOption}</Text>
            </TouchableOpacity>
            <Link
                href={href || "#"}
                asChild
                style={
                    isNop
                        ? {
                              ...styles.option,
                              ...styles.positiveOption,
                          }
                        : {
                              ...styles.option,
                              ...styles.positiveOption,
                              width: "90%",
                              backgroundColor: positiveOptionBg || colors.mainColor,
                          }
                }
            >
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "white", textAlign: "center" }}>{positiveOption}</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        marginTop: 20,
        flexDirection: "row",
        marginBottom: 30,
        justifyContent: "space-between",
    },

    childContainer: {},

    option: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        width: "40%",
        alignItems: "center",
        textAlign: "center",
    },

    negativeOption: {
        borderColor: colors.buttonBorderColor,
    },

    positiveOption: {
        borderWidth: 0,
        backgroundColor: colors.mainColor,
    },
});

import React from "react";
import { Text } from "./Text";
import colors from "../helpers/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, StyleSheet, Touchable, TouchableOpacity, ViewStyle, ImageStyle, TextStyle } from "react-native";

type OptionParams = {
    label: string;
    value: string;
};

export default function RadioGroup({
    options,
    selectedOption,
    onChanged,
    style,
}: {
    options: OptionParams[];
    selectedOption: string;
    onChanged: React.Dispatch<React.SetStateAction<string>>;
    style?: ViewStyle | TextStyle | ImageStyle;
}) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.radioOptionContainer}>
                {options.map((option: OptionParams) => {
                    let activeOption = selectedOption == option.value;
                    return (
                        <TouchableOpacity style={activeOption ? [styles.radioOption, styles.activeRadioOption] : styles.radioOption} key={option.value} onPress={() => onChanged(option.value)}>
                            <MaterialIcons name={activeOption ? "radio-button-on" : "radio-button-off"} color={colors.inputBorderColor} size={25} />
                            <Text style={styles.radioOptionLabel}>{option.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    radioOptionContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        // flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 5,
    },

    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "50%",
        backgroundColor: colors.grey2,
        borderColor: colors.inputBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        padding: "6%",
    },

    activeRadioOption: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "50%",
        backgroundColor: colors.mainColor,
        borderColor: colors.inputBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        padding: "6%",
    },

    radioOptionLabel: {
        fontSize: 14,
    },
});

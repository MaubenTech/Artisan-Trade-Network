import React, { useState } from "react";
import colors from "@helpers/colors";
import { SvgProps } from "react-native-svg";
import { compactStyles } from "@helpers/styles";
import PageHeader from "@components/PageHeader";
import ButtonGroup from "@components/ButtonGroup";
import { Text, TextInput } from "@components/Text";
import CustomKeyboardView from "@components/CustomKeyboardView";
import TaskTime from "../../../assets/icons/cancelJob/TaskTime.svg";
import WrongTask from "../../../assets/icons/cancelJob/WrongTask.svg";
import NoResponse from "../../../assets/icons/cancelJob/NoResponse.svg";
import MindChange from "../../../assets/icons/cancelJob/MindChange.svg";
import OtherReason from "../../../assets/icons/cancelJob/OtherReason.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AccidentalRequest from "../../../assets/icons/cancelJob/AccidentalRequest.svg";
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from "react-native";

type ReasonType = {
    reasonLogo: React.ComponentType<SvgProps>;
    reason: string;
};

const Reason: React.FC<ReasonType> = ({ reason, reasonLogo: ReasonLogo }) => {
    return (
        <>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", paddingVertical: 1, paddingHorizontal: 20 }}>
                <View style={{ alignItems: "center", width: "10%" }}>
                    <ReasonLogo />
                </View>
                <Text style={{ textAlign: "center" }}>{reason}</Text>
            </View>
        </>
    );
};

const cancelReasons: ReasonType[] = [
    {
        reasonLogo: NoResponse,
        reason: "The artisan didn't respond",
    },
    {
        reasonLogo: MindChange,
        reason: "Change in mind ?",
    },
    {
        reasonLogo: TaskTime,
        reason: "Task taking too long",
    },
    {
        reasonLogo: WrongTask,
        reason: "Selected wrong task",
    },
    {
        reasonLogo: AccidentalRequest,
        reason: "Requested by Accident",
    },
    {
        reasonLogo: OtherReason,
        reason: "Other Reason",
    },
];

const CancelJob = () => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);

    const [showInput, setShowInput] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handlePress = (reason: string) => {
        if (reason === "Other Reason") {
            setShowInput(true);
        } else {
            setShowInput(false);
        }
    };

    return (
        <KeyboardAwareScrollView>
            <PageHeader pageName="Cancel Job" />
            <View style={styles.container}>
                <View style={styles.componentContainer}>
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>Why do you want to cancel ?</Text>
                        <Text style={{ fontSize: 12 }}>Optional</Text>
                    </View>
                </View>
                <View style={{ gap: 20, marginTop: 20 }}>
                    {cancelReasons.map(({ reasonLogo, reason }, index) => {
                        return (
                            <>
                                <TouchableOpacity key={index} onPress={() => handlePress(reason)}>
                                    <Reason key={reason} reasonLogo={reasonLogo} reason={reason} />
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: colors.greyBorder, borderBottomWidth: 1, marginTop: -2 }}></View>
                            </>
                        );
                    })}
                </View>
                <View style={styles.componentContainer}>
                    {showInput && <TextInput placeholder="Please specify" value={inputValue} onChangeText={setInputValue} style={styles.specifiedReason} multiline />}
                </View>
                <View>
                    <ButtonGroup positiveOption="Cancel" href={"/"} paddingHorizontal={20} />
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default CancelJob;

const generalStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        gap: 10,
    },

    componentContainer: {
        paddingHorizontal: 30,
    },

    specifiedReason: {
        borderColor: colors.inputBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        padding: 10,
        paddingHorizontal: 20,
        height: 100,
        textAlign: "left",
        textAlignVertical: "top",
    },
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

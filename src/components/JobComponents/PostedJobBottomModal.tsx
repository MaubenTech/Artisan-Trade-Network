import ButtonGroup from "@components/ButtonGroup";
import USER_TYPE from "constants/UserType";
import { UserTypeContext } from "context/UserTypeProvider";
import { Link } from "expo-router";
import { useState, useContext } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Platform } from "react-native";
import { BidStatus } from "../../../app/(home)/Bids";
import { JobStatus } from "../../../app/(home)/Jobs";
import { Text } from "@components/Text";
import colors from "@helpers/colors";
import { Shadow } from "react-native-shadow-2";

const { width, height } = Dimensions.get("window");

const Posted = () => {
    return Platform.OS === "ios" ? (
        <View style={styles.applicantContainer}>
            <Text style={styles.headerText}>10 Applicants</Text>
            <Text style={styles.subText}>Click to view all applicants.</Text>
            <ButtonGroup positiveOption="View All Applicants" href={"/PostedJobApplicants"} />
        </View>
    ) : (
        <Shadow distance={10} startColor="#000">
            <View style={styles.applicantContainer}>
                <Text style={styles.headerText}>10 Applicants</Text>
                <Text style={styles.subText}>Click to view all applicants.</Text>
                <Link style={styles.button} asChild href={"/PostedJobApplicants"}>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>View all applicants</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </Shadow>
    );
};

const Active = () => {};

const Completed = () => {};

const SPPending = () => {
    return (
        <View style={[styles.applicantContainer, styles.spApplicantContainer, styles.spPendingStageContainer]}>
            <Link style={[styles.button, styles.spPendingButton, styles.rejectButton]} asChild href={"/BidSubmitted"}>
                <TouchableOpacity>
                    <Text style={[styles.buttonText, styles.spPendingButtonText]}>Reject</Text>
                </TouchableOpacity>
            </Link>
            <Link style={[styles.button, styles.spPendingButton, styles.approveButton]} asChild href={"/BidSubmitted"}>
                <TouchableOpacity>
                    <Text style={[styles.buttonText, styles.spPendingButtonText]}>Approve</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const SPDefault = () => {
    const [inputFocused, setInputFocused] = useState(false);
    return (
        <View style={[styles.applicantContainer, styles.spApplicantContainer]}>
            <Text style={[styles.subText, styles.spSubText]}>Amount</Text>
            <TextInput
                style={[styles.bidInput, inputFocused ? styles.bidInputFocused : {}]}
                placeholder="Input your bid"
                placeholderTextColor={"#8F8F8F"}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                keyboardType="numeric"
            />
            <Link style={styles.button} asChild href={"/BidSubmitted"}>
                <TouchableOpacity>
                    <Text style={styles.buttonText}>Bid</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const SPActive = () => {
    return (
        <View style={[styles.applicantContainer, styles.spApplicantContainer]}>
            <ButtonGroup
                containerStyle={{ flexDirection: "column", width: "100%", gap: 20 }}
                positiveOptionStyle={{ width: "100%" }}
                negativeOptionStyle={{ width: "100%" }}
                href={""}
                negativeHref={""}
                positiveOption="Open Chat"
                negativeOption="Cancel Job"
            />
        </View>
    );
};

const SPCompleted = () => {};

const BottomModal = ({ jobStage, bidStage }: { jobStage?: JobStatus; bidStage?: BidStatus }) => {
    const userType = useContext(UserTypeContext);

    if (userType.type === USER_TYPE.NORMAL) {
        switch (jobStage) {
            case "Posted":
                return <Posted />;
        }
    }

    if (userType.type === USER_TYPE.SERVICE_PROVIDER) {
        switch (bidStage) {
            case "Initial":
                return <SPDefault />;
            case "Bid":
                return <></>;
            case "Pending":
                return <SPPending />;
            case "Active":
                return <SPActive />;
            case "Completed":
                return <></>;
            default:
                return <SPDefault />;
        }
    }

    if (userType.type == USER_TYPE.NORMAL) {
        switch (jobStage) {
            case "Posted":
                return <Posted />;
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 40,
    },
    spContainer: {
        paddingTop: 0,
    },
    contentContainer: {
        // flex: 1,
    },

    summaryTitleContainer: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyBorder,
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    lastSummaryTitleContainer: {
        borderBottomWidth: 0,
    },

    summaryTitleSubContainer: {
        width: width * 0.8,
    },

    summaryTitle: {
        fontSize: 18,
        fontWeight: "600",
    },

    summarySubTitle: {
        fontSize: 13,
        color: colors.greySecondaryShade,
    },

    editText: {
        textDecorationLine: "underline",
    },

    uploadedMediaContainer: {
        // width: "100%",
        gap: 15,
        marginTop: 20,
        flexDirection: "row",
    },

    uploadedImage: {
        width: "30%",
        padding: "7%",
        alignItems: "center",
        height: 100,
        borderRadius: 10,
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    applicantContainer: {
        // backgroundColor: "#fff",
        padding: 20,
        borderColor: "#94A3B1",
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        // marginTop: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: width,
    },
    spApplicantContainer: {
        alignItems: "flex-start",
        paddingTop: 30,
    },
    spPendingStageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: "#888",
        marginBottom: 20,
        textAlign: "center",
    },
    spSubText: {
        marginBottom: 10,
        color: colors.brownShade,
    },
    bidInput: {
        borderWidth: 1,
        width: "100%",
        padding: 15,
        paddingLeft: 30,
        borderColor: colors.inputBorderColor,
        borderRadius: 15,
        backgroundColor: "#FBFCFD",
        marginBottom: 40,
    },
    bidInputFocused: {
        backgroundColor: "#fff",
        // color: "#000",
    },
    button: {
        backgroundColor: "#3498db",
        padding: 15,
        borderRadius: 10,
        width: width * 0.9,
        marginBottom: 20,
    },
    spPendingButton: {
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        marginTop: "4%",
    },
    rejectButton: {
        backgroundColor: "#EA4435",
    },
    approveButton: {
        backgroundColor: "#33A852",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    spPendingButtonText: {
        fontSize: undefined,
    },
});

export default BottomModal;

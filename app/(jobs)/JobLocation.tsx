import * as Location from "expo-location";
import colors from "../../src/helpers/colors";
import { compactStyles } from "@helpers/styles";
import React, { useEffect, useState } from "react";
import { Text, TextInput } from "@components/Text";
import PageHeader from "../../src/components/PageHeader";
import ButtonGroup from "../../src/components/ButtonGroup";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import SearchBar from "@components/SearchBar";
import CustomKeyboardView from "@components/CustomKeyboardView";

type Location = Region & {
    longitude: number;
    latitude: number;
    longitudeDelta: number;
    latitudeDelta: number;
};

const { width, height } = Dimensions.get("window");

const JobLocation = () => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);

    const { jobParam } = useLocalSearchParams();
    const newJob = JSON.parse(decodeURIComponent(jobParam as string));

    const router = useRouter();

    // console.log(newJob);

    // const { images } = useGlobalSearchParams<{ images: string }>();

    // const decodedImages: ImagePickerAsset[] = images
    // 	? JSON.parse(decodeURIComponent(images))
    // 	: [];

    // const encodedImages = encodeURIComponent(JSON.stringify(decodedImages));

    const [location, setLocation] = useState<Location>({
        longitude: 0,
        latitude: 0,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421,
    });

    const [currentAddress, setCurrentAddress] = useState<string>("");

    const [currentPosition, setCurrentPosition] = useState<string>("");

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            console.log("Please grant permission");
            return;
        }

        const { coords } = await Location.getCurrentPositionAsync();

        const { longitude, latitude } = coords;

        setLocation({
            longitude: coords.longitude,
            latitude: coords.latitude,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0421,
        });

        let generateAddress = await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude,
        });

        for (let item of generateAddress) {
            let address = `${item.city} ${item.region}`;
            // console.log(address);
            // setCurrentAddress(address);
            setCurrentPosition(address);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleProceed = () => {
        // Add the location and address to newJob
        const updatedJob = {
            ...newJob,
            address: currentAddress,
            // address: currentAddress, // You can also add any additional fields if needed
        };

        // Navigate to JobSummary with the updated job
        router.push({
            pathname: "/JobSummary",
            params: { jobParam: encodeURIComponent(JSON.stringify(updatedJob)) },
        });
    };

    return (
        <CustomKeyboardView>
            <PageHeader pageName="Location" />
            <View style={styles.contentContainer}>
                <View style={styles.mapContainer}>
                    <SearchBar style={styles.searchBar} placeholder="Input your address" />
                    <MapView
                        style={styles.map}
                        region={location}
                        initialRegion={location}
                        loadingEnabled
                        userInterfaceStyle="dark"
                        showsUserLocation
                        followsUserLocation
                    >
                        <Marker
                            draggable
                            coordinate={location}
                            onDragEnd={(event) => {
                                let coordinate = { ...event.nativeEvent.coordinate };
                                setLocation({
                                    ...location,
                                    latitude: coordinate.latitude,
                                    longitude: coordinate.longitude,
                                });
                            }}
                        />
                    </MapView>
                </View>
                <ScrollView style={styles.addressContainer}>
                    <View style={styles.modalTitleContainer}>
                        <Text style={styles.modalTitle}>Address</Text>
                        <View style={styles.fullAddress}>
                            <Text>{currentPosition}</Text>
                        </View>
                    </View>
                    <View style={styles.addedInformationContainer}>
                        <Text style={styles.addedInfoTitle}>Added Information</Text>
                        <TextInput
                            style={styles.addedInformation}
                            multiline
                            numberOfLines={10}
                            value={currentAddress}
                            onChangeText={setCurrentAddress}
                        />
                    </View>
                    <ButtonGroup
                        negativeOption="Cancel"
                        positiveOption="Proceed"
                        // href={{ pathname: "/JobSummary", params: newJob }}
                        onPress={handleProceed}
                        reverse
                    />
                </ScrollView>
            </View>
        </CustomKeyboardView>
    );
};

export default JobLocation;

const generalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // gap: 10,
    },

    contentContainer: {
        height: "100%",
        width: "100%",
        position: "relative",
    },

    mapContainer: {
        width: "100%",
        height: "50%",
        position: "relative",
    },

    inputAddressContainer: {
        position: "absolute",
        width: "90%",
    },

    map: {
        height: "100%",
        // width: "100%",
        // position: "absolute",
        zIndex: 0,
    },

    modalTitleContainer: {
        gap: 10,
    },

    modalTitle: {
        fontWeight: "600",
        fontSize: 20,
    },

    fullAddress: {},

    addedInformationContainer: {
        gap: 10,
    },

    addedInfoTitle: {
        fontSize: 16,
        fontWeight: "600",
    },

    addedInformation: {
        textAlignVertical: "top",
        height: 110,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        borderColor: colors.inputBorderColor,
    },
});

const androidStyles = StyleSheet.create({
    searchBar: {
        position: "absolute",
        top: "14%",
        zIndex: 1,
        backgroundColor: "#fff",
        alignSelf: "center",
        width: width * 0.9,
        padding: 10,
    },

    addressContainer: {
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: colors.greySecondaryShade,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        top: "45%",
        backgroundColor: colors.white,
        // width: "100%",
        // height: "100%",
        zIndex: 1,
        paddingVertical: 20,
        gap: 10,
    },
});

const iosStyles = StyleSheet.create({
    searchBar: {
        position: "absolute",
        top: "5%",
        zIndex: 1,
        backgroundColor: "#fff",
        alignSelf: "center",
        width: width * 0.9,
    },

    addressContainer: {
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: colors.greySecondaryShade,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        top: "45%",
        backgroundColor: colors.white,
        // width: "100%",
        // height: "100%",
        zIndex: 1,
        paddingVertical: 20,
        gap: 10,
    },
});

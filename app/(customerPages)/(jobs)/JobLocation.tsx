import * as Location from "expo-location";
import colors from "../../../src/helpers/colors";
import React, { useEffect, useState } from "react";
import { Text } from "../../../src/components/Text";
import PageHeader from "../../../src/components/PageHeader";
import ButtonGroup from "../../../src/components/ButtonGroup";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, TextInput, Image } from "react-native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { ImagePickerAsset } from "expo-image-picker";

type Location = Region & {
	longitude: number;
	latitude: number;
	longitudeDelta: number;
	latitudeDelta: number;
};

export default function JobLocation() {
	const { images } = useGlobalSearchParams<{ images: string }>();
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
			console.log(`${item.postalCode}`);
			let address = `${item.city} ${item.region}`;
			// console.log(address);
			setCurrentAddress(address);
		}
	};

	useEffect(() => {
		getUserLocation();
	}, []);
	return (
		<View style={styles.container}>
			<PageHeader pageName="Location" />
			<View style={styles.contentContainer}>
				<View style={styles.mapContainer}>
					<View style={styles.inputAddressContainer}>
						<TextInput />
					</View>
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
				<View style={styles.addressContainer}>
					<View style={styles.modalTitleContainer}>
						<Text style={styles.modalTitle}>Address</Text>
						<View style={styles.fullAddress}>
							<Text>{currentAddress}</Text>
						</View>
					</View>
					<View style={styles.addedInformationContainer}>
						<Text style={styles.addedInfoTitle}>Added Information</Text>
						<TextInput
							style={styles.addedInformation}
							multiline
							numberOfLines={10}
						/>
					</View>
					<ButtonGroup
						negativeOption="Cancel"
						positiveOption="Proceed"
						href={`/(customerPages)/JobSummary?images=${images}`}
						reverse
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		// gap: 10,
	},

	contentContainer: {
		flexDirection: "column",
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
		width: "100%",
		position: "absolute",
		zIndex: 0,
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
		width: "100%",
		height: "100%",
		zIndex: 1,
		paddingVertical: 20,
		gap: 10,
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

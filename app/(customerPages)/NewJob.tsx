import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import colors from "../../src/helpers/colors";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import RadioGroup from "../../src/components/RadioGroup";
import PageHeader from "../../src/components/PageHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonGroup from "../../src/components/ButtonGroup";
import * as DocumentPicker from "expo-document-picker";
import ButtonOptions from "../../src/components/ButtonOptions";
import { launchImageLibraryAsync } from "expo-image-picker";
import UploadImages from "../../assets/images/uploadImages.svg";

const { width, height } = Dimensions.get("window");

export default function NewJob() {
	const [jobType, setJobType] = useState<string>("Installation");
	const [selectedImages, setSelectedImages] = useState<
		ImagePicker.ImagePickerAsset[]
	>([]);
	const [selectedBudget, setSelectedBudet] = useState<string | number>(5000);

	const uploadMedia = async () => {
		let options: {} = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			// allowsEditing: true,
			allowsMultipleSelection: true,
			selectionLimit: 3,
			aspect: [1, 1],
			quality: 1,
		};

		let result = await ImagePicker.launchImageLibraryAsync(options);

		if (!result.canceled) {
			console.log("Results: \n", result, "\n");
			setSelectedImages(result.assets);
			console.log("selected Images: \n", selectedImages);
		}
	};

	const budgetOptions = [
		{
			buttonTitle: 5000,
			secondButtonTitle: 20000,
		},
		{
			buttonTitle: 20000,
			secondButtonTitle: 50000,
		},
		{
			buttonTitle: 50000,
			secondButtonTitle: 200000,
		},
		{
			buttonTitle: 200000,
			secondButtonTitle: "More",
		},
	];
	return (
		<View style={styles.container}>
			<PageHeader pageName="New Job" />
			<SafeAreaView style={styles.newJobContent}>
				<ScrollView>
					<View style={styles.jobFormContainer}>
						<Text>Job Title</Text>
						<TextInput style={styles.jobFormInput} />
					</View>
					<View style={styles.jobFormContainer}>
						<Text>Job Type</Text>
						<RadioGroup
							options={[
								{ label: "Installation", value: "Installation" },
								{ label: "Maintenance", value: "Maintenance" },
							]}
							selectedOption={jobType}
							onChanged={setJobType}
						/>
					</View>
					<View style={styles.jobFormContainer}>
						<Text>Job Description</Text>
						<TextInput
							style={[
								styles.jobFormInput,
								{ textAlignVertical: "top", height: 150 },
							]}
							multiline
							numberOfLines={10}
						/>
					</View>
					<View style={styles.jobFormContainer}>
						<Text>Upload Media</Text>
						<TouchableOpacity
							style={styles.uploadButton}
							onPress={() => uploadMedia()}
						>
							<Ionicons
								name="cloud-upload-outline"
								color={colors.greySecondaryShade}
								size={20}
							/>
							<Text>Upload</Text>
						</TouchableOpacity>
						<View style={styles.uploadedMediaContainer}>
							{selectedImages.length > 0 ? (
								selectedImages.map((selectedImage) => {
									return (
										<Image
											source={selectedImage.uri}
											key={selectedImage.assetId}
											style={styles.uploadedImage}
										/>
									);
								})
							) : (
								<>
									<TouchableOpacity
										style={[
											{
												backgroundColor: colors.grey2,
												justifyContent: "center",
											},
											styles.uploadedImage,
										]}
										onPress={() => uploadMedia()}
									>
										<UploadImages />
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											{
												backgroundColor: colors.grey2,
												justifyContent: "center",
											},
											styles.uploadedImage,
										]}
										onPress={() => uploadMedia()}
									>
										<UploadImages />
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											{
												backgroundColor: colors.grey2,
												justifyContent: "center",
											},
											styles.uploadedImage,
										]}
										onPress={() => uploadMedia()}
									>
										<UploadImages />
									</TouchableOpacity>
								</>
							)}
						</View>
					</View>
					<View style={styles.jobFormContainer}>
						<Text>Budget</Text>
						<ButtonOptions
							buttonOptions={budgetOptions}
							selectedOption={selectedBudget}
							onOptionChanged={setSelectedBudet}
						/>
					</View>
					<ButtonGroup
						positiveOption="Proceed"
						negativeOption="Cancel"
						href={"/(customerPages)/JobLocation"}
						paddingHorizontal={30}
						isNop
					/>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		gap: 10,
		paddingTop: 70,
	},

	newJobContent: {
		paddingHorizontal: 10,
		paddingBottom: 50,
		marginBottom: 50,
	},

	jobFormContainer: {
		width: width,
		paddingHorizontal: 30,
		gap: 5,
		marginTop: 20,
	},

	jobFormInput: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		width: "100%",
		borderColor: colors.inputBorderColor,
	},

	uploadButton: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		borderColor: colors.inputBorderColor,
		borderWidth: 1,
		borderRadius: 10,
		width: "35%",
		padding: "4%",
	},

	uploadedMediaContainer: {
		width: "100%",
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
});
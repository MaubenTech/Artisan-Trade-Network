import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import colors from "../helpers/colors";
import React, { useState } from "react";
import RadioGroup from "../components/RadioGroup";
import PageHeader from "../components/PageHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";

const { width, height } = Dimensions.get("window");

export default function AvailableJobs() {
	const [jobType, setJobType] = useState<string>("Installation");

	const uploadMedia = async () => {
		try {
			const media = await DocumentPicker.getDocumentAsync({
				type: "image",
			});
		} catch (error) {
			console.log("Error while reporting file: ", error);
		}
	};
	return (
		<View style={styles.container}>
			<PageHeader pageName="New Jobs" />
			<View style={styles.newJobContent}>
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
					<View style={styles.uploadedMediaContainer}></View>
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
		gap: 10,
		paddingTop: 100,
	},

	newJobContent: {
		paddingHorizontal: 10,
	},

	jobFormContainer: {
		width: width,
		paddingHorizontal: 40,
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

	uploadedMediaContainer: {},
});

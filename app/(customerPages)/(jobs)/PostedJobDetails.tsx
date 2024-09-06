import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import PageHeader from "../../../src/components/PageHeader";
import JobRating from "../../assets/images/JobRating.svg";
import ProfilePicture from "../../assets/components/chatList/images/profilePicture.svg";
import ProgressBar from "../../../src/components/ProgressBar";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

const PostedJobDetails = () => {
  return (
    <>
      <PageHeader pageName="Job" />
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <ProgressBar status="Posted" />
          </View>
          <View style={styles.summaryTitleContainer}>
            <View style={styles.summaryTitleSubContainer}>
              <Text style={styles.summaryTitle}>Job Title</Text>
              <Text style={styles.summarySubTitle}>Need to Repair my toilet</Text>
            </View>
          </View>
          <View style={styles.summaryTitleContainer}>
            <View style={{ width: width * 0.4 }}>
              <Text style={styles.summaryTitle}>Job Type</Text>
              <Text style={styles.summarySubTitle}>Maintenance</Text>
            </View>
            <View style={{ width: width * 0.5 }}>
              <Text style={styles.summaryTitle}>Distance</Text>
              <Text style={styles.summarySubTitle}>
                <Ionicons name="pin" color={"blue"} />
                20km
              </Text>
            </View>
          </View>
          <View style={styles.summaryTitleContainer}>
            <View style={styles.summaryTitleSubContainer}>
              <Text style={styles.summaryTitle}>Job Description</Text>
              <Text style={styles.summarySubTitle}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate aspernatur facere at minus nobis! Nisi, cumque eveniet facere repellat suscipit, voluptatum modi tempore laboriosam
                possimus harum molestiae perspiciatis ipsam accusantium.
              </Text>
            </View>
          </View>
          <View style={styles.summaryTitleContainer}>
            <Text style={styles.summaryTitle}>Media</Text>
            {/* <Image
						source={selectedImage.uri}
						key={selectedImage.assetId}
						style={styles.uploadedImage}
					/> */}
          </View>

          <View style={styles.summaryTitleContainer}>
            <View style={styles.summaryTitleSubContainer}>
              <Text style={styles.summaryTitle}>Address</Text>
              <Text style={styles.summarySubTitle}>Address</Text>
            </View>
          </View>
          {/* <View style={styles.summaryTitleContainer}>
						<View style={styles.ratingContainer}>
							<ProfilePicture width={40} />
							<View>
								<Text>Drew Berry</Text>
							</View>
						</View>
					</View> */}
        </ScrollView>
        <View style={styles.applicantContainer}>
          <Text style={styles.headerText}>10 Applicants</Text>
          <Text style={styles.subText}>Click to view all applicants.</Text>
          <Link style={styles.button} asChild href={"/(jobs)/PostedJobApplicants"}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>View all applicants</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  contentContainer: {},

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

  summaryTitleSubContainer: {
    width: width * 0.8,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  summarySubTitle: {
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
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    width: width,
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
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    width: width * 0.9,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PostedJobDetails;

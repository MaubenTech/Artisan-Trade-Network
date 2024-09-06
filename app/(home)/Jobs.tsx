import { Link } from "expo-router";
import React, { useState } from "react";
import colors from "../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "../../src/components/SearchBar";
import MenuHeader from "../../src/components/MenuHeader";
import JobPicture from "../../assets/images/JobPicture.svg";
import FilterComponent from "../../src/components/FilterComponent";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import PostedJobs from "../../src/components/JobComponents/PostedJobs";

const { width, height } = Dimensions.get("window");

export default function Jobs() {
  const [filterOption, setFilterOption] = useState<string | number>("All");

  const filterOptions = [
    {
      optionTitle: "All",
    },
    {
      optionTitle: "Posted",
    },
    {
      optionTitle: "Active",
    },
    {
      optionTitle: "Completed",
    },
  ];

  const jobs = [{}];

  return (
    <>
      <View style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
        <MenuHeader />
      </View>
      <View style={styles.container}>
        <View style={styles.componentContainer}>
          <SearchBar />
        </View>
        <View style={styles.componentContainer}>
          <FilterComponent filterOptions={filterOptions} selectedOption={filterOption} onOptionChanged={setFilterOption} />
        </View>
        <View style={{ gap: 20 }}>
          <PostedJobs />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    gap: 20,
    // paddingHorizontal: 20,
  },

  componentContainer: {
    paddingHorizontal: 20,
  },
});

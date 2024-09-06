import { View, Text, StyleSheet, TextInput, StyleProp, RegisteredStyle, ViewStyle } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../helpers/colors";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface SearchBarProps {
  style?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({ style }) => {
  return (
    <View style={[styles.searchBarContainer, style]}>
      <Ionicons name="search" size={20} color={colors.brownShade} />
      <TextInput style={styles.searchBar} placeholder="Search your keyword"></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    borderColor: colors.inputBorderColor,
    borderWidth: 1,
    padding: 15,
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  searchBar: {},
});

export default SearchBar;

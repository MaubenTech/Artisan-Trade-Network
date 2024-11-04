import React, { useState } from "react";
import ChatPreview from "@components/chatComponents/ChatPreview";
import SearchBar from "@components/SearchBar";
import MenuHeader from "@components/MenuHeader";
import FilterComponent from "@components/FilterComponent";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { compactStyles } from "@helpers/styles";
import colors from "@helpers/colors";

const filterOptions = [
	{
		optionTitle: "All",
	},
	{
		optionTitle: "Active",
	},
	{
		optionTitle: "Closed Jobs",
	},
];

export default function Chat() {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const [filterOption, setFilterOption] = useState<string | number>("All");
	const [users, setUsers] = useState([1, 2]);
	return (
		<View style={styles.container}>
			<View style={styles.menuContainer}>
				<MenuHeader />
			</View>
			<SafeAreaView style={styles.contentContainer}>
				<View style={styles.searchBarContainer}>
					<SearchBar />
				</View>
				<View style={styles.searchFilterContainer}>
					<FilterComponent filterOptions={filterOptions} selectedOption={filterOption} onOptionChanged={setFilterOption} />
				</View>
				<View>
					<FlatList
						data={users}
						contentContainerStyle={styles.chatListContainer}
						renderItem={({ item, index }) => <ChatPreview item={item} />}
						// keyExtractor={(item) => Math.random()}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		gap: 50,
	},

	menuContainer: {
		paddingHorizontal: 20,
	},

	searchBarContainer: {
		paddingHorizontal: 20,
	},

	contentContainer: {
		flex: 1,
	},

	searchFilterContainer: {
		marginTop: 20,
		paddingHorizontal: 20,
	},

	chatListContainer: {},
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

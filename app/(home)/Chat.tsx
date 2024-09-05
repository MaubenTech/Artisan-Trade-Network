import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import MenuHeader from "../../src/components/MenuHeader";
import FilterComponent from "../../src/components/FilterComponent";
import { useNavigation, useRouter } from "expo-router";
import ChatList from "../(chatPage)/ChatList";
import SearchBar from "../../src/components/SearchBar";

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
	const router = useRouter();

	const navigation = useNavigation();
	const [filterOption, setFilterOption] = useState<string | number>("All");
	const [users, setUsers] = useState([1, 2]);
	return (
		<View style={styles.container}>
			<MenuHeader />
			<SafeAreaView style={styles.contentContainer}>
				<SearchBar />
				<View style={styles.searchFilterContainer}>
					<FilterComponent
						filterOptions={filterOptions}
						selectedOption={filterOption}
						onOptionChanged={setFilterOption}
					/>
				</View>
				<View>
					<FlatList
						data={users}
						contentContainerStyle={styles.chatListContainer}
						renderItem={({ item, index }) => <ChatList item={item} />}
						// keyExtractor={(item) => Math.random()}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// alignItems: "center",
		paddingHorizontal: 20,
		gap: 50,
	},

	contentContainer: {
		flex: 1,
		// gap: 20,
	},

	searchFilterContainer: {
		marginTop: 20,
		// backgroundColor: "#f0f",
	},

	searchFilters: {},

	chatListContainer: {
		// marginTop: 15,
		// gap: 20,
	},
});

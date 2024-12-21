import React, { useState } from "react";
import ChatPreview from "@components/chatComponents/ChatPreview";
import SearchBar from "@components/SearchBar";
import MenuHeader from "@components/MenuHeader";
import FilterComponent from "@components/FilterComponent";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { compactStyles } from "@helpers/styles";
import colors from "@helpers/colors";
import useAppSelector from "@hooks/useAppSelector";
import { selectUsers } from "@store/usersSlice";
import { selectCurrentUser } from "@store/authSlice";
import NoActiveChat from "@assets/images/NoActiveChat.svg";
import { Text } from "@components/Text";
import ButtonGroup from "@components/ButtonGroup";
import { selectMessages } from "@store/chatSlice";

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

const Chat = () => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const allUsers = useAppSelector(selectUsers);
	const currentUser = useAppSelector(selectCurrentUser);
	const [filterOption, setFilterOption] = useState<string | number>("All");
	const [users, setUsers] = useState([]);

	const filteredUsers = allUsers.filter((user) => user._id !== currentUser._id);
	const getMessages = useAppSelector(selectMessages);
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
				{getMessages.length < 1 ? (
					<View></View>
				) : (
					<View>
						<FlatList
							data={filteredUsers}
							contentContainerStyle={styles.chatListContainer}
							renderItem={({ item, index }) => <ChatPreview item={item} chatPartnerID={item._id} />}
							// keyExtractor={(item) => Math.random()}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				)}
			</SafeAreaView>
		</View>
	);
};

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		gap: 50,
	},

	noChatContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		gap: 20,
		// flex: 1,
		height: "60%",
	},

	noChatImage: {
		gap: 10,
	},

	noChatCaption: {
		fontWeight: "700",
		fontSize: 24,
	},

	noChatText: {
		textAlign: "center",
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

export default Chat;

import React, { useState } from "react";
import ChatList from "../(chatPage)/ChatList";
import { useNavigation, useRouter } from "expo-router";
import SearchBar from "../../src/components/SearchBar";
import MenuHeader from "../../src/components/MenuHeader";
import FilterComponent from "../../src/components/FilterComponent";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";

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
            <View style={{ paddingHorizontal: 20 }}>
                <MenuHeader />
            </View>
            <SafeAreaView style={styles.contentContainer}>
                <View style={[{ paddingHorizontal: 20 }]}>
                    <SearchBar />
                </View>
                <View style={[styles.searchFilterContainer, { paddingHorizontal: 20 }]}>
                    <FilterComponent filterOptions={filterOptions} selectedOption={filterOption} onOptionChanged={setFilterOption} />
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
        // paddingHorizontal: 20,
        gap: 50,
    },

    contentContainer: {
        flex: 1,
        gap: 20,
    },

    searchFilterContainer: {},

    searchFilters: {},

    chatListContainer: {
        marginTop: 15,
        gap: 20,
    },
});

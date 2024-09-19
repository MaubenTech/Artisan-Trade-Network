import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import { Stack, useNavigation, useRootNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Layout() {
    const rootNavigation = useNavigation();
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="SignUp"

            />
        </Stack>
    );
}
// export default Stack;

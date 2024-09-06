import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import ProfilePicture from "../../../assets/components/chatList/images/profilePicture.svg";
import { router, useRouter } from "expo-router";
import colors from "../../../src/helpers/colors";
import { Text } from "../../../src/components/Text";

const { width, height } = Dimensions.get("window");

const ChatList = ({ item }: { item: number }) => {
  const openChatRoom = () => {
    router.navigate({ pathname: "/ChatRoom" });
  };

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: colors.greyBorder, paddingHorizontal: 20, paddingVertical: 5 }}>
      <TouchableOpacity style={styles.chat} onPress={openChatRoom}>
        <View style={styles.profilePictureContainer}>
          <ProfilePicture />
        </View>
        <View style={styles.chatPreviewContainer}>
          <View style={styles.chatPreviewDetail}>
            <Text style={styles.sender}>Drew Berry</Text>
            <Text style={styles.chatTime}>12:20pm</Text>
          </View>
          <View style={{ width: width * 0.7 }}>
            <Text style={styles.chatPreview} numberOfLines={2} ellipsizeMode="tail">
              Hello Nonso, Please can you still make it today?
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profilePictureContainer: {},

  chatPreviewContainer: {
    gap: 4,
  },

  sender: {
    fontWeight: "700",
    fontSize: 18,
  },

  chatPreviewDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chatTime: {
    color: colors.greySecondaryShade,
  },

  chatPreview: {
    flexWrap: "wrap",
    width: "90%",
  },
});

export default ChatList;

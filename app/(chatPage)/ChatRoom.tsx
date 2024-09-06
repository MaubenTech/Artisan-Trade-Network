import React, { useState } from "react";
import colors from "../../src/helpers/colors";
import ChatHeader from "../../src/components/ChatHeader";
import { View, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../src/components/CustomKeyboardView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "../../src/components/Text";

export default function ChatRoom() {
  const router = useRouter();

  const [inputStart, setInputStart] = useState(false);

  const [message, setMessage] = useState<string>("");

  return (
    <CustomKeyboardView>
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <View style={styles.container}>
          <View>
            <ChatHeader router={router} />
            <View style={styles.pageHeaderContainerBorder}></View>
          </View>
          <View style={styles.chatContainer}>
            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <Text>Today</Text>
              </View>
            </View>
            <View style={styles.messageSentBubble}>
              <View style={styles.messageSent}>
                <Text style={styles.messageSentText}>Hello Daniel, Please can you still make it today?</Text>
              </View>
              <Text style={styles.messageTime}>12:20</Text>
            </View>
            <View
              style={[
                styles.messageReceivedBubble,
                {
                  marginTop: Platform.OS === "ios" ? 130 : 140,
                },
              ]}
            >
              <View style={styles.messageReceived}>
                <Text style={styles.messageSentReceived}>Yes I will, I am currently finishing up a job but will head to your axis in an hour time.</Text>
              </View>
              <Text style={styles.receivedMessageTime}>12:20</Text>
            </View>
          </View>
        </View>
        <View style={styles.chatActions}>
          <View style={styles.chatActionIcon}>
            <Ionicons name="add" size={20} />
          </View>
          <View style={styles.textMessage}>
            <TextInput
              style={styles.textMessageInput}
              placeholder="Write Something Here"
              numberOfLines={5}
              multiline={true}
              value={message}
              onChangeText={(message) => {
                setMessage(message);
                message.length < 1 ? setInputStart(false) : setInputStart(true);
              }}
            />
          </View>
          <View style={styles.chatActionIcon}>
            <Ionicons name="camera-outline" size={20} />
          </View>
          <View style={styles.chatActionIcon}>{inputStart ? <Ionicons name="send" size={20} /> : <Ionicons name="mic-outline" size={20} />}</View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 20,
  },

  pageHeaderContainerBorder: {
    borderBottomWidth: 3,
    borderStyle: "solid",
    borderColor: colors.whiteShade,
    shadowOpacity: 3,
    shadowColor: "#E0E0E0",
    shadowOffset: { width: 0, height: -1 },
  },

  chatContainer: {
    paddingHorizontal: 20,
    position: "relative",
    // backgroundColor: "#f0f",
  },

  dateContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  date: {
    backgroundColor: colors.inputBorderColor,
    paddingVertical: 5,
    borderRadius: 30,
    width: 90,
    textAlign: "center",
    alignItems: "center",
  },

  messageSentBubble: {
    backgroundColor: colors.mainColor,
    padding: 15,
    borderRadius: 10,
    width: "75%",
    marginTop: 50,
    position: "absolute",
    right: 20,
  },

  messageSent: {},

  messageSentText: {
    color: colors.white,
  },

  messageReceivedBubble: {
    backgroundColor: colors.chatBubbleSecondary,
    padding: 15,
    borderRadius: 10,
    width: "75%",
    position: "absolute",
    top: 20,
    left: 20,
  },

  messageReceived: {},

  messageSentReceived: {
    fontWeight: "300",
  },

  messageTime: {
    color: colors.white,
    alignSelf: "flex-end",
    fontSize: 12,
  },

  receivedMessageTime: {
    alignSelf: "flex-end",
    fontWeight: "200",
    fontSize: 12,
  },

  chatActions: {
    // backgroundColor: "#ff0",
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.inputBorderColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // height: "15%",
    paddingVertical: 40,
  },

  textMessage: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.greyBorder,
    backgroundColor: colors.grey2,
    width: "65%",
  },

  textMessageInput: {
    height: 30,
    paddingLeft: 20,
    paddingRight: 10,
  },

  chatActionIcon: {
    backgroundColor: colors.grey2,
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
  },
});

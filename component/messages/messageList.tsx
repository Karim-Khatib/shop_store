import { getAllMessages } from "@/api/messages";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import uuid from "react-native-uuid";

import socket from "@/api/socket";
import { useAuth } from "@/hooks/auth_provider";
import { MassageType } from "@/hooks/types";
import LoadingComponent from "../core/loading";
import MessageTileComponent from "./messageTileComponent";
import SendMessageButton from "./sendMessageButton";

type MessageListProps = {
  secondUserId: string;
};
export default function MessageListComponent({
  props,
}: {
  props: MessageListProps;
}) {
  const [messages, setMessages] = useState<MassageType[]>([]);
  const authProvider = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getAllMessages(props.secondUserId);
        setMessages(response.results || []);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();

    socket.emit("join", authProvider?.user?.id, props.secondUserId);
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [message, ...prev]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [authProvider?.user?.id, props.secondUserId]);

  const sendMessage = useCallback(
    (message:string) => {
      const localId = uuid.v4();
      socket.emit("sendMessage", {
        senderId: authProvider?.user?.id,
        receiverId: props.secondUserId,
        text: message,
        localId,
      });
    },
    [authProvider?.user?.id, props.secondUserId]
  );

  const sortedMessages = useMemo(() => {
    return messages.sort(
      (a, b) =>
        new Date(a.createdAt ?? 0).getTime() -
        new Date(b.createdAt ?? 0).getTime()
    );
  }, [messages]);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"height"}
      keyboardVerticalOffset={110}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <View style={{ flex: 1, height: "100%" }}>
          <FlatList
            inverted
            data={sortedMessages}
            renderItem={({ item, index }) => (
              <MessageTileComponent key={`${item.id}${index}`} message={item} />
            )}
          />
          {/* <ScrollView >
          {provider.data.results?.map((message: MassageType, index) => {
            return <MessageTileComponent key={index} message={message} />;
          })}
        </ScrollView> */}
          <SendMessageButton
            secondeUser={props.secondUserId}
            onSubmit={sendMessage}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

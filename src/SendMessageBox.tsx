import { Box, Button, Input } from "@chakra-ui/react";
import Filter from "bad-words";
import firebase from "firebase/app";
import "firebase/firestore";
import React from "react";
import { ChatMessageProps } from "./ChatMessage";
const filter = new Filter();

interface SendMessageBoxProps {
  messages: ChatMessageProps[];
  user: firebase.User | null | undefined;
  isLoggedIn: boolean;
}

const SendMessageBox: React.FC<SendMessageBoxProps> = ({
  messages,
  setMessages,
  user,
  isLoggedIn,
}) => {
  const [newMessage, setNewMessage] = React.useState<string>("");
  const sendMessage: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!user || newMessage.trim().length === 0) {
      return;
    }
    await firebase
      .firestore()
      .collection("messages")
      .add({
        name: user.displayName || "Anonymous",
        src: user.photoURL || "",
        message: filter.clean(newMessage).trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setNewMessage("");
  };
  return (
    <form onSubmit={sendMessage}>
      <Box mt="4" display="flex">
        <Input
          border="1px"
          borderRadius="0"
          borderRight="0"
          placeholder="Write your message here..."
          onChange={(e) => {
            console.log(e.target.value);
            return setNewMessage(e.target.value);
          }}
          value={newMessage}
          disabled={!isLoggedIn}
        />
        <Button type="submit" borderRadius="0" disabled={!isLoggedIn}>
          Send
        </Button>
      </Box>
    </form>
  );
};
export default SendMessageBox;

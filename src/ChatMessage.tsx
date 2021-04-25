import { Avatar, AvatarProps, Box, Text } from "@chakra-ui/react";
import Filter from "bad-words";
import React from "react";

const filter = new Filter();

export interface ChatMessageProps extends AvatarProps {
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ name, src, message }) => {
  return (
    <Box w="100%" display="flex" gridGap="16px">
      <Avatar name={name} src={src} />
      {/* <SkeletonText mt="4" noOfLines={2} spacing="4" /> */}
      <Box width="100%">
        <Text fontSize="md" align="left" fontWeight="bold">
          {name}
        </Text>
        <Text fontSize="md" align="left">
          {filter.clean(message).trim()}
        </Text>
      </Box>
    </Box>
  );
};

export default ChatMessage;

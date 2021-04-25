import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Link,
  theme,
  VStack,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import initializeFirebase from "./initializeFirebase";
import SendMessageBox from "./SendMessageBox";

initializeFirebase();

const auth = firebase.auth();
const firestore = firebase.firestore();
const messagesRef = firestore.collection("messages");

export const App = () => {
  const [value, loading, error] = useCollectionData(
    messagesRef.orderBy("createdAt").limit(100)
  );

  const messages: ChatMessageProps[] =
    (value &&
      value.map((m) => ({
        name: m.name || "Error loading name",
        src: m.src || "",
        message: m.message || "Error loading content",
      }))) ||
    [];

  const anchor = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    if (anchor && anchor.current) {
      anchor.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const [user] = useAuthState(auth);
  const isLoggedIn = !!user;

  async function signup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  }
  async function signout() {
    await auth.signOut();
  }
  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" textAlign="center" fontSize="xl">
        <Box display="flex" justifyContent="flex-end">
          {isLoggedIn ? (
            <Button bg="none" onClick={signout}>
              Sign out
            </Button>
          ) : (
            <Button bg="none" onClick={signup}>
              Sign in
            </Button>
          )}
          <Link
            as={Button}
            href="https://github.com/rymaju/react-firebase-prototype"
            bg="none"
          >
            Source Code
          </Link>
          <ColorModeSwitcher />
        </Box>

        <Container>
          <Box height="80vh" overflowY="scroll" paddingX="5">
            <VStack spacing={8}>
              {messages.map((message, i) => (
                <ChatMessage key={i} {...message} />
              ))}
              <span ref={anchor}></span>
            </VStack>
          </Box>
          <SendMessageBox
            messages={messages}
            user={user}
            isLoggedIn={isLoggedIn}
          />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

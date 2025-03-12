import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { createChatSession, getChatMessages, getChatSessions, createChatMessage } from '../main/api'; // Make sure getChatSessions is imported

const sendIcon = require('@/assets/images/send.png');
const botIcon = require('@/assets/images/bot.png');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        const existingSessions = await getChatSessions(); // (1) Fetch existing chat sessions
        setSessions(existingSessions);                    // Update the sessions state

        if (existingSessions.length > 0) {                // There are existing sessions
          const initialSessionId = existingSessions[0].session_id;
          setSessionId(initialSessionId);
          
          // (2) Retrieve previous chats
          const initialMessages = await getChatMessages(initialSessionId);
          setMessages(initialMessages.map((msg: any) => ({
            id: msg.message_id,
            text: msg.message,
            sender: msg.sender,
          })));
        } else { // Handle as case not error
          throw new Error("No sessions found");
        }
      } catch (error) {
        console.error('Error fetching sessions or creating session:', error);
        try { // (3) Create new session since there is none
          const data = await createChatSession();
          setSessionId(data.session_id);  // Store session ID
          const initialMessage = {
            id: '0',
            text: 'Hello, I\'m (Chatbot Name)! 👋 I\'m your personal health assistant. How can I help you?',
            sender: 'bot' as "user" | "bot", 
          };
          // Store initial message by chatbot
          await createChatMessage(data.session_id, 'bot', initialMessage.text);
          setMessages([initialMessage]);
          
          if (data?.session_id) {  // Ensure sessionId is valid before fetching messages
            const initialMessages = await getChatMessages(data.session_id);
            setMessages(initialMessages.map((msg: any) => ({
              id: msg.message_id,
              text: msg.message,
              sender: msg.sender as "user" | "bot",
            })));
          }
        } catch (createError) {
          console.error("Error creating new chat session:", createError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleSendMessage = async () => {
    if (!inputText || !sessionId) return;

    const userMessage: Message = {
      id: `${new Date().getTime()}`,
      text: inputText,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    try {
      // (4) Send users message to server 
      // Replace input text with bot response from bot API
      const botResponse = await createChatMessage(sessionId, 'user', inputText);
      const botMessage: Message = {
        id: botResponse.message_id,
        text: botResponse.message,
        sender: 'bot',
      };
      // (5) Send bot message to server
      await createChatMessage(sessionId, 'bot', botMessage.text);

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#432C81" />
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}
          >
            {item.sender === 'bot' && (
              <View style={styles.botCircle}>
                <Image source={botIcon} style={styles.botIcon} />
              </View>
            )}
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={[styles.messageText, item.sender === 'user' ? styles.userText : styles.botText]}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor='#7B6BA8'
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Image source={sendIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  messageBubble: {
    padding: 16,
  },
  userBubble: {
    backgroundColor: '#432C81',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  botBubble: {
    backgroundColor: '#EDECF4',
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Raleway',
  },
  botText: {
    color: '#432C81',
  },
  userText: {
    color: '#EDECF4',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#EDECF4',
    borderColor: '#432C81',
    fontFamily: 'Raleway',
    fontSize: 16,
    color: '#432C81',
  },
  sendButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    backgroundColor: '#432C81',
    borderRadius: 22,
    resizeMode: 'contain',
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  botCircle: {
    width: 32,
    height: 32,
    backgroundColor: '#EDECF4',
    borderRadius: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botIcon: {
    width: 16,
    height: 16,
  },
});

export default Chatbot;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

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

  const handleSendMessage = () => {
    if (!inputText) return;

    const userMessage: Message = {
      id: `${new Date().getTime()}`,
      text: inputText,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botMessage: Message = {
        id: `${new Date().getTime() + 1}`,
        text: `${inputText}`,
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  // Initial bot message
  useEffect(() => {
    const defaultMessage: Message = {
      id: '0',
      text: 'Hello, I\'m (Chatbot Name)! 👋 I\'m your personal health assistant. How can I help you?',
      sender: 'bot',
    };

    setMessages([defaultMessage]);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
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
    justifyContent: 'flex-start'
  },
  messageBubble: {
    padding: 16,
  },
  userBubble: {
    backgroundColor: '#432C81',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24
  },
  botBubble: {
    backgroundColor: '#EDECF4',
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Raleway'
  },
  botText: {
    color: '#432C81'
  },
  userText: {
    color: '#EDECF4'
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
    color: '#432C81'
  },
  sendButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    backgroundColor: '#432C81',
    borderRadius: 22,
    resizeMode: 'contain'
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
    alignItems: 'center'
  },
  botIcon: {
    width: 16,
    height: 16,
  }
});

export default Chatbot;

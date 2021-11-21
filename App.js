import config from "./config";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const API_KEY = config.API_KEY;

export default function App() {
  
  // state를 선언하고, 날씨 정보를 가져와서, 화면에 뿌리기
  const [ weather, setWeather ] = useState([]);
  const [ text, setText ] = useState("");
  const [ sentences, setSentences ] = useState("hi");

  const inputText = () => {
    setSentences(text);
    setText("");
  };

  useEffect(async () => {
    const client = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=" + API_KEY
    });
    const data = await client.get("");
    const parsedData = await data.data.weather[0].main;
    
    setWeather(parsedData);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Below is weather</Text>
      <Text>{weather}</Text>

      <Text>{sentences}</Text>
      <TextInput 
        style={styles.input}
        onChangeText={text => setText(text)}
        onSubmitEditing={inputText} // 입력 후 엔터
        value={text}
        placeholder="Please input sentences"
      />
      <Button
        title="Save"
        onPress={() => console.log(sentences)}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

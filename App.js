import config from "./config";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const API_KEY = config.API_KEY;

export default function App() {

  // state를 선언하고, 날씨 정보를 가져와서, 화면에 뿌리기
  const [ weather, setWeather ] = useState([]);
  const [ sentences, setSentences ] = useState("hi");

  inputText = () => {
    const text = document.TextInput.value;
    setSentences(text);
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
        placeholder="Please input sentences"
      />
      <Button
        onPress={() => inputText}
        title="Save"
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

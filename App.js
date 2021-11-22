import config from "./config";
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = config.API_KEY;

export default function App() {
  
  // state를 선언하고, 날씨 정보를 가져와서, 화면에 뿌리기
  const [ weather, setWeather ] = useState([]);
  const [ text, setText ] = useState("");
  const [ sentences, setSentences ] = useState("hi");

  const setData = async (text) => {
    try {
      await AsyncStorage.setItem('textToSave', text)
    } catch (e) {
      console.log("Text was not saved")
    }    
  };

  const getData = async () => {
    try {
      const savedText = await AsyncStorage.getItem('textToSave')
      if (savedText !== null) {
        console.log("Nothing saved yet")
      }
      return savedText;
    } catch (e) {
      console.log("Could not get text")
    }
  };  

  const inputText = () => {
    setSentences(text);
    setData(text);
    setText("");
  };

  useEffect(async () => {
    const client = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=" + API_KEY
    });
    const data = await client.get("");
    const parsedData = await data.data.weather[0].main;
    const savedText = getData;
    
    setWeather(parsedData);
    setSentences(savedText);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Below is weather</Text>
      <Text>{weather}</Text>

      <Text>{sentences}</Text>
      <TextInput 
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Please input sentences"
      />
      <Button
        title="Save"
        onPress={inputText}
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

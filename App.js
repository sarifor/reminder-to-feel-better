import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {

  // state를 선언하고, 날씨 정보를 가져와서, 화면에 뿌리기
  // const { weather, setWeather } = useState([]);

  useEffect(async () => {
    const client = axios.create({
      baseURL: "https://www.yahoo.co.jp/",
    });
    const data = await client.get("");
    console.log(data);
    // setWeather(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Below is weather</Text>
      {/*<Text>{weather}</Text>*/}
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
});

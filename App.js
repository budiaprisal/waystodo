import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from "native-base";
import { StyleSheet, Text, View } from 'react-native';
import Container from './container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export default function App() {
  return (
    <NativeBaseProvider>
          <Container />

      </NativeBaseProvider>
  );
}


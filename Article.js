// Citation: This code was adapted from "ToDo.js" in Lecture 3B
import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';

import { material } from 'react-native-typography';


export default function Article(props) {
  // console.log(props)
  function openURL() {
    Linking.openURL(props.item.url).catch((err) => console.error('An error occurred', err));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openURL}>
      <Text style={material.title}>{props.item.title}</Text>
      <Text style={material.subheading}>{props.item.snippet}</Text>
      <Text style={material.body2}>{props.item.byline}</Text>
      <Text style={material.caption}>{props.item.date}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 15
  }
});

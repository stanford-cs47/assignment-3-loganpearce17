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




export default function Article(props) {
  // console.log("some text")
  // console.log(props)
  function openURL() {
    Linking.openURL(props.item.url).catch((err) => console.error('An error occurred', err));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openURL}>
      <Text style={styles.title, styles.general}>{props.item.title}</Text>
      <Text style={styles.details, styles.general}>{props.item.byline}</Text>
      <Text style={styles.details, styles.general}>{props.item.snippet}</Text>
      <Text style={styles.details, styles.general}>{props.item.date}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  general: {
    textAlign: 'left'
  },
  title: {
    fontSize: 20
  },
  details: {
    fontSize: 12,
  },
});

// Citation: This code was adapted from "ToDo.js" in Lecture 3B
import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Alert
} from 'react-native';

// 3.2 Make your todos clickable such that they call the
// delete function in parent when pressed

export default function Article(props) {
  return (
    <View style={styles.container}>
      <Text>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

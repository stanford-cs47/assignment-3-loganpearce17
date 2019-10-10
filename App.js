import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Images, Colors, Metrics } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  onChangeText = text => {
    this.searchText = text
    console.log(this.searchText)
  }

  onPressButton = () => {
    console.log("You searched for " + this.searchText)
  }

  componentDidMount() {

    //uncomment this to run an API query!
    //this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={Images.logo} accessibilityLabel={"New York Times Logo"}/>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchBar}
            placeholder={"Search by article category!"}
            onChangeText={text => this.onChangeText(text)}
            value={this.searchText}
            onSubmitEditing={this.onPressButton}
          />
          <TouchableOpacity onPress={this.onPressButton}>
            <Image
              style={styles.searchBtn}
              source={Images.glass}
              accessibilityLabel={"Magnifying glass"}
            />
          </TouchableOpacity>
      </View>




      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logo: {
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    height: 50
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  // Citaiton: styling for searchBar from: https://facebook.github.io/react-native/docs/textinput#autocorrect
  searchBar: {
    height: 40,
    width: Dimensions.get('window').width - 100
  },
  searchBtn: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium
  }
});

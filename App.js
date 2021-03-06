import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Images, Colors, Metrics } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'
import Article from './Article.js'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  onChangeText = searchText => {
    this.setState({searchText})
  }

  onSearch = () => {
    this.loadArticles(this.state.searchText);
  }

  componentDidMount() {
    this.loadArticles();
  }

  async loadArticles(searchText = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchText);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    // console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  render() {
    const {articles, loading} = this.state;

    if (loading) {
      return (
        <SafeAreaView style={styles.activityContainer}>
          <ActivityIndicator  size="large" color="#CF5243"/>
        </SafeAreaView>
      )
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <Image style={styles.logo} source={Images.logo} accessibilityLabel={"New York Times Logo"}/>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchBar}
            placeholder={"Search for News"}
            onChangeText={text => this.onChangeText(text)}
            value={this.searchText}
            onSubmitEditing={this.onSearch}
          />
          <TouchableOpacity>
            <Ionicons name="md-search" size={32} color="#CF5243" onPress={this.onSearch} resizeMode="contain"/>
          </TouchableOpacity>
      </View>

      <View style={styles.flatList}>

        <FlatList
          data={this.state.articles}
          renderItem={( {item, index} ) =>
              <Article
                item = {item}
              />
          }
          keyExtractor={(item, index) => {
            return index.toString()
          }}
        />
      </View>



      </SafeAreaView>

      </TouchableWithoutFeedback>


    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    borderRadius: 10,
    backgroundColor: '#F4F2F1',
  },
  // Citaiton: styling for searchBar adapted from: https://facebook.github.io/react-native/docs/textinput#autocorrect
  searchBar: {
    height: 40,
    width: Dimensions.get('window').width - 50,
  },
  searchBtn: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    marginRight: 10
  },
  flatList: {
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
    width: Dimensions.get('window').width - 50,
  }
});

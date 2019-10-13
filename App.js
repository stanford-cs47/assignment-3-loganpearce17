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
  Keyboard,
  FlatList
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
    console.log(this.state.searchText)
  }

  onSearch = () => {
    console.log("You searched for " + this.state.searchText)
  }

  componentDidMount() {
    //uncomment this to run an API query!
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
            onSubmitEditing={this.onSearch}
          />
           <Ionicons name="md-search" size={32} onPress={this.onSearch} resizeMode="contain"/>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={this.state.articles.title}
          renderItem={( {item, index} ) =>
              <Article text={item}/>
          }
          keyExtractor={(item, index) => {
            return index.toString()
          }}
        />
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
  },
  flatList: {
    flex: 1,
    width: '100%'
  }
});

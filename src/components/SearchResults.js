import React from 'react';
import PropTypes from 'prop-types';
import ajax from '../ajax';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import {ActivityIndicator, Button, FlatList, View, Text, TextInput, Slider, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';

class SearchResults extends React.Component{
  state = {
   images: [],
   isLoading: true,
   };

  static propTypes = {
    onBack: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    colNum: PropTypes.number.isRequired,
  }

  async componentDidMount(){
    const images = await ajax.fetchSearchImages(this.props.searchText);
    this.setState({images});
    this.setState({
      isLoading: false
    });
  }

  showLoader(){
    return (
      <View style={styles.loaderContainer}>
        <Text>Search Image App</Text>
        <ActivityIndicator size="large" color="#99b3ff" />
      </View>
    );
  }

  showNoResults(){
    return(
      <View>
      {this.renderBackButton()}
        <Text style={styles.errorText}>
          No images found. Try again
        </Text>

      </View>
    )
  }

  showSearchError(){
    return(
      <View>
      {this.renderBackButton()}
        <Text style={styles.errorText}>
          Incorrect search input. Try again
        </Text>
      </View>
    )
  }

  showImageSearchResults(){
    const spaceBtwImages = 2;
    const horizontalMargin = 10;
    const deviceWidth = Dimensions.get('window').width;
    const imageSize = (deviceWidth-2*(horizontalMargin+spaceBtwImages*(+this.props.colNum)))/(+this.props.colNum);
    return (
      <View style={[styles.imageContainer, {marginRight: horizontalMargin,
      marginLeft: horizontalMargin}]}>
        <FlatList
          horizontal={false}
          numColumns={this.props.colNum}
          data={this.state.images}
          renderItem={
            ({item}) =>
                <Image style={{width: imageSize, height: imageSize, margin: spaceBtwImages}}
                  source={{uri: item.thumbnailUrl}}
                  indicator={ProgressBar}
                  indicatorProps={{
                    width: 50,
                    color: '#99b3ff',
                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                  }}
                />}
          keyExtractor={(item) => item.imageId}
        />
        {this.renderBackButton()}
      </View>
    );
  }

  renderBackButton(){
    return(
      <TouchableHighlight onPress={this.props.onBack} style={styles.backButton}>
        <Image
          style={styles.buttonImg}
          source={require('../images/backBtn.png')}
         />
      </TouchableHighlight>
    );
  }

  render(){
    return(
      <View style={styles.container}>
        {this.state.isLoading && this.showLoader()}
        {this.state.images==null && this.showSearchError()}
        {!this.state.isLoading && this.state.images!=null && this.state.images.length===0 && this.showNoResults()}
        {this.state.images!=null && this.state.images.length>0 && this.showImageSearchResults()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 100,
    textAlign: 'center',
  },
  imageContainer: {
    justifyContent: 'flex-start',
  },

  backButton: {
    position: 'absolute',
    top: 10,
    left: 5,
  },
  buttonImg:{
    width: 45,
    height: 45
  }
});

export default SearchResults;

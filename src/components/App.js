import React from 'react';

import {ActivityIndicator, Button, FlatList, Image, View, Text, TextInput, TouchableOpacity, Slider, StyleSheet} from 'react-native';

import SearchResults from './SearchResults';

class App extends React.Component{
  state = {
    colNum: 1,
    searchText: '',
    searching: false,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  };

  onPressSearch = ()=>{
    this.setState({
      searching: true
    });
  }
blablabla(){
  const a1=1;
  const a3=1;
  const a2=1;

  const a4=1;
  return a4;
}
  unsetSearch =()=>{
    this.setState({
      colNum: 1,
      searchText: '',
      searching: false,
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

  showInputForm(){
   return(
     <View>
       <Text style={styles.header}>Search Image App</Text>
       <View style={styles.searchBox}>
         <View style={styles.searchTermBox}>
             <Text style={{marginRight:5}}>
               Search Term:
             </Text>
             <TextInput
               autoCapitalize="none"
               uppercase={false}
               style={styles.inputField}
               placeholder="Search"
               onChangeText={(searchText) => this.setState({searchText})}
             />
         </View>
         <View style={styles.searchTermBox}>
             <Text>
               Columns:
             </Text>
               <Slider
                   style={styles.slider}
                   thumbTintColor='#009789'
                   step={1}
                   minimumValue={1}
                   maximumValue={5}
                   value={this.state.colNum}
                   onValueChange={colNum => this.setState({ colNum })}
               />
               <Text>
               {this.state.colNum}
               </Text>
           </View>



           <TouchableOpacity
             style={styles.button}
             onPress={this.onPressSearch}>
             <Text style={styles.buttonText}>Search</Text>
           </TouchableOpacity>
       </View>
      </View>
   )
  }

  render(){
    if (this.state.searching){
      return <SearchResults searchText={this.state.searchText} colNum={this.state.colNum} onBack={this.unsetSearch}/>;
    }
    return(
      <View style={styles.container}>
        {this.state.isLoading ? this.showLoader() : this.showInputForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center'
  },

  inputField:{
    width: 180,
    borderBottomWidth: 1.7,
    borderColor: '#999',
    textAlign: 'center',
  },
  searchTermBox:{
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    width: 200,
  },
  button:{
   marginRight:40,
   marginLeft:40,
   marginTop:10,
   paddingTop:10,
   paddingBottom:10,
   backgroundColor:'#009789',
   borderRadius:10,
   borderWidth: 1,
   borderColor: '#fff'
 },
 loaderContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 buttonText:{
     color:'#fff',
     textAlign:'center',
     paddingLeft : 10,
     paddingRight : 10,
     fontWeight: 'bold'
 }
});

export default App;

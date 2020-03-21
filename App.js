import React, { useState } from 'react';
import { StyleSheet, Linking, View, Text, Share, FlatList, StatusBar, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
// import Search from './components/Search';
import fetch from 'node-fetch';
import moment from 'moment';
import { render } from 'react-dom';

export default function App() {

  const [people, setPeople] = useState([]);
  var i = 0;

  let url = "https://api.unsplash.com/search/photos/?client_id=HPAn2XN9u7_5sHR6ofigmyTvFLK9t7UjS2M6XUOP_7Y&query=street+art&page=1&per_page=10"

  function getImages() {
    while (people.length > 0) {
      people.pop();
    }
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.results.forEach(photo => {
          photo.key = Math.floor(Math.random() * Math.floor(9999999)).toString();
          people.push(photo);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getImages();
  getImages();
  getImages();
  getImages();
  getImages();
  return (
    <React.Fragment>
      <StatusBar hidden />
      <ImageBackground
      source={{uri: 'https://images.unsplash.com/photo-1546624538-0a85938a4f2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80'}}
      style={{width: '100%', height: '100%'}}
      >
        <View style={{ flex: 1}}>
          <FlatList
            data={people}
            initialNumToRender={2}
            renderItem={({item}) => (
              <Card
                style={{backgroundColor: item.color}}
                title={"🌎 " + item.user.location}
                image={{uri: item.urls.small}}>
                <View style={{marginBottom: 20}}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>👤 </Text> <Text>{item.user.username}</Text>
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>📝 </Text> <Text style={{fontStyle: 'italic'}}>{item.description ?? item.alt_description}</Text>
                    </Text>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>📅 </Text> <Text>{moment(item.created_at).fromNow()}</Text>
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                  <Button
                    onPress={ ()=> {Linking.openURL(item.urls.raw)}}
                    icon={<Icon name='export' type='antdesign' color='#ffffff' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='  VIEW' />
                  <Button
                    onPress={ ()=> {Share.share({message: item.description ?? item.alt_description + ' ' + item.links.html});}}
                    icon={<Icon name='sharealt' type='antdesign' color='#ffffff' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='  SHARE' />
                  </View>
              </Card>
            )}
          />
            <View style={{marginBottom: 20}}></View>
        </View>
      </ImageBackground>
    </React.Fragment>
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

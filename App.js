import React, { useState, useEffect } from 'react';
import { StyleSheet, Linking, View, Text, Share, FlatList, StatusBar, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
// import Search from './components/Search';
import fetch from 'node-fetch';
import moment from 'moment';
import { render } from 'react-dom';

export default function App() {

  const [people, setPeople] = useState([]);

  // im gonna edit some stuff if thats ok
  // i know whats goin on with it
  let url = "https://suce.dev/unsplash.json"

  async function getImages() {
    while (people.length > 0) {
      people.pop();
    }
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.results.forEach(photo => {
          photo.key = Math.floor(Math.random() * Math.floor(9999999)).toString();
          people.push(photo);
          console.log('Added photo');
        });
        console.log('Added all photos');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getImages().then(console.log).catch(console.error);
  }, []);

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
                    onPress={ ()=> {Share.share({message: item.links.html});}}
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

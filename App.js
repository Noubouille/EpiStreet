import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Search from './components/Search'

export default function App() {
  return (
    <React.Fragment>
      <Search/>
    <View style={{ flex: 1, backgroundColor: 'yellow'}}>
      <View style={styles.container}>
        <Text>hello, world!</Text>
        <Button title="Solid Button" />
      </View>
    </View>
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

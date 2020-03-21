import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.header}>
          {/* <Image style={styles.headerImage} source={require('../assets/banner.png')} />; */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
    },
    headerImage: {
        backgroundColor: '#fff',
    }
});

export default Header;

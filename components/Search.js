import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            pretext: 'street art ',
        };
    }

    render() {
        return (
            <View style={{ marginTop: 20}}>
                <TextInput
                    style={[styles.searchBar, {marginBottom:10}]}
                    placeholder='Recherche...'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button title='Recherche' onPress={() => { alert(this.state.pretext += this.state.text) }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        paddingTop: 10,
        marginLeft: 5,
        marginRight:5,
        height:50,
        fontSize: 20,
        paddingLeft:5
    }
})
export default Search
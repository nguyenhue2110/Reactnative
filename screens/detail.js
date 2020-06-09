import React from 'react';
import { View, Text, Button } from 'react-native';

//Screen2
export default class DetailsScreen extends React.Component {
  render() {
    
    const { navigation } = this.props;
    
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.navigate('Details')
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
    );
  }
}
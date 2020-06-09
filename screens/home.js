import React from 'react';
import { View, Text, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          
          navigation.navigate('Details');
        }}
      />
    </View>
    );
  }
}

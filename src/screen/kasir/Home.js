import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/style/boxKasir/boxHomeKasir/index';

export class Home extends Component {
  render() {
    return (
      <View style={styles.utama}>
        <Text onPress={() => this.props.navigation.openDrawer()}>INi Home</Text>
      </View>
    );
  }
}

export default Home;

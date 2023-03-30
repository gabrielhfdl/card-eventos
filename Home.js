import * as React from 'react';
import { View, TouchableOpacity, Text, Image, Button, BackHandler, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Eventos disponíveis',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.defaultButton} onPress={() => navigate('EventList')}>
            <Text style={styles.defaultText}> VER EVENTOS DISPONÍVEIS</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.exitButton} onPress={() => navigate('FavoriteEvents',)}>
            <Text style={styles.exitText}> VER EVENTOS FAVORITOS </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.exitButton} onPress={() => BackHandler.exitApp()}>
            <Text style={styles.exitText}> SAIR </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
    marginHorizontal: 25,
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,
  },

  defaultText: {
    padding: 0,
    fontSize: 16,
    color: "white"

  },
  exitButton: {
    marginTop: 30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
    marginHorizontal: 25,
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,

  },
  exitText: {
    padding: 0,
    fontSize: 16,
    color: "white"

  }

});
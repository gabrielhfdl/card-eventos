import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import EventCard from './components/EventCards'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FavoritEventsScreen extends React.Component {
    static navigationOptions = {
        title: 'Lista de Favoritos',
    };

    constructor(props) {
        super(props);
        this.state = { isLoading: true, eventos: [] }
    }


    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('favorite_list').then(
                value => {
                    this.setState({ isLoading: false, eventos: JSON.parse(value) })
                }
            );
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }



    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View>
                    {this.state.eventos == null
                        ? <Text style={styles.textButtonStyle}>Nao há eventos salvos</Text>
                        : <FlatList
                            data={this.state.eventos}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => navigate('EventDetails', { evento: item })}>
                                    <View>
                                        <EventCard
                                            title={item.nome}
                                            date={item.data}
                                            horario={item.horario}
                                            local={item.local}
                                            imagem={item.imagem}
                                        />
                                    </View>
                                </TouchableOpacity>}
                        />}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigate('Home')}>
                    <Text style={styles.textButtonStyle}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        padding: 15,
        paddingBottom: 50
    },
    event: {
        padding: 0,
        fontSize: 12,
        height: 20,
        color: "#708090"
    },
    textButtonStyle: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.75,
        color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginTop: 15,
        marginBottom: 15,
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginTop: 15,
        marginBottom: 15,
    },
})
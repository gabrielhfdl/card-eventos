import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import EventCard from './components/EventCards'
export default class EventListScreen extends React.Component {
    static navigationOptions = {
        title: 'Lista de eventos',
    };

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }



    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            return fetch('https://gabrielhfdl.github.io/jsonteste/data.json')
                .then((response) => response.json())
                .then((json) => {
                    this.setState({
                        isLoading: false,
                        eventos: json["eventos"],
                    }, function () {
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <FlatList
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
                />
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
import { SafeAreaView, ScrollView } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, Image, Linking, TouchableOpacity, Platform } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { SocialIcon } from 'react-native-elements'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
import { SizedBox } from 'sizedbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class EventDetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Informações sobre o evento',
    };

    constructor(props) {
        super(props);
        let evento = props.navigation.getParam('evento');
        this.state = {
            nome: evento.nome,
            email: evento.email,
            telefone: evento.telefone,
            latitude: evento.latitude,
            longitude: evento.longitude,
            valor: evento.valor_ingresso,
            imagem: evento.imagem,
            facebook: evento.redes_sociais.facebook,
            instagram: evento.redes_sociais.instagram,
            local: evento.local,
            data: evento.data,
            hora: evento.horario,
            video: evento.video,
            ingresso: evento.ingresso,
            foto_evento1: evento.foto_evento1,
            foto_evento2: evento.foto_evento2,
            evento: evento
        };
    }

    render() {

        function mapAndOpenUrl() {
            Platform.select({
                ios: Linking.openURL(`maps:0,0?q=${latitude},${longitude}}`),
                android: Linking.openURL(`geo:0,0?q=${latitude},${longitude}}`),
            })
        };

        function openPhone() {
            Linking.openURL(`tel:${telefone}`)

        }

        function openEmail() {
            Linking.openURL(`mailto:${email}`)

        }

        function openLink() {
            Linking.openURL(`${ingresso}`);

        }

        function openFacebook() {
            Linking.openURL(`${facebook}`);
        }


        async function saveFavorite() {
            var jsonList = []
            try {
                const value = await AsyncStorage.getItem('favorite_list');
                if (value != null) jsonList = JSON.parse(value);
            } catch (e) {
                console.log(e);
            }
            jsonList.push(evento)
            AsyncStorage.setItem('favorite_list', JSON.stringify(jsonList));

        }

        const { navigate } = this.props.navigation;
        const { nome, imagem, email, telefone, latitude, longitude, valor,
            local, data, hora, video, ingresso, facebook, foto_evento1, foto_evento2, evento } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.eventName}>{nome}</Text>
                    <Text style={styles.eventDetails}>Valor do ingresso: R$ {valor} </Text>

                    <Text style={styles.eventDetails}>Local: {local}</Text>
                    <Text style={styles.localDetails}>Data: {data}  Horário: {hora}</Text>

                    <TouchableOpacity style={styles.button} onPress={mapAndOpenUrl}>
                        <Text style={styles.textButtonStyle}>Abrir no mapa</Text>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity style={styles.buttonFavorite} onPress={saveFavorite}>
                            <Text style={styles.textButtonStyle}>Salvar favorito</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.videoTitle}> Relembre: </Text>
                        <YoutubeIframe
                            height={200}
                            videoId={video}
                        />
                    </View>

                    <View>
                        <Text style={styles.videoTitle}> Fotos de edições anteriores: </Text>
                        <View style={{
                            width: width * 0.8,
                            display: "flex",
                            flexDirection: "row",

                        }}>
                            <Image source={{ uri: foto_evento2 }} style={{ width: "30%", height: 200 }} />

                            <SizedBox horizontal={10} />

                            <Image source={{ uri: foto_evento1 }} style={{ width: "30%", height: 200 }} />

                        </View>

                    </View>

                    <TouchableOpacity style={styles.buttonTicket} onPress={() => openLink()}>
                        <Text style={styles.textButtonStyle}>Compre seus ingressos aqui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => openEmail()}>
                        <Text style={styles.textButtonStyle}>Fale conosco (e-mail)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => openPhone()}>
                        <Text style={styles.textButtonStyle}>Fale conosco (telefone)</Text>
                    </TouchableOpacity>

                    <Text style={styles.legendStyle}>E-mail: {email}</Text>
                    <Text style={styles.legendStyle}>Telefone: {telefone}</Text>
                    <SocialIcon
                        title='Nos encontre no facebook'
                        button
                        type='facebook'
                        onPress={() => openFacebook()}
                    />

                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigate('EventList')}>
                    <Text style={styles.textButtonStyle}>Voltar</Text>
                </TouchableOpacity>

            </ScrollView >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    legendStyle: {
        fontSize: 12,
        fontWeight: 'semi-bold',

    },

    buttonFavorite: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
        marginTop: 15,
        marginBottom: 15,

    },

    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        height: 44,
    },
    eventDetails: {
        fontSize: 16,
        height: 30,
    },

    buttonTicket: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        marginTop: 15,
        marginBottom: 15,

    },

    videoTitle: {
        fontWeight: 'bold',
        letterSpacing: 0.75,
        color: 'black',
    },
    localDetails: {
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',

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
    textButtonStyle: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.75,
        color: 'white',

    }
});
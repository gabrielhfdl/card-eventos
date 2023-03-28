import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class EventCard extends React.Component {
    render() {
        const { title, date, local, imagem } = this.props;

        return (

            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>Data: {date}</Text>
                    <Text style={styles.local}>Local: {local}</Text>
                    <Image style={{ width: 300, height: 100 }}
                        source={{ uri: imagem }} />

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#a9a9a9',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#332',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },

    detailsContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#f0f8ff',
    },
    local: {
        fontSize: 14,
        color: '#f0f8ff',
    }
});

export default EventCard;
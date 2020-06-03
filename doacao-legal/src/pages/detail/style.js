import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFF',
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 30,
        color: '#13131a',
        fontWeight: 'bold',
    },

    user: {
        marginTop: 15
    },

    subtitle: {
        fontSize: 17,
        color: '#13131a',
        fontWeight: 'bold',
        // alignItems: 'center'
        textAlign: 'center',
        marginBottom: 10
    },

    item: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    itemProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    itemValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380',
    },

    address: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    actionsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    backButtonText: {
        color: '#E02041',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    whatsapp: {
        color: 'green',
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10,
    }
});
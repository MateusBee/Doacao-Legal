import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        alignItems: 'center',
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 30,
        color: '#13131a',
        fontWeight: 'bold',
    },

    inputs: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    input: {
        fontSize: 15,
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 4,
        marginBottom: 10
    },

    uploadImage: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    removeButton: {
        marginTop: 10,
        alignItems: 'center',
    },

    remove: {
        color: '#E02041',
        fontSize: 15,
        fontWeight: 'bold',
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    button: {
        width: 100,
        borderRadius: 4,
    },

    cancel: {
        borderRadius: 4,
        backgroundColor: '#00B3ED'
    },

    save: {
        borderRadius: 4,
        backgroundColor: 'green'
    },
});
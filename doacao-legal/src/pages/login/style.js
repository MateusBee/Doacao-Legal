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
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
    },

    data: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },

    title: {
        fontSize: 30,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    login: {
        padding: 24,
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 10,
    },

    inputs: {
        marginLeft: 30,
        marginRight: 30
    },

    recoverButton: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    recoverButtonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },

})
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

    data: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 10,
    },

    edit: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 15,
        top: 15,
    },

    userProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    userValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 14,
        color: '#737380',
    },

    address: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    signOutButton: {
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    signOutButtonText: {
        // left: 20,
        color: '#E02041',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
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

    headerText: {
        fontSize: 15,
        color: '#737380',
    },

    headerTextBold: {
        fontWeight: 'bold',
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 30,
        color: '#13131a',
        fontWeight: 'bold',
    },

    itemsList: {
        marginTop: 32,
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

    delete: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 15,
        top: 15,
    }
});
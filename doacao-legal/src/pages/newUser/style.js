import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: Constants.statusBarHeight + 30
    },

    title: {
        fontSize: 25,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center'
    },

    subtitle: {
        fontSize: 18,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center'
    },

    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 153,
        alignItems: 'center',

    },

    inputs: {
        marginLeft: 30,
        marginRight: 30
    },

    data: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginTop:16,
    },


    






});
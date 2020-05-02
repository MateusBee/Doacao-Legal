import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    title: {
        fontSize: 30,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center'
    },
    login: {
        padding: 24,
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 100,
    },
    inputs: {
        marginLeft: 30,
        marginRight: 30
    }

})
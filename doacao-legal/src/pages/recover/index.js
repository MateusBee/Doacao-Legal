import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Reinput from 'reinput';

import api from '../../service/api';

import styles from './style';

function Recover() {
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    function invalidItem(title, message){
        return Alert.alert(
            `${title}`,
            `${message}`,
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          )
    }

    function goBack(){
        navigation.goBack();
    }

    async function getPassword() {
        try {
            const response = await api.get('recover', {
                headers: {
                    email: email.trim()
                }
            });
            console.log(response.data);
            invalidItem('Sucesso','Por favor verifique seu email!');
        } catch {
            invalidItem('Ops!','Email não encontrado! Tente Novamente!');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recuperar senha</Text>
            </View>

            <View style={styles.data}>
                <Reinput
                    label='Email'
                    activeColor='#00ff7f'
                    value={email}
                    onChangeText={e => setEmail(e)}

                />

            </View>

            <View style={styles.actionsButton}>
                <TouchableOpacity
                    style={styles.actionsButton}
                    onPress={goBack}
                >
                    <Icon name="arrow-left" size={20} color="#E02041"/>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionsButton}
                    onPress={getPassword}
                >
                    <Text style={styles.whatsapp}>Enviar</Text>
                    <Icon name="paper-plane" size={20} color="green"/>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Recover;
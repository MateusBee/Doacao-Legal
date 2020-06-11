import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Alert, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';

import api from '../../service/api'

// import { Gmail } from 'react-native-vector-icons/FontAwesome';

import styles from './style'

function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation();

    function navigateToNewUser(){
        navigation.navigate('NewUser');
    }

    function invalidUser(){
        return Alert.alert(
            'Ops!',
            'Usuário ou senha inválido! Tente Novamente!',
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          )
    }

    async function validation(){
        const data = {
            email,
            senha
        }
        
        try{
            const resp = await api.post('login', data);
            const user = JSON.parse(resp.request.response);
            AsyncStorage.setItem('id', user.id);
            AsyncStorage.setItem('name', user.name);
            navigation.navigate('BottomNavigator');
        } catch (err) {
            invalidUser()
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Bem vindo!</Text>
                    <Text style={styles.title}>App Doação Legal</Text>
                </View>

                <View style={styles.data}>
                    <View style={styles.login}>
                        <View>
                            <Input
                                placeholder='Email'
                                leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'gray' }}
                                value={email}
                                onChangeText={e => setEmail(e)}
                            />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Input
                                placeholder="Password"
                                leftIcon={{ type: 'font-awesome', name: 'lock', color: 'gray' }}
                                secureTextEntry={true}
                                value={senha}
                                onChangeText={e => setSenha(e)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <View>
                            <Button
                                title="Entrar"
                                onPress={() => validation()}
                            />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Button
                                title="Cadastrar-se"
                                onPress={() => navigateToNewUser()}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

 export default Login;
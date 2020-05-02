import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Alert, Text, View } from 'react-native';

import api from '../../service/api'

// import { Gmail } from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

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
            console.log("response: ", resp.request.response)
            const user = JSON.parse(resp.request.response);
            // console.log(user.telefone);
            // localStorage.setItem('name', user.name);
            // localStorage.setItem('telefone', user.telefone);
            // localStorage.setItem('email', user.email);
        } catch (err) {
            invalidUser()
        }

    }

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.title}>Bem vindo!</Text>
                    <Text style={styles.title}>App Doação Legal</Text>
                </View>
            </View>

            <View style={styles.login}>
                <View>
                    <Input
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                        value={email}
                        onChangeText={e => setEmail(e)}
                    />
                </View>
                <View style={{ marginTop: 30 }}>
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
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
    )
}

 export default Login;
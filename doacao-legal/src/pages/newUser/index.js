import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Reinput from 'reinput';

import axios from 'axios';
import api from '../../service/api';

import styles from './style';

function NewUser() {
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({});
    const [confSenha, setConfSenha] = useState('');

    const navigation = useNavigation();
    const route = useRoute();


    function redirect() {
        if(newUser){
            navigation.navigate('Login');
        } else {
            navigation.navigate('BottomNavigator', { user });
        }
    }

    async function getParams() {
        const user_Id = route.params.user_Id;
        
        if(user_Id !== null) {
            const user = route.params.user;
            setUser({ ...user })
            setConfSenha(user.senha);
            setNewUser(false);
        }
    }

    function validPassword() {
        return Alert.alert(
            'Ops!',
            'Senhas diferentes digite novamente!',
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        )
    }

    function creating(titulo, mensagem) {
        return Alert.alert(
            `${titulo}!`,
            `${mensagem}!`,
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        )
    }

    function updateFieldTelefone(e) {
        if(e.length == 1 && e[0] != '(') {
            setUser({ ...user, telefone: '('.concat(e) });
            return;
        }

        if(e.length == 3 && e.length > user.telefone.length) {
            setUser({ ...user, telefone: e.concat(') ') });
            return;
        }

        setUser({ ...user, telefone: e });
    }

    async function updateFieldCep(e) {
        setUser({ ...user, cep: e });

        if(e.replace('-', '').length == 8){
            await axios.get(`https://viacep.com.br/ws/${e}/json/`)
                .then(response => {
                    const data = { ...response.data }

                    if(data.erro) {
                        creating('Ops', 'CEP inválido, Por favor digite um CEP valido');
                        return;
                    }

                    setUser({ ...user, cep: data.cep, cidade: data.localidade, uf: data.uf, bairro: data.bairro, rua: data.logradouro });
                })
        }    
    }

    async function save() {
        const user_Id = await AsyncStorage.getItem('id');
        const data = {
            ...user,
            telefone: user.telefone.replace(/\D/g, '')
        }

        if (user.senha != confSenha) {
            validPassword();
            return;
        }

        const mother = newUser ? 'post' : 'put'

        try {
            const message = newUser ? 'Usuário criado com sucesso' : 'Usuário editado com sucesso'
            await api[mother]('user', data, newUser ? null : {
                headers: {
                    Authorization: user_Id
                }
            });
            creating('Sucesso', message);
            redirect();
        } catch {
            const message = newUser ? 'Falha ao criar usuário' : 'Falha ao editar usuário'
            creating('Ops', `${message}, Verifique os campos`);
        }
    }

    useEffect(() => {
        getParams();
    }, [])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>

                <View>
                    <Text style={styles.title}>{ newUser ? 'Cadastro de Usuário' : `Edição do usuário ${user.name}` }</Text>
                </View>
                <View style={styles.data}>

                    <View>
                        <Text style={styles.subtitle}>Dados Pessoais</Text>

                        <View>
                            <Reinput
                                label='Nome*'
                                activeColor='#00ff7f'
                                // leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'gray' }}
                                value={user.name}
                                onChangeText={e => setUser({ ...user, name: e })}
                            />
                        </View>
                        <View>
                            <Reinput
                                label='Email*'
                                activeColor='#00ff7f'
                                value={user.email}
                                onChangeText={e => setUser({ ...user, email: e })}

                            />
                        </View>
                        <View>
                            <Reinput
                                label='Senha*'
                                activeColor='#00ff7f'
                                secureTextEntry={true}
                                value={user.senha}
                                onChangeText={e => setUser({ ...user, senha: e })}

                            />
                        </View>
                        <View>
                            <Reinput
                                label='Confirmar Senha*'
                                activeColor='#00ff7f'
                                secureTextEntry={true}
                                value={confSenha}
                                onChangeText={e => setConfSenha(e)}

                            />
                        </View>
                        <View>
                            <Reinput
                                label='Telefone*'
                                activeColor='#00ff7f'
                                value={user.telefone}
                                onChangeText={e => updateFieldTelefone(e)}

                            />
                        </View>

                    </View>
                </View>

                <View style={styles.data}>

                    <View>
                        <Text style={styles.subtitle}>Dados de Endereço</Text>
                        <View>
                            <Reinput
                                label='CEP*'
                                activeColor='#00ff7f'
                                type='number'
                                value={user.cep}
                                onChangeText={e => updateFieldCep(e)}

                            />
                        </View>
                        <View>
                            <Reinput
                                label='Cidade*'
                                activeColor='#00ff7f'
                                value={user.cidade}
                                onChangeText={e => setUser({ ...user, cidade: e })}

                            />
                        </View>
                        <View>
                            <Reinput
                                label='Bairro*'
                                activeColor='#00ff7f'
                                value={user.bairro}
                                onChangeText={e => setUser({ ...user, bairro: e })}

                            />
                        </View>
                        <View>
                            <Reinput
                                label='Rua*'
                                activeColor='#00ff7f'
                                value={user.rua}
                                onChangeText={e => setUser({ ...user, rua: e })}

                            />
                        </View>

                        <View style={styles.info}>

                            <Reinput
                                style={{ marginRight: 30 }}
                                label='Numero*'
                                activeColor='#00ff7f'
                                value={user.numero}
                                onChangeText={e => setUser({ ...user, numero: e })}
                            />
                            <Reinput
                                // style={{marginRight:90}}
                                label='UF*'
                                // maxHeight={2}
                                //minHeight={2}
                                activeColor='#00ff7f'
                                value={user.uf}
                                onChangeText={e => setUser({ ...user, uf: e })}
                            />

                        </View>

                    </View>


                </View>
                <View style={styles.Reinputs}>
                    <View style={{ marginTop: 30 }}>
                        <Button
                            title={newUser ? 'Cadastrar-se' : 'Salvar alterações'}
                            onPress={save}
                        />
                    </View>
                    <View style={{ marginTop: 30, marginBottom: 20 }}>
                        <Button
                            title="Cancelar"
                            onPress={redirect}
                        />
                    </View>

                </View>


            </View>

        </ScrollView>


    )
}

export default NewUser;
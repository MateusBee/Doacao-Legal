import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Alert, Text, View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';

import api from '../../service/api';

import styles from './style';

function NewUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [uf, setUf] = useState('');

    const navigation = useNavigation();


    function goBack() {
        navigation.goBack();
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



    async function save() {
        const data = {
            name,
            email,
            senha,
            telefone,
            cep,
            cidade,
            bairro,
            rua,
            numero,
            uf
        }

        if (senha != confSenha) {
            validPassword();
            return;
        }

        try {
            await api.post('user', data);
            creating('Sucesso', 'Usuario criado com sucesso');

        } catch {
            creating('Ops', 'Falha ao criar usuario, Verifique os campos');
        }




    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <View>
                    <Text style={styles.title}>Cadastro de Usuário</Text>
                </View>
                <View style={styles.data}>

                    <View>
                        <Text style={styles.subtitle}>Dados Pessoais</Text>

                        <View>
                            <Input
                                placeholder='Nome'
                                // leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'gray' }}
                                value={name}
                                onChangeText={e => setName(e)}
                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Email'
                                value={email}
                                onChangeText={e => setEmail(e)}

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Senha'
                                secureTextEntry={true}
                                value={senha}
                                onChangeText={e => setSenha(e)}

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Confirmar Senha'
                                secureTextEntry={true}
                                value={confSenha}
                                onChangeText={e => setConfSenha(e)}

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Telefone'
                                value={telefone}
                                onChangeText={e => setTelefone(e)}

                            />
                        </View>

                    </View>
                </View>

                <View style={styles.data}>

                    <View>
                        <Text style={styles.subtitle}>Dados de Endereço</Text>
                        <View>
                            <Input
                                placeholder='CEP'
                                value={cep}
                                onChangeText={e => setCep(e)}

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Cidade'
                                value={cidade}
                                onChangeText={e => setCidade(e)}

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Bairro'
                                value={bairro}
                                onChangeText={e => setBairro(e)}

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Rua'
                                value={rua}
                                onChangeText={e => setRua(e)}

                            />
                        </View>

                        <View >

                            <View style={styles.info}>
                                <Input
                                    placeholder='Numero'
                                    value={numero}
                                    onChangeText={e => setNumero(e)}

                                />
                                <Input
                                    // style={{marginRight:90}}
                                    placeholder='UF'
                                    value={uf}
                                    onChangeText={e => setUf(e)}

                                />
                            </View>

                        </View>

                    </View>


                </View>
                <View style={styles.inputs}>
                    <View>
                        <Button
                            title="Cadastrar-se"
                            onPress={save}
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button
                            title="Cancelar"
                            onPress={goBack}
                        />
                    </View>

                </View>


            </View>

        </ScrollView>


    )
}

export default NewUser;
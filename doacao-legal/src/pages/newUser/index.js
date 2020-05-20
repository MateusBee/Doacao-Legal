import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Alert, Text, View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';




import styles from './style';

function NewUser() {

    const [nome, setnome] = useState('');
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');
    const [telefone, settelefone] = useState('');
    const [cep, setcep] = useState('');
    const [cidade, setcidade] = useState('');
    const [bairro, setbairro] = useState('');
    const [rua, setrua] = useState('');
    const [numero, setnumero] = useState('');
    const [uf, setuf] = useState('');

    const navigation = useNavigation();





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
                            // value={email}
                            // onChangeText={e => setEmail(e)}
                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Email'

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Senha'

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Telefone'

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

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Cidade'

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Bairro'

                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Rua'

                            />
                        </View>

                        <View >

                            <View style={styles.info}>
                                <Input
                                    placeholder='Numero'

                                />
                                <Input
                                    // style={{marginRight:90}}
                                    placeholder='UF'

                                />
                            </View>

                        </View>

                    </View>


                </View>
                <View style={styles.inputs}>
                    <View>
                        <Button
                            title="Cadastrar-se"
                        // onPress={() => validation()}
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button
                            title="Cancelar"
                        // onPress={() => navigateToNewUser()}
                        />
                    </View>

                </View>


            </View>

        </ScrollView>


    )
}

export default NewUser;
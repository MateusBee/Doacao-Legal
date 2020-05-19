import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../service/api';

import styles from './style'

function Profile(){
    const navigation = useNavigation();

    const [user, setUser] = useState({})

    function signOut() {
        navigation.goBack();
    }

    async function getUserData() {
        if(user) return;
        
        const user_Id = await AsyncStorage.getItem('id');

        const resp = await api.get('user', {
            headers: {
                Authorization: user_Id
            }
        });
        const user = JSON.parse(resp.request.response);

        setUser(user);
    }

    useEffect(() => {
        getUserData();
    }, [])


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Perfil do Usuário</Text>
                </View>

                <View>
                    <View style={styles.data}>
                        <TouchableOpacity
                            style={styles.edit}
                        >
                            <Icon name="edit" size={20} color="green"/>
                        </TouchableOpacity>

                        <Text style={styles.userProperty}>Nome: </Text>
                        <Text style={styles.userValue}>{user.name}</Text>

                        <Text style={styles.userProperty}>Telefone: </Text>
                        <Text style={styles.userValue}>{user.telefone}</Text>

                        <Text style={styles.userProperty}>Email: </Text>
                        <Text style={styles.userValue}>{user.email}</Text>
                    </View>

                    <View style={styles.data}>
                        <View style={styles.address}>
                            
                            <View>
                                <View>
                                    <Text style={styles.userProperty}>Cidade: </Text>
                                    <Text style={styles.userValue}>{user.cidade}</Text>
                                </View>
                                <View>
                                    <Text style={styles.userProperty}>Bairro: </Text>
                                    <Text style={styles.userValue}>{user.bairro}</Text>
                                </View>
                                <View>
                                    <Text style={styles.userProperty}>Número: </Text>
                                    <Text style={styles.userValue}>{user.numero}</Text>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text style={styles.userProperty}>CEP: </Text>
                                    <Text style={styles.userValue}>{user.cep}</Text>
                                </View>
                                <View>
                                    <Text style={styles.userProperty}>Rua: </Text>
                                    <Text style={styles.userValue}>{user.rua}</Text>
                                </View>
                                <View>
                                    <Text style={styles.userProperty}>UF: </Text>
                                    <Text style={styles.userValue}>{user.uf}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <TouchableOpacity
                            style={styles.signOutButton}
                            onPress={signOut}
                        >
                        <Icon name="arrow-left" size={20} color="#E02041"/>
                        <Text style={styles.signOutButtonText}>Sair</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    )
}

export default Profile;
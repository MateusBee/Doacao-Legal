import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';

function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const item = route.params.item;

    function goBack() {
        navigation.goBack();
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Detalhes do Item {item.item}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemProperty}>ITEM: </Text>
                    <Text style={styles.itemValue}>{item.item}</Text>

                    <Text style={styles.itemProperty}>DESCRIÇÃO: </Text>
                    <Text style={styles.itemValue}>{item.descricao}</Text>
                </View>

                <View style={styles.item}>
                    <View>
                        <Text style={styles.subtitle}>Doador</Text>
                    </View>
                    <View>
                        <Text style={styles.itemProperty}>Nome: </Text>
                        <Text style={styles.itemValue}>{item.name}</Text>

                        <Text style={styles.itemProperty}>Telefone: </Text>
                        <Text style={styles.itemValue}>{item.telefone}</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <View>
                        <Text style={styles.subtitle}>Dados do Endereço</Text>
                    </View>

                    <View style={styles.address}>
                        
                        <View>
                            <View>
                                <Text style={styles.itemProperty}>Cidade: </Text>
                                <Text style={styles.itemValue}>{item.cidade}</Text>
                            </View>
                            <View>
                                <Text style={styles.itemProperty}>Bairro: </Text>
                                <Text style={styles.itemValue}>{item.bairro}</Text>
                            </View>
                            <View>
                                <Text style={styles.itemProperty}>Número: </Text>
                                <Text style={styles.itemValue}>{item.numero}</Text>
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.itemProperty}>CEP: </Text>
                                <Text style={styles.itemValue}>{item.cep}</Text>
                            </View>
                            <View>
                                <Text style={styles.itemProperty}>Rua: </Text>
                                <Text style={styles.itemValue}>{item.rua}</Text>
                            </View>
                            <View>
                                <Text style={styles.itemProperty}>UF: </Text>
                                <Text style={styles.itemValue}>{item.uf}</Text>
                            </View>
                        </View>

                    </View>

                </View>

                <View style={styles.actionsButton}>
                    <TouchableOpacity
                        style={styles.actionsButton}
                        onPress={goBack}
                    >
                        <Icon name="arrow-left" size={20} color="#E02041"/>
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon name="whatsapp" size={20} color="green"/>
                        {/* <Text style={styles.signOutButtonText}>Sair</Text> */}
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

export default Detail;
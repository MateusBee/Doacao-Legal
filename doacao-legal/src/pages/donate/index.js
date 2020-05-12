import React, { useState, useEffect } from 'react';
import { Alert, View, FlatList, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import api from '../../service/api';

import styles from './style'

function Donate(){
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function deleteItem(id) {
        return Alert.alert(
            'Deletar',
            'Você tem certeza que deseja remover esse item da doação?',
            [
              {text: 'Cancelar'},
              {text: 'Deletar', onPress: () => remove(id)}
            ],
            { cancelable: false }
          )
    }

    async function remove(id) {
        const user_Id = await AsyncStorage.getItem('id');
        api.delete(`item/${id}`, {
            headers: {
                Authorization: user_Id
            }
        }).then(() => {
            setItems(items.filter(item => item.id !== id));
            setTotal(total-1);
        })
    }

    async function loadYourItems() {
        const user_Id = await AsyncStorage.getItem('id');

        if(loading) {
            return;
        }

        if(total > 0 && items.length === total) { // se já carregou todos os dados não precisa buscar mais informações
            return;
        }

        setLoading(true);

        const response = await api.get('own/items', {
            headers: {
                Authorization: user_Id,
            },
            params: { page }
        });

        setItems([...items, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadYourItems();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Seus Itens para Doação</Text>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} itens</Text>.
                </Text>
            </View>

            <FlatList
                data={items}
                style={styles.itemsList}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadYourItems} //é disparada de forma automática quando chegar no final da lista
                onEndReachedThreshold={0.2} // quantos % o usuário precisa estar para que carregue mais itens de 0 até 1 onde por exemplo 0.2 seria faltando 20%
                renderItem={({ item: item }) => (
                    <View style={styles.item}>

                        <TouchableOpacity
                            style={styles.delete}
                            onPress={() => deleteItem(item.id)}
                        >
                            <Icon name="trash" size={20} color="#E02041"/>
                        </TouchableOpacity>

                        <Text style={styles.itemProperty}>ITEM: </Text>
                        <Text style={styles.itemValue}>{item.item}</Text>

                        <Text style={styles.itemProperty}>DESCRIÇÃO: </Text>
                        <Text style={styles.itemValue}>{item.descricao}</Text>

                    </View>
                )}
            />
        </View>
    )
}

export default Donate;
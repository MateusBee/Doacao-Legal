import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import api from '../../service/api';

import styles from './style'

function Items(){
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(item) {
        navigation.navigate('Detail', { item });
    }

    async function loadItems() {
        if(loading) {
            return;
        }

        if(total > 0 && items.length === total) { // se já carregou todos os dados não precisa buscar mais informações
            return;
        }

        setLoading(true);

        const response = await api.get('items', {
            params: { page }
        });

        setItems([...items, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadItems();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lista de Itens para Doação</Text>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} itens</Text>.
                </Text>
            </View>

            <FlatList
                data={items}
                style={styles.itemsList}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadItems} //é disparada de forma automática quando chegar no final da lista
                onEndReachedThreshold={0.2} // quantos % o usuário precisa estar para que carregue mais itens de 0 até 1 onde por exemplo 0.2 seria faltando 20%
                renderItem={({ item: item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemProperty}>ITEM: </Text>
                        <Text style={styles.itemValue}>{item.item}</Text>

                        <Image key={item.image_id} source={{ uri: item.uri.split(',')[0] }} style={{ width: 265, height: 400, marginBottom: 10 }}/>

                        <Text style={styles.itemProperty}>DESCRIÇÃO: </Text>
                        <Text style={styles.itemValue}>{item.descricao}</Text>


                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(item)}
                        >
                            <Text style={styles.dateilsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#00ff7f"/>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}

export default Items;
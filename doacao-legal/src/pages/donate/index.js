import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
    Alert,
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons'; 

import api from '../../service/api';

import styles from './style'

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

function Donate(){
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToNew() {
        navigation.navigate('NewItem');
    }

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
                Authorization: user_Id,
            },
        }).then(() => {
            setItems(items.filter(item => item.item_id !== id));
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

    return (<>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Seus Itens para Doação</Text>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} itens</Text>.
                </Text>
            </View>

            { items.length > 0
                ? <FlatList
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
                                onPress={() => deleteItem(item.item_id)}
                            >
                                <Icon name="trash" size={20} color="#E02041"/>
                            </TouchableOpacity>

                            <Text style={styles.itemProperty}>ITEM: </Text>
                            <Text style={styles.itemValue}>{item.item}</Text>

                            { !!item.uri &&
                                <View style={{ marginBottom: 10, padding: 6 }}>
                                    <Image
                                        key={item.image_id}
                                        source={{ uri: 'https://res.cloudinary.com/dd9mn3zj8/image/upload/v1593547896/'.concat(item.uri.split(',')[0]) }} style={{ width: '115%', height: imageHeight, borderRadius: 8, right: 24}}/>
                                </View>
                            }

                            <Text style={styles.itemProperty}>DESCRIÇÃO: </Text>
                            <Text style={styles.itemValue}>{item.descricao}</Text>

                        </View>
                    )}
                />
                : <View style={styles.noItems}>
                    <Text style={styles.noItemsText}>
                        nenhum item para doação
                        <Entypo name="emoji-sad" size={24} color="#737380" />
                    </Text>
                </View>
            }
        </View>
        <View style={styles.newItem}>
            <Icon
                name="plus-circle"
                size={45}
                color="green"
                onPress={() => navigateToNew()}
            />
        </View>
    </>)
}

export default Donate;
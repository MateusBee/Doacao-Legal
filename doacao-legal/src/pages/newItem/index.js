import React, { useState } from 'react';
import { Alert, Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';
// import { TextInput } from 'react-native-paper';
import Reinput from 'reinput'

import api from '../../service/api'

import styles from './style'

function NewItem(){
    const [item, setItem] = useState('');
    const [descricao, setDescricao] = useState('');

    function invalidItem(title, message){
        return Alert.alert(
            `${title}`,
            `${message}`,
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          )
    }

    function clear() {
        setItem(' ');
        setDescricao(' ');
    }

    async function save() {
        const data = { item, descricao };
        const user_Id = await AsyncStorage.getItem('id');

        if(item == "" || descricao == "") {
            invalidItem('Ops!','Algo não foi preenchido corretamente! Tente Novamente!');
            return;
        }
        if(item == " " || descricao == " ") {
            invalidItem('Ops!','Algo não foi preenchido corretamente! Tente Novamente!');
            return;
        }

        try {
            await api.post('item', data, {
                headers: {
                    authorization: user_Id
                }
            })
            clear();
            invalidItem('Sucesso','Item para doação registrado com sucesso!');
        } catch {
            invalidItem('Ops!','Algo não ocorreu como esperado! Tente Novamente!');
        }
    }

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Novo item para doação</Text>
                </View>

                <View style={styles.inputs}>

                    <View>
                        <Reinput
                            label='Item'
                            activeColor='#e91e63'
                            fontSize={18}
                            value={item}
                            onChangeText={e => setItem(e)}
                        />
                    </View>

                    <View>
                        <Reinput
                            label='Descrição'
                            activeColor='#e91e63'
                            fontSize={18}
                            multiline={true}
                            value={descricao}
                            onChangeText={e => setDescricao(e)}
                        />
                    </View>

                </View>
                <View style={styles.buttons}>

                    <View style={styles.button}>
                        <Button style={styles.cancel} mode='contained' onPress={clear} >Limpar</Button>
                    </View>

                    <View style={styles.button}>
                        <Button style={styles.save} mode='contained' onPress={save} >Salvar</Button> 
                    </View>

                </View>
        </View>
    )
}

export default NewItem;
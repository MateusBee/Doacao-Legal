import React, { useState } from 'react';
import { Alert, Text, Image, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import Canvas from 'react-native-canvas';
// import { TextInput } from 'react-native-paper';
import Reinput from 'reinput'

import api from '../../service/api'

import styles from './style'

function NewItem(){
    const [item, setItem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [key, setKey] = useState(0);

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
        setKey(0);
        setPhoto(null);
        setPhotos([]);
    }

    async function save() {
        const data = { item, descricao, photos };
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

    async function handleChoosePhone() {
        const options = {
            noData: true,
        };

        const response = await ImagePicker.launchImageLibraryAsync(options);
        if(response){
            if(!response.cancelled) {
                const data = { uri: response.uri, id: key}
                setPhotos(photos.concat(data));
                setPhoto(true);
                setKey(key + 1);
            }
        }
    }

    function removeImage(id) {
        const newArray = photos.filter(image => image.id != id);
        setPhotos(newArray);
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Novo item para doação</Text>
                </View>

                <View style={styles.inputs}>

                    <View>
                        <Reinput
                            label='Item'
                            activeColor='#00ff7f'
                            fontSize={18}
                            value={item}
                            onChangeText={e => setItem(e)}
                        />
                    </View>

                    <View>
                        <Reinput
                            label='Descrição'
                            activeColor='#00ff7f'
                            fontSize={18}
                            multiline={true}
                            value={descricao}
                            onChangeText={e => setDescricao(e)}
                        />
                    </View>

                </View>

                {
                    photo && photos.map(image =>
                        (
                            <View key={image.id} style={styles.uploadImage}>
                                <Image key={image.id} source={{ uri: image.uri }} style={{ width: 280, height: 400 }}/>
                                
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeImage(image.id)}
                                >
                                    <Text style={styles.remove}>Remover imagem</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                }

                { photos.length < 5 &&
                    <View style={styles.uploadImage}>
                        <Button icon='file-upload' color='black'  mode='text' onPress={handleChoosePhone} >Selecionar imagem</Button> 
                    </View>
                }

                <View style={styles.buttons}>

                    <View style={styles.button}>
                        <Button style={styles.cancel} mode='contained' onPress={clear} >Limpar</Button>
                    </View>

                    <View style={styles.button}>
                        <Button style={styles.save} mode='contained' onPress={save} >Salvar</Button> 
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default NewItem;
import React, { useState } from 'react';
import { Alert, Text, Image, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import ReactLoading from 'react-loading';
const Buffer = require('buffer/').Buffer;
// import { TextInput } from 'react-native-paper';
import Reinput from 'reinput'

import axios from 'axios';
import api from '../../service/api'

import styles from './style'

function NewItem(){
    const [item, setItem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [photo, setPhoto] = useState(null);
    const [loadingPhoto, setloadingPhoto] = useState(true);
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
                // const base64 = new Buffer(response.uri).toString("base64");
                // console.log("\n\n", base64, "\n\n");

                // const deBase64 = new Buffer(base64, "base64").toString("ascii");
                // console.log("\n\n", deBase64, "\n\n");

                const type = response.uri.split('/').pop();

                const file = {
                    uri: response.uri,
                    type: `test/${type.split('.')[1]}`,
                    name: `test.${type.split('.')[1]}`
                }

                setloadingPhoto(false);
                // loadingImage();

                const image = await handleUpload(file);
                setloadingPhoto(true);

                const data = { uri: image.url, id: key }
                setPhotos(photos.concat(data));
                setPhoto(true);
                setKey(key + 1);
            }
        }
    }

    async function handleUpload(image) {
        const data = new FormData();
        data.append('file',image);
        data.append('upload_preset','donationApp');
        data.append("cloud_name","dd9mn3zj8");

        // axios.post('https://api.cloudinary.com/v1_1/dd9mn3zj8/image/upload', data)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //     })

        return await fetch("https://api.cloudinary.com/v1_1/dd9mn3zj8/image/upload", {
            method:"post",
            body:data
        }).then(res => res.json());
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
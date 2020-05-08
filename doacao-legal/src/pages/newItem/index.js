import React from 'react';
import { Text, View } from 'react-native';

import styles from './style'

function NewItem(){
    return (
        <View style={styles.container}>
            <Text>Registering a new item to donate</Text>
        </View>
    )
}

export default NewItem;
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';

function Search() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Buscar item</Text>
            </View>

        </View>
    )
}

export default Search;
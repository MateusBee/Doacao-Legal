import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Reinput from 'reinput';

import styles from './style';

function Search() {
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        console.log(search)
    }, [search])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Buscar item</Text>
            </View>
            

            <View style={styles.data}>
                <Reinput
                    label='Buscar'
                    activeColor='#00B3ED'
                    value={search}
                    onChangeText={e => setSearch(e)}

                />

            </View>

        </View>
    )
}

export default Search;
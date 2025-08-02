import React from 'react'
import {View, Text } from 'react-native'
import { Tile } from '@/components/Tile';

const Discover = () => {

    return (
        <View style={{flex:1, flexDirection:'row', width:'100%' }}>
            <Tile type={'normal'}/>
        </View>
    );

}

export default Discover;
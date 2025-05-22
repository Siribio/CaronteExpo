import React from "react";
import {View, Text, TouchableOpacity,TextInput} from 'react-native';
import tw from 'twrnc';

export default function Searchbar(){


    return(

        <View style={tw``}>
            <View style={tw`flex-row justify-center gap-x-5 mt-2`}>
                <View>
                    <TextInput 
                    placeholder="Pesquise seu destino"
                    keyboardType="numeric"
                    maxLength={99} 
                    style={tw`w-60  border-2 rounded-lg`}>
                        
                    </TextInput>
                </View>
                <View style={tw`w-10 h-11 bg-[#676150] rounded-lg`}>

                </View>
                <View style={tw`w-10 h-11 bg-[#676150] rounded-lg`}>

                </View>
            </View>
        </View>

    );
}
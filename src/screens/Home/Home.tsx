import {View, Text, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import tw from 'twrnc';
import {RootStackParamList} from '../../routes';
import Navbar from '../../Components/Navbar';
import CardCarona from '../../Components/Cards/CardCarona';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw` mt-15 ml-5 justify-start`}>
        <Text style={tw`text-4xl font-bold text-[#313131] `}>
          Gerenciar Caronas
        </Text>
        <Text style={tw`mt-2 text-lg`}> Você possui {} caronas</Text>
      </View>

       <ScrollView style={tw`flex-1`}>
        <View style={tw`items-center`}>

          <CardCarona />

          <CardCarona />

          <CardCarona />

          <CardCarona />

          <CardCarona />

          <CardCarona />

          <CardCarona />

        </View>

      </ScrollView>
      
      {/* Navbar */}
      <View>
        <Navbar />
      </View>
    </View>
  );
}

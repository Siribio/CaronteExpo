import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import tw from 'twrnc';
import {RootStackParamList} from '../../routes';
import Navbar from '../../Components/Navbar';
import Searchbar from '../../Components/Searchbar/Searchbar';
import CardCarona from '../../Components/Cards/CardCarona';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function Home({navigation}: Props) {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`mt-15 justify-start h-23`}>
        <Text style={tw`ml-5 text-4xl font-bold text-[#313131] `}>
          Buscar Caronas
        </Text>
        <View style={tw``}>
            <Searchbar />
          </View>
      </View>
      
      <ScrollView style={tw`flex-1 mt-2`}>
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

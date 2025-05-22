import {View, Text, Button, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import tw from 'twrnc';
import {RootStackParamList} from '../../routes';
import Navbar from '../../Components/Navbar';

type Props = NativeStackScreenProps<RootStackParamList, 'NewRide'>;

export default function Profile({navigation, route}: Props) {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 mt-15 ml-5 justify-start`}>
        <Text style={tw`text-4xl font-bold text-[#313131] `}>Criar Caronas</Text>
      </View>

      {/* Navbar */}
      <View>
        <Navbar />
      </View>
    </View>
  );
}

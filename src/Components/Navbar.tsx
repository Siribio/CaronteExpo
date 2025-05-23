import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { RootStackParamList } from '../routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Navbar() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const current = route.name;

  const navItems = [
    { name: 'Home', icon: 'format-list-bulleted', label: 'Caronas' },
    { name: 'Search', icon: 'magnify', label: 'Pesquisa' },
    { name: 'NewRide', icon: 'plus-box', label: 'Nova Carona' },
    { name: 'Profile', icon: 'account', label: 'Perfil' },
  ];

  return (

    <View style={tw`flex-row justify-around items-center py-3 border-t-4 border-[#998E6E] m-[10]`}>
       {navItems.map((item) => {
        const isActive = current === item.name;

        return (
        <TouchableOpacity key={item.name} onPress={() => navigation.navigate(item.name as keyof RootStackParamList)}>
          <MaterialCommunityIcons
            name={item.icon}
            size={50}
            color={isActive ? '#F1D014' : '#998E6E'}
          />
        </TouchableOpacity>
        );
      })}

      </View>
  );

}
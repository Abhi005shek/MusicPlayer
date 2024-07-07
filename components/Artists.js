import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Artists = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
      }}>
      <Icon name="emoji-flirt" size={80} color={'grey'} />
      <Text
        style={{
          fontSize: 13,
          fontFamily: 'Poppins-Regular',
          color: 'grey',
        }}>
        This feature is yet to be implemented
      </Text>
    </View>
  );
};

export default Artists;

import {Image, Text, View, StyleSheet, Pressable} from 'react-native';
import Octicon from 'react-native-vector-icons/Octicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';

const Card = ({song}) => {
  const track = useActiveTrack();

  function time(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min < 10 ? `0${min}` : `${min}`} : ${
      sec < 10 ? `0${sec}` : `${sec}`
    }`;
  }

  return (
    <Pressable
      onPress={async () => {
        await TrackPlayer.skip(song.id);
        await TrackPlayer.play()
          .then(() => {})
          .catch(err => console.log(err));
      }}>
      <View style={styles.card}>
        {song?.cover ? (
          <View>
            {song?.cover && (
              <Image
                style={{height: 55, width: 55, borderRadius: 0}}
                source={{uri: song?.cover}}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              paddingVertical: 6,
              paddingHorizontal: 7,
              backgroundColor: '#2b2b2b',
            }}>
            <MIcon name="album" color={'grey'} size={45}></MIcon>
          </View>
        )}

        <View
          style={{
            justifyContent: 'space-between',
            width: '80%',

            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={[
                styles.cardText,
                {
                  fontSize: 17,
                  color: track?.id === song?.id ? 'lightgreen' : 'white',
                },
              ]}>
              {song?.title.length >= 25
                ? song?.title.slice(0, 20) + '...'
                : song?.title}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Octicon name="person" color={'lightgrey'} size={16} />
              <Text style={[styles.cardText, {color: 'lightgrey'}]}>
                {song?.artist != '<unknown>'
                  ? song?.artist.length > 25
                    ? song?.artist.slice(0, 20) + '...'
                    : song?.artist
                  : 'Unknown Artist'}
              </Text>
            </View>
          </View>

          {/* duration */}
          <View>
            <Octicon name="heart" color={'white'} size={20} />
          </View>
          {/* ---------- */}
        </View>

        <View
          style={{flex: 1, alignItems: 'flex-end', paddingRight: 30}}></View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});

export default Card;

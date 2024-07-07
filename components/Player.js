import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MarqueeView from 'react-native-marquee-view';
import TrackPlayer, {
  usePlaybackState,
  useActiveTrack,
  State,
  useProgress,
} from 'react-native-track-player';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const Player = ({initialSong, setIsOpen, forward}) => {
  const track = useActiveTrack();
  let song = track || initialSong;
  const progress = useProgress();
  const playerState = usePlaybackState();

  function handlePlayback() {
    if (playerState.state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  // console.log('song ===> ', song);
  return (
    <LinearGradient
      colors={['brown', 'rgba(238,174,202,1)', 'rgba(61,120,190,1)']}
      useAngle={true}
      angle={60}
      angleCenter={{x: 0.5, y: 0.5}}
      style={{flex: 1, borderRadius: 10}}>
      <View style={[styles.card]}>
        <Pressable
          style={{
            alignItems: 'center',
            overflow: 'hidden',
            width: '60%',
            gap: 5,
            marginRight: 15,
            flex: 1,
            flexDirection: 'row',
          }}
          onPress={() => setIsOpen(true)}>
          {song?.cover ? (
            <View>
              <Image
                style={{height: 50, width: 50, borderRadius: 5}}
                source={{uri: song.cover}}
              />
            </View>
          ) : (
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#2b2b2b',
                padding: 10,
                alignItems: 'center',
              }}>
              <MIcon name="album" size={30} color={'grey'} />
            </View>
          )}

          <View style={{flex: 1, marginLeft: 4, justifyContent: 'center'}}>
            {song?.title.trim().length < 25 ? (
              <Text style={[styles.cardText, styles.fontFamily, {height: 25}]}>
                {song?.title}
              </Text>
            ) : (
              <MarqueeView speed={0.06}>
                <Text
                  style={[styles.cardText, styles.fontFamily, {height: 25}]}>
                  {song?.title}
                </Text>
              </MarqueeView>
            )}
            <Text style={[styles.cardText, {color: 'lightgrey', fontSize: 14}]}>
              {song?.artist != '<unknown>'
                ? song?.artist.length > 25
                  ? song?.artist.slice(0, 20) + '...'
                  : song?.artist
                : 'Unknown Artist'}
            </Text>
          </View>
        </Pressable>

        <View
          style={{
            width: '20%',
            paddingRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable onPress={handlePlayback}>
            <Icon
              name={playerState.state === State.Playing ? 'pause' : 'play'}
              size={23}
              color={'#fff'}
            />
          </Pressable>

          <Pressable onPress={forward}>
            <Icon name="forward" size={20} color={'#fff'} />
          </Pressable>
        </View>

        <View
          style={{
            left: 0,
            position: 'absolute',
            bottom: -20,
            right: 0,
          }}>
          <Slider
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor={'#fff'}
            maximumTrackTintColor={'darkgrey'}
            lowerLimit={progress.position}
            upperLimit={progress.position}
            thumbTintColor={'transparent'}
            value={progress.position}
            style={{height: 40, fontSize: 30}}
          />
        </View>

        {/*  */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: 10,
    padding: 10,
    // backgroundColor: '#202020',
    // backgroundColor: 'brown',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  fullScreen: {
    alignItems: 'stretch',
  },

  fontFamily: {
    fontFamily: 'Poppins-Regular',
  },
});

export default Player;

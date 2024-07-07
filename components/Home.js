import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Pressable,
} from 'react-native';
import Card from './Card';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  useActiveTrack,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import Player from './Player';
import Modal from './Modal';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const Home = ({
  songs,
  total,
  currentSong,
  isOpen,
  setIsOpen,
  forward,
  backward,
  getAllSongs,
}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const track = useActiveTrack();
  const playbackStatus = usePlaybackState();

  function handlePlayback() {
    if (playbackStatus.state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <LinearGradient colors={['#000', '#000', '#000']} style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: StatusBar.currentHeight + 20,
          // backgroundColor: '',
        }}>
        <ScrollView>
          <Text style={[styles.fontSize, {color: 'white'}]}>Songs</Text>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <MIcon name="album" size={25} color="lightgrey" />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-SemiBold',
                  color: 'lightgrey',
                }}>
                {total} Songs
              </Text>
            </View>

            <View>
              <Pressable onPress={handlePlayback}>
                <Icon
                  name={
                    playbackStatus.state === State.Playing
                      ? 'pause-circle'
                      : 'play-circle'
                  }
                  size={60}
                  color={'lightgreen'}
                />
              </Pressable>
            </View>
          </View>

          {songs?.length ? (
            <View>
              {songs?.map((el, index) => (
                <Card key={index} song={el} index={index} />
              ))}
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 400,
                gap: 5,
              }}>
              <Icon name="music" size={60} color={'grey'} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'grey',
                  fontSize: 14,
                }}>
                No Songs Found
              </Text>
              <Pressable onPress={getAllSongs}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    color: 'white',
                    backgroundColor: 'brown',
                  }}>
                  Reload
                </Text>
              </Pressable>
            </View>
          )}

          <View style={{height: 160}}></View>
        </ScrollView>
      </View>

      {track && (
        <View
          style={{
            marginHorizontal: 5,
            position: 'absolute',

            bottom: tabBarHeight + 5,
            left: 5,
            right: 5,
          }}>
          <Player
            setIsOpen={setIsOpen}
            songs={songs}
            currentSong={currentSong}
            initialSong={songs[0]}
            forward={forward}
          />
        </View>
      )}

      <Modal
        forward={forward}
        backward={backward}
        songs={songs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/*  */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 25,
    color: 'black',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Home;
